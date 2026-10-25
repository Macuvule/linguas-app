import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from "react-native";

type QuizFeedbackProps = {
  correct: boolean;
  explanation?: string | null;
};

export default function QuizFeedback({
  correct,
  explanation,
}: QuizFeedbackProps) {
  return (
    <View
      style={[
        styles.container,
        correct ? styles.correctContainer : styles.wrongContainer,
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name={correct ? "checkmark-circle" : "close-circle"}
          size={24}
          color={correct ? "#456800" : "#ba1a1a"}
        />
        <Text
          style={[
            styles.title,
            correct ? styles.correctText : styles.wrongText,
          ]}
        >
          {correct ? "Resposta correta!" : "Resposta incorreta"}
        </Text>
      </View>

      {explanation ? (
        <Text style={styles.explanation}>{explanation}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 20,
  },
  correctContainer: {
    backgroundColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  wrongContainer: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  icon: {
    fontSize: 18,
    fontWeight: "800",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  correctText: {
    color: "#166534",
  },
  wrongText: {
    color: "#991B1B",
  },
  explanation: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
  },
});
