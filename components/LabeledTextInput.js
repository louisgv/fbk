import React, { useState } from "react";
import { Box, Color, Text } from "ink";
import TextInput from "ink-text-input";

export const LabeledTextInput = ({ onSubmit = () => {}, label, ...props }) => {
	const [submitted, setSubmitted] = useState(false);

	return (
		<Box>
			<Box marginRight={1}>
				<Color green bold>
					{label}:
				</Color>
			</Box>

			{!submitted ? (
				<TextInput
					{...props}
					onSubmit={() => {
						onSubmit();
						setSubmitted(true);
					}}
				/>
			) : (
				<Color yellow>
					{!props.mask ? props.value : props.mask.repeat(props.value.length)}
				</Color>
			)}
		</Box>
	);
};
