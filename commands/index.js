import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Color, Text } from "ink";


/// Send feedback to your peer
const FeedbackMain = () => {
	const [status, setStatus] = useState("Help? fbk --help");
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
