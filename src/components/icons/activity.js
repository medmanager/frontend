import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ActivityIcon = ({ color = 'black', focused }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={focused ? 'rgba(47, 128, 237, 0.25)' : null}>
    <Path
      d="M22 12H18L15 21L9 3L6 12H2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ActivityIcon;
