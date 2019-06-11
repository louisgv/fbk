import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Color } from "ink";

import { useLogState } from "../core/utils";
import { giveFeedback } from "../core/api";

/// Login to fbk
const FeedbackTo = ({ recipent, message }) => {
	const [status, setStatus, statusColor, setStatusColor] = useLogState(
		"status",
		"getting credential . . .",
		"green"
	);

	useEffect(() => {
		const send = async () => {
			try {
				setStatus(`sending feedback to ${recipent}. . .`);

				if (!recipent || !message) {
					throw new Error('missing recipent or message')
				}

				await giveFeedback({
					to: recipent,
					data: { message }
				});

				setStatus("success!");
				process.exit(0)
			} catch (error) {
				setStatus(error.message);
				setStatusColor("red");
				process.exit(1)
			}
		};
		send();
	}, []);

	return (
		<Box flexDirection="column">
			<Color keyword={statusColor} bold>
				{status}
			</Color>
		</Box>
	);
};

FeedbackTo.propTypes = {
	recipent: PropTypes.string,
	message: PropTypes.string
};

// FeedbackTo.defaultProps = {
// };

// FeedbackTo.shortFlags = {
// };

FeedbackTo.positionalArgs = ["recipent", "message"];

export default FeedbackTo;
