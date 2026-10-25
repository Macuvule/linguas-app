
import { StyleSheet, Text, View } from "react-native";

type QuestionCardProps = {
  question: string;
  questionNumber?: number;
};

export default function QuestionCard({
  question,
  questionNumber,
}: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {questionNumber !== undefined
          ? `PERGUNTA ${questionNumber}`
          : "PERGUNTA"}
      </Text>

      <Text style={styles.question}>
        {question}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 20,
    marginBottom: 24,
  },

  label: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },

  question: {
    color: "#0F172A",
    fontSize: 21,
    fontWeight: "700",
    lineHeight: 30,
  },
});
