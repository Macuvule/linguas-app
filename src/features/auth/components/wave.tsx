import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

type WaveProps = {
  width: number;
  height: number;
  color?: string;
  Icon?: ComponentType<SvgProps>;
  iconWidth?: number;
  iconHeight?: number;
};

export function Wave({
  width,
  height,
  color = "#075B3A",
  Icon,
  iconWidth = 190,
  iconHeight = 190,
}: WaveProps) {
  return (
    <View style={{ width, height }}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 600 300"
        preserveAspectRatio="none"
        style={{ transform: [{ scaleY: -1 }] }}
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
          fill={color}
        />
      </Svg>

      {Icon && (
        <View style={styles.imageWrapper} pointerEvents="none">
          <Icon width={iconWidth} height={iconHeight} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});