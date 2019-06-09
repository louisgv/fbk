import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Color, Text } from "ink";

import { LoginInput } from "../components/LoginInput";

import { gun, isUserExist, user, login, getFbName } from "../core/api";

/// Login to fbk
const FeedbackLogin = () => {
	const [status, setStatus] = useState("");

	return (
		<Box flexDirection="column">
			<LoginInput
				onUsername={async username => {
					if (!(await isUserExist(username))) {
						setStatus(
							`User ${username} does not exist. Please signup with: npx fbk signup`
						);
						process.exit(1);
					}
				}}
				onSubmit={async ({ username, password }) => {
					const ack = await login(username, password);
					setStatus(JSON.stringify(ack));
					process.exit(0);
				}}
			/>
			<Color bold>{status}</Color>
		</Box>
	);
};

// FeedbackLogin.propTypes = {
// };

// FeedbackLogin.shortFlags = {
// };

// FeedbackLogin.defaultProps = {
// };

export default FeedbackLogin;
