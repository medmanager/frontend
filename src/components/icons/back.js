import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackIcon = (props) => (
  <Svg
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      fillRule="evenodd"
      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </Svg>
);

export default BackIcon;
