import Svg, { Path } from "react-native-svg";

type WaveProps = {
  width: number;
  height: number;
};

export function Wave({ width, height }: WaveProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
    >
      <Path
        d="
          M 0 130
          C 100 100, 170 90, 280 125
          C 390 160, 470 145, 600 80
          L 600 300
          L 0 300
          Z
        "
        fill="#075B3A"
      />
    </Svg>
  );
}