import os from "os";
import fs from "fs-extra";
import uuid from "uuid/v1";

import * as base64 from "@stablelib/base64";
import * as utf8 from "@stablelib/utf8";
import { generateKey, secretBox, openSecretBox } from "@stablelib/nacl";

import { randomBytes } from "@stablelib/random";

const SECRETBOX_NONCE_LENGTH = 24;

console.log = function() {};
const Gun = require("gun");
require("gun/lib/then.js");

const fbkPath = `${os.homedir()}/.fbk`;
const fbkFilePath = {
	data: `${fbkPath}/data`,
	credential: `${fbkPath}/credential.json`
};

const newNonce = () => randomBytes(SECRETBOX_NONCE_LENGTH);

export const gun = Gun({
	file: fbkFilePath.data,
	peers: ["https://guttural-chartreuse.glitch.me/gun"]
});

export const user = gun.user();

const aliasPrefix = "fbk-";
export const getFbName = name => `${aliasPrefix}${name}`;
export const getFbAlias = name => `~@${getFbName(name)}`;

const initGun = promise =>
	Promise.all([
		promise,
		gun
			.get("dream-store")
			.then()
	]);

const createUser = (username, password) =>
	initGun(new Promise(res => user.create(getFbName(username), password, res)));

const auth = (username, password) =>
	initGun(
		new Promise((resolve, reject) =>
			user.auth(getFbName(username), password, ack => {
				if (ack.err) {
					return reject(ack.err);
				}

				resolve(ack);
			})
		)
	);

const writeCredential = async (username, password, pin = [2, 0, 3, 4]) => {
	// Encrypt user's credential and store them in the local file system
	const baseNonce = newNonce();

	const nonce = Uint8Array.from(baseNonce);
	nonce.set(Uint8Array.from(pin), pin[0]);

	const data = utf8.encode(JSON.stringify({ username, password }));
	const key = generateKey();

	const box = secretBox(key, nonce, data);

	await fs.outputJSON(fbkFilePath.credential, {
		box: base64.encode(box),
		key: base64.encode(key),
		baseNonce: base64.encode(baseNonce)
	});
};

const readCredential = async (pin = [2, 0, 3, 4]) => {
	try {
		const credential = await fs.readJSON(fbkFilePath.credential);
		const [box, key, baseNonce] = ["box", "key", "baseNonce"].map(k =>
			base64.decode(credential[k])
		);

		const nonce = Uint8Array.from(baseNonce);
		nonce.set(Uint8Array.from(pin), pin[0]);

		const data = openSecretBox(key, nonce, box);

		return JSON.parse(utf8.decode(data));
	} catch (error) {
		throw new Error("No credential found");
	}
};

export const signup = async (username, password, pin = [2, 0, 3, 4]) => {
	try {
		await createUser(username, password);
		await writeCredential(username, password, pin);
	} catch (e) {
		throw e;
	}
};

export const login = async (username, password, pin = [2, 0, 3, 4]) => {
	try {
		await auth(username, password);
		await writeCredential(username, password, pin);
	} catch (e) {
		throw e;
	}
};

export const isUserExist = username => isValid(getFbAlias(username));

export const giveFeedback = async ({ to, data }) => {
	if (!(await isUserExist(to))) throw new Error(`User ${to} does not exist!`);

	const [{ username, password }, toUserPubRaw] = await Promise.all([
		readCredential(),
		getPubKey(to)
	]);

	const toUser = gun.user(toUserPubRaw.substring(1));

	await auth(username, password);

	const feedbackFromTo = user
		.get("feedback")
		.get("to")
		.get(to);

	feedbackFromTo.set(data);
	feedbackFromTo.grant(toUser);
};

export const readFeedback = async ({ from, onData }) => {
	if (!(await isUserExist(from)))
		throw new Error(`User ${from} does not exist!`);

	const [{ username, password }, fromUserPubRaw] = await Promise.all([
		readCredential(),
		getPubKey(from)
	]);

	const fromUser = gun.user(fromUserPubRaw.substring(1));

	await auth(username, password);

	fromUser
		.get("feedback")
		.get("to")
		.get(username)
		.map()
		.on(onData);
};

export const getPubKey = username =>
	new Promise((res, rej) => {
		gun.get(getFbAlias(username)).once(data => {
			if (!data) rej(new Error("No public key found"));
			res(Object.keys(data._[">"])[0]);
		});
	});

export const getData = async id =>
	gun
		.get(id)
		.then();

export const isValid = async id => undefined !== (await getData(id));
