import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const PillAddIcon = ({ color = 'black' }) => (
  <Svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <G clipPath="url(#clip0)">
      <Path
        d="M9.5 2V6.5M9.5 6.5V11M9.5 6.5H14M9.5 6.5H5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9904 14.5L22.002 26.243M15.0622 30.6244L28.9186 22.6244C32.2666 20.6914 33.4138 16.4102 31.4808 13.0622V13.0622C29.5478 9.71413 25.2666 8.567 21.9186 10.5L8.06218 18.5C4.71413 20.433 3.567 24.7141 5.5 28.0622V28.0622C7.433 31.4102 11.7141 32.5574 15.0622 30.6244Z"
        stroke={color}
        strokeWidth="2"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="36" height="36" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PillAddIcon;
