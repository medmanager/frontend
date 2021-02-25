import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const PillIcon = ({ color = 'black', focused }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={focused ? 'rgba(47, 128, 237, 0.25)' : null}>
    <G clipPath="url(#clip0)">
      <Path
        d="M9.52628 7.5L14.6369 15.8213M9.33013 19.1603L19.7224 13.1603C22.1139 11.7795 22.9333 8.72159 21.5526 6.33013V6.33013C20.1718 3.93866 17.1139 3.11929 14.7224 4.5L4.33013 10.5C1.93866 11.8807 1.11929 14.9387 2.5 17.3301V17.3301C3.88071 19.7216 6.93866 20.541 9.33013 19.1603Z"
        stroke={color}
        strokeWidth="2"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PillIcon;
