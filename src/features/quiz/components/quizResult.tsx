import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable } from "react-native";

type QuizResultProps = {
  score: number;
  total: number;
  onRetry: () => void;
  onContinue: () => void;
};

export default function QuizResult({
  score,
  total,
  onRetry,
  onContinue,
}: QuizResultProps) {
  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  const passed = percentage >= 70;

  return (
    <View style={styles.container}>
      <Ionicons
        name={passed ? "trophy" : "barbell"}
        size={64}
        color="#456800"
      />

      <Text style={styles.title}>
        {passed ? "Excelente trabalho!" : "Continua a praticar!"}
      </Text>

      <Text style={styles.description}>
        {passed
          ? "Parabéns! Concluíste o quiz com sucesso."
          : "Não desistas. Revê a lição e tenta novamente."}
      </Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>A tua pontuação</Text>

        <Text style={styles.score}>
          {score}/{total}
        </Text>

        <Text style={styles.percentage}>
          {percentage}%
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={onContinue}>
        <Text style={styles.primaryButtonText}>
          Continuar
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={onRetry}>
        <Text style={styles.secondaryButtonText}>
          Repetir quiz
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  title: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 28,
  },
  scoreCard: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  scoreLabel: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 8,
  },
  score: {
    color: "#0F172A",
    fontSize: 38,
    fontWeight: "800",
  },
  percentage: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "600",
  },
});
