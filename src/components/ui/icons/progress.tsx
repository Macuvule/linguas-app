import type { SvgProps } from 'react-native-svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Progress({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M5.75 13.5c.69 0 1.25.56 1.25 1.25v4.5A2.75 2.75 0 0 1 4.25 22h-.5A2.75 2.75 0 0 1 1 19.25v-4.5c0-.69.56-1.25 1.25-1.25h3.5ZM13.75 8c.69 0 1.25.56 1.25 1.25v10A2.75 2.75 0 0 1 12.25 22h-.5A2.75 2.75 0 0 1 9 19.25v-10C9 8.56 9.56 8 10.25 8h3.5ZM19.75 2c.69 0 1.25.56 1.25 1.25v16A2.75 2.75 0 0 1 18.25 22h-.5A2.75 2.75 0 0 1 15 19.25v-16C15 2.56 15.56 2 16.25 2h3.5Z"
        fill={color}
      />
    </Svg>
  );
}