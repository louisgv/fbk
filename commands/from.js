import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Color } from "ink";

import { useLogState } from "../core/utils";
import { readFeedback } from "../core/api";

const parseFeedbackMap = feedbackMap =>
	Object.keys(feedbackMap).map(fbkKey => (
		<Color key={fbkKey}>{feedbackMap[fbkKey].message}</Color>
	));

/// Get feedback
const FeedbackFrom = ({ sender }) => {
	const [status, setStatus, statusColor, setStatusColor] = useLogState(
		"status",
		"getting credential . . .",
		"green"
	);

	const [feedbackMap, setFeedbackMap] = useState({});
	useEffect(() => {
		const send = async () => {
			try {
				setStatus(`getting feedback from ${sender}. . .`);

				if (!sender) {
					throw new Error("missing sender");
				}

				await readFeedback({
					from: sender,
					onData: (data, id) => {
						const feedbackHash = "fbk-" + id;
						setFeedbackMap(currentMap => ({
							...currentMap,
							[feedbackHash]: data
						}));
					}
				});

				setStatus("streaming feedback. CTRL + C to exit!");
			} catch (error) {
				setStatus(error.message);
				setStatusColor("red");
				process.exit(1);
			}
		};
		send();
	}, []);

	return (
		<Box flexDirection="column">
			<Color keyword={statusColor} bold>
				{status}
			</Color>
			{parseFeedbackMap(feedbackMap)}
		</Box>
	);
};

FeedbackFrom.propTypes = {
	sender: PropTypes.string.isRequired
};

// FeedbackFrom.defaultProps = {
// };

// FeedbackFrom.shortFlags = {
// };

FeedbackFrom.positionalArgs = ["sender"];

export default FeedbackFrom;
