import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { FloatingBubbles } from "./components/splash-bubbles";
import ProgressBar from "./components/progress-bar";
import AppLogo from "@/components/ui/icons/app-logo";

type Props = {
  onComplete: () => void;
};

export function Splash_Screen({ onComplete }: Props) {
  return (
    <View style={styles.container}>
      {/* Fundo */}
      <LinearGradient
        colors={[
          "#071A12",
          "#09261A",
          "#0B3A24",
          "#09261A",
          "#06150E",
        ]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Brilho verde atrás do logo */}
      <View style={styles.glowLarge} />
      <View style={styles.glowSmall} />

      {/* bolhas */}
      <FloatingBubbles />

      <View style={styles.content}>
        <AppLogo size={300} />

        <Text style={styles.title}>
          Let's Talk
        </Text>

        <Text style={styles.subtitle}>
          Preparing your experience...
        </Text>

        <ProgressBar
          duration={2200}
          onComplete={onComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  glowLarge: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: "#4CAF3C",
    opacity: 0.12,
    top: "15%",
    left: "50%",
    transform: [
      { translateX: -210 },
    ],
  },

  glowSmall: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#A9E34B",
    opacity: 0.08,
    top: "30%",
    left: "50%",
    transform: [
      { translateX: -110 },
    ],
  },

  title: {
    marginTop: 24,
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 40,
    fontSize: 14,
    color: "#B7C9BE",
  },
});