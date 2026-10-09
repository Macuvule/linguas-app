import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  size?: number;
  /** Componente SVG que recebe { width, height }. Quando existir, substitui o placeholder. */
  Illustration?: React.ComponentType<{ width?: number; height?: number }>;
  backgroundColor?: string;
};

export default function Avatar({
  name,
  size = 32,
  Illustration,
  backgroundColor = "#e9eddf",
}: Props) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      {Illustration ? (
        <Illustration width={size} height={size} />
      ) : (
        <Text style={[styles.initial, { fontSize: size * 0.45 }]}>
          {initial}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // corta o SVG em círculo
  },
  initial: {
    fontWeight: "700",
    color: "#456800",
  },
});