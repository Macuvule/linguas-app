import type { SvgProps } from 'react-native-svg';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Home({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M12.971 2.394a1.5 1.5 0 0 0-1.942 0l-7.5 6.363A1.5 1.5 0 0 0 3 9.9v8.6C3 20.43 4.57 22 6.5 22h2.25a.75.75 0 0 0 .75-.75v-5.5c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v5.5c0 .414.336.75.75.75h2.25c1.93 0 3.5-1.57 3.5-3.5V9.9a1.5 1.5 0 0 0-.529-1.143l-7.5-6.363Z"
        fill={color}
      />
    </Svg>
  );
}