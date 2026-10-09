import { useEffect, useRef } from "react";
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export type LanguageOption = {
  id: number;
  label: string;
};

type Props = {
  options: LanguageOption[];
  selectedId: number;
  onChange: (id: number) => void;
};

export default function SlideButton({
  options,
  selectedId,
  onChange,
}: Props) {
    const selectedOptionExists = options.some(
    (option) => option.id === selectedId
    );

    const selectedIndex = selectedOptionExists
    ? options.findIndex((option) => option.id === selectedId)
    : 0;

  const slide = useRef(
    new Animated.Value(selectedIndex)
  ).current;

  useEffect(() => {
    Animated.spring(slide, {
      toValue: selectedIndex,
      useNativeDriver: false,
      stiffness: 180,
      damping: 20,
      mass: 0.7,
    }).start();
  }, [selectedIndex, slide]);

  const width = `${100 / options.length}%` as `${number}%`;

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.indicator,
          {
            width,
            left: slide.interpolate({
              inputRange: options.map((_, index) => index),
              outputRange: options.map(
                (_, index) => `${(index * 100) / options.length}%`
              ),
            }),
          },
        ]}
      />

      {options.map((option) => {
        const active = option.id === selectedId;

        return (
          <Pressable
            key={option.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Selecionar idioma ${option.label}`}
            onPress={() => onChange(option.id)}
            style={styles.option}
          >
            <Text
              style={[
                styles.label,
                active ? styles.activeLabel : styles.inactiveLabel,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    padding: 4,
    borderRadius: 14,
    backgroundColor: "#e9eddf",
    overflow: "hidden",
  },

  indicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    borderRadius: 11,
    backgroundColor: "#6b9e05",
  },

  option: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
  },

  activeLabel: {
    color: "#ffffff",
  },

  inactiveLabel: {
    color: "#536044",
  },
});