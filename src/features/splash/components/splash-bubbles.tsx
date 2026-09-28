import * as React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const BUBBLES = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  size: Math.random() * 40 + 10,
  left: Math.random() * width,
  top: Math.random() * height,
  duration: Math.random() * 10000 + 10000,
  delay: Math.random() * 5000,
}));

type BubbleProps = {
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

function Bubble({
  size,
  left,
  top,
  duration,
  delay,
}: BubbleProps) {
  const translateY = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -50,
            duration: duration * 0.33,
            useNativeDriver: true,
          }),

          Animated.timing(translateX, {
            toValue: 20,
            duration: duration * 0.33,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 20,
            duration: duration * 0.33,
            useNativeDriver: true,
          }),

          Animated.timing(translateX, {
            toValue: -40,
            duration: duration * 0.33,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: duration * 0.34,
            useNativeDriver: true,
          }),

          Animated.timing(translateX, {
            toValue: 0,
            duration: duration * 0.34,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    const timeout = setTimeout(() => {
      animation.start();
    }, delay);

    return () => {
      clearTimeout(timeout);
      animation.stop();
    };
  }, [delay, duration, translateX, translateY]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          left,
          top,
          transform: [
            { translateX },
            { translateY },
          ],
        },
      ]}
    />
  );
}

export function FloatingBubbles() {
  return (
    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    >
      {BUBBLES.map((bubble) => (
        <Bubble
          key={bubble.id}
          size={bubble.size}
          left={bubble.left}
          top={bubble.top}
          duration={bubble.duration}
          delay={bubble.delay}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
  },
});