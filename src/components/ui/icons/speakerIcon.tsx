import Svg, { Path, Polygon } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
  /** true = ondas completas (a tocar); false = só a onda pequena */
  active?: boolean;
};

export default function SpeakerIcon({
  size = 24,
  color = "#456800",
  active = true,
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Corpo do altifalante */}
      <Polygon
        points="11 5 6.5 9 3 9 3 15 6.5 15 11 19"
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Onda pequena */}
      <Path
        d="M15.5 9a4.2 4.2 0 0 1 0 6"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />

      {/* Onda grande */}
      <Path
        d="M18.5 6.5a8 8 0 0 1 0 11"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        opacity={active ? 1 : 0.25}
      />
    </Svg>
  );
}