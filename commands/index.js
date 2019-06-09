import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Color, Text } from "ink";


/// Get all feedback given
const FeedbackMain = () => {
	const [status, setStatus] = useState("Feedback");
	return (
		<Box flexDirection="column">
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
