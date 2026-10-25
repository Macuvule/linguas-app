
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

  const count = Math.max(options.length, 1);

  // A largura do indicador corresponde a cada segmento.
  const segmentWidth = 142 / count;

  const inputRange =
    options.length >= 2
      ? options.map((_, index) => index)
      : [0, 1];

  const outputRange =
    options.length >= 2
      ? options.map((_, index) => index * segmentWidth)
      : [0, 0];

  useEffect(() => {
    const animation = Animated.spring(slide, {
      toValue: selectedIndex,
      useNativeDriver: true,
      stiffness: 220,
      damping: 24,
      mass: 0.7,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [selectedIndex, slide]);

  if (options.length === 0) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.indicator,
          {
            width: segmentWidth,
            transform: [
              {
                translateX: slide.interpolate({
                  inputRange,
                  outputRange,
                }),
              },
            ],
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
                active
                  ? styles.activeLabel
                  : styles.inactiveLabel,
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
    height: 38,
    width: 150,
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
    left: 4,
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
    fontSize: 10,
    fontWeight: "800",
  },

  activeLabel: {
    color: "#ffffff",
  },

  inactiveLabel: {
    color: "#536044",
  },
});
