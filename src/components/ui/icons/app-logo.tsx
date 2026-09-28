import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text,
} from "react-native-svg";

type AppLogoProps = {
  size?: number;
};

export default function AppLogo({ size = 120 }: AppLogoProps) {
  const width = size;
  const height = (size * 220) / 640;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 640 220"
    >
      <Defs>
        <LinearGradient
          id="greenGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#A9E34B" />
          <Stop offset="55%" stopColor="#4CAF3C" />
          <Stop offset="100%" stopColor="#12752A" />
        </LinearGradient>

        <LinearGradient
          id="greenGradText"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#B7E84D" />
          <Stop offset="100%" stopColor="#159233" />
        </LinearGradient>
      </Defs>

      {/* Bubble */}
      <G transform="translate(30,30)">
        <Path
          d="
            M80 0
            C124 0 160 33 160 74
            C160 115 124 148 80 148
            C68 148 57 146 47 142
            L14 158
            C9 160 4 156 6 151
            L16 122
            C6 108 0 92 0 74
            C0 33 36 0 80 0
            Z
          "
          fill="url(#greenGrad)"
        />

        {/* Soundwave */}
        <G fill="#FFFFFF">
          <Rect x="42" y="60" width="10" height="28" rx="5" />
          <Rect x="60" y="46" width="10" height="56" rx="5" />
          <Rect x="78" y="34" width="10" height="80" rx="5" />
          <Rect x="96" y="50" width="10" height="48" rx="5" />
          <Rect x="114" y="62" width="10" height="24" rx="5" />
        </G>
      </G>

      {/* AudioTalk */}
      <G
        fontFamily="Verdana"
        fontWeight="700"
      >
        <Text
          x="215"
          y="112"
          fontSize="58"
          fill="#1B1B1B"
        >
          Audio
        </Text>

        <Text
          x="378"
          y="112"
          fontSize="58"
          fill="url(#greenGradText)"
        >
          Talk
        </Text>
      </G>

      {/* Tagline */}
      <Text
        x="217"
        y="145"
        fontFamily="Verdana"
        fontSize="20"
        letterSpacing="3"
        fill="#c4c0c0"
      >
        LISTEN · SPEAK · LEARN
      </Text>
    </Svg>
  );
}