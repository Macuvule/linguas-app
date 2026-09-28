import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type OnboardingButtonProps = {
  onPress: () => void;
};

export default function OnboardingButton({
  onPress,
}: OnboardingButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F5F4E9",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonPressed: {
    transform: [{ scale: 0.94 }],
  },

  arrow: {
    alignItems: "center",
    justifyContent: "center",
  },

  arrowText: {
    fontSize: 27,
    fontWeight: "500",
    color: "#0B5D3B",
    marginTop: -3,
  },
});