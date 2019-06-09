import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Color, Text } from "ink";

import { LoginInput } from "../components/LoginInput";

console.log = function(){};
const Gun = require('gun')

const gun = Gun({
	peers: ["https://guttural-chartreuse.glitch.me/gun"]
});

const user = gun.user();
const usernamePrefix = "FBK";
const createUsername = name => `${usernamePrefix}-${name}`;

/// Get all feedback given
const FeedbackMain = () => {
	const [status, setStatus] = useState("");
	return (
		<Box flexDirection="column">
			<LoginInput
				onUsername={async () => {}}
				onSubmit={({ username, password }) => {
					gun.get(`~@${createUsername(username)}`).once(ack => {
						if (ack === undefined) {
							setStatus(
								"account does not exist. Please signup with: npx fbk signup"
							);
							process.exit(1);
						}
						// setTest(JSON.stringify(ack))
					});
					// user.create(createUsername(username), password)
				}}
			/>
			<Color bold>{status}</Color>
		</Box>
	);
};

// FeedbackMain.propTypes = {
// };

// FeedbackMain.shortFlags = {
// };

// FeedbackMain.defaultProps = {
// };

export default FeedbackMain;
