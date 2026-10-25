
import { Pressable, StyleSheet, Text, View } from "react-native";

type AnswerOptionProps = {
  optionId: number;
  text: string;
  letter: string;
  selected: boolean;
  correct: boolean;
  disabled: boolean;
  onPress: () => void;
};

export default function AnswerOption({
  text,
  letter,
  selected,
  correct,
  disabled,
  onPress,
}: AnswerOptionProps) {
  const showCorrect = disabled && correct;
  const showWrong = disabled && selected && !correct;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        showCorrect && styles.correctContainer,
        showWrong && styles.wrongContainer,
      ]}
    >
      <View
        style={[
          styles.letterContainer,
          showCorrect && styles.correctLetter,
          showWrong && styles.wrongLetter,
        ]}
      >
        <Text
          style={[
            styles.letter,
            showCorrect && styles.correctText,
            showWrong && styles.wrongText,
          ]}
        >
          {letter}
        </Text>
      </View>

      <Text
        style={[
          styles.optionText,
          showCorrect && styles.correctText,
          showWrong && styles.wrongText,
        ]}
      >
        {text}
      </Text>

      {showCorrect && (
        <Text style={[styles.status, styles.correctText]}>
          ✓
        </Text>
      )}

      {showWrong && (
        <Text style={[styles.status, styles.wrongText]}>
          ✕
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },

  letterContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  letter: {
    color: "#1D4ED8",
    fontSize: 15,
    fontWeight: "700",
  },

  optionText: {
    flex: 1,
    color: "#334155",
    fontSize: 15,
    lineHeight: 22,
  },

  correctContainer: {
    backgroundColor: "#DCFCE7",
    borderColor: "#16A34A",
  },

  wrongContainer: {
    backgroundColor: "#FEE2E2",
    borderColor: "#DC2626",
  },

  correctLetter: {
    backgroundColor: "#BBF7D0",
  },

  wrongLetter: {
    backgroundColor: "#FECACA",
  },

  correctText: {
    color: "#166534",
  },

  wrongText: {
    color: "#991B1B",
  },

  status: {
    fontSize: 20,
    fontWeight: "800",
  },
});
