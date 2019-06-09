import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';

/// Get all feedback given
const Hello = ({name}) => <Text>Hello, {name}</Text>;

Hello.propTypes = {
	/// Name of the person to get feedback from
	name: PropTypes.string.isRequired
};

export default Hello;
