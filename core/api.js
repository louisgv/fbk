console.log = function() {};
const Gun = require("gun");
require("gun/lib/then.js");
export const gun = Gun({
	peers: ["https://guttural-chartreuse.glitch.me/gun"]
});

export const user = gun.user();
const aliasPrefix = "fbk-";
export const getFbName = name => `${aliasPrefix}${name}`;
export const getFbAlias = name => `~@${getFbName(name)}`;

export const signup = (username, password) =>
	new Promise(res => user.create(getFbName(username), password, res));

export const login = (username, password) =>
	new Promise(res => user.auth(getFbName(username), password, res));

export const isUserExist = username => isValid(getFbAlias(username));

export const isValid = async id =>
	undefined !==
	(await gun
		.get(id)
		.once()
		.then());
