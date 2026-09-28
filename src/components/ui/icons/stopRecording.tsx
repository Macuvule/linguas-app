import React from "react";
import Svg, { Circle, Rect } from "react-native-svg";

type IconProps = {
  color?: string;
  size?: number;
};

export function StopRecording({ color = "#000000", size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={color}
        strokeWidth={2}
      />
      <Rect
        x={9}
        y={9}
        width={6}
        height={6}
        rx={1}
        fill={color}
      />
    </Svg>
  );
}