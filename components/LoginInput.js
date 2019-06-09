import React, { useState } from "react";
import { Box } from "ink";

import { LabeledTextInput } from "../components/LabeledTextInput";

export const LoginInput = ({ onUsername = () => {}, onSubmit = () => {} }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [showPasswordInput, setShowPasswordInput] = useState(false);

	return (
		<Box flexDirection="column">
			<LabeledTextInput
				label="Username"
				value={username}
				onChange={setUsername}
				onSubmit={async () => {
					await onUsername(username)
					setShowPasswordInput(true)
				}}
			/>

			{showPasswordInput && (
				<LabeledTextInput
					label="Password"
					value={password}
					mask={"*"}
					onChange={setPassword}
					onSubmit={() => {
						onSubmit({
							username,
							password
						});
					}}
				/>
			)}
		</Box>
	);
};
