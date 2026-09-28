import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

type Props = {
  duration?: number;
  onComplete?: () => void;
};

export default function ProgressBar({
  duration = 2200,
  onComplete,
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start((finished) => {
        if(finished){
            onComplete?.();
        }
      
    });
  }, [duration, onComplete, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={{
        width: 240,
        height: 8,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.12)",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          width,
          height: "100%",
          borderRadius: 999,
          backgroundColor: "#4F46E5",
        }}
      />
    </View>
  );
}