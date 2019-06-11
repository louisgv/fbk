import React, { useState } from "react";
import { Box, Color } from "ink";

import { LoginInput } from "../components/LoginInput";

import { signup, isUserExist } from "../core/api";

/// Signup for fbk
const FeedbackSignup = () => {
	const [status, setStatus] = useState("");

	return (
		<Box flexDirection="column">
			<LoginInput
				onUsername={async username => {
					if (await isUserExist(username)){
						setStatus(
							`User ${username} exist. Please login with: npx fbk login`
							);
						process.exit(1);
					}
				}}
				onSubmit={async ({ username, password }) => {
					const ack = await signup(username, password);
					setStatus(JSON.stringify(ack || {}));
					process.exit(0);
				}}
			/>
			<Color bold>{status}</Color>
		</Box>
	);
};

// FeedbackSignup.propTypes = {
// };

// FeedbackSignup.shortFlags = {
// };

// FeedbackSignup.defaultProps = {
// };

export default FeedbackSignup;
