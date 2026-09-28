import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";

const { width, height } = Dimensions.get("window");

type Particle = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

export default function SplashParticles() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 15 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 4000 + 6000,
        delay: Math.random() * 2000,
      })),
    []
  );

  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
    </View>
  );
}

function FloatingParticle({ x, y, size, duration, delay }: Particle) {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -40,
            duration: duration / 3,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: duration / 3,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: duration / 3,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 20,
            duration: duration / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(translateX, {
            toValue: -20,
            duration: duration / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animate());
    };

    animate();
  }, [delay, duration, translateX, translateY]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "rgba(255,255,255,0.08)",
        transform: [{ translateY }, { translateX }],
      }}
    />
  );
}