import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Color } from "ink";

import { LoginInput } from "../components/LoginInput";

import { isUserExist, login } from "../core/api";
import { useLogState } from "../core/utils";

/// Login to fbk
const FeedbackLogin = () => {
	const [
		status,
		setStatus,
		statusColor,
		setStatusColor
	] = useLogState("status", "getting credential . . .", "green");

	return (
		<Box flexDirection="column">
			<Color keyword={statusColor} bold>{status}</Color>

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
					try {
						await login(username, password);
						setStatus('Success');
					} catch (error) {
						setStatusColor('red')
						setStatus(error)
					}
					process.exit(0);
				}}
			/>
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
