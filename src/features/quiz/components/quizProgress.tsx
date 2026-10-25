
import { StyleSheet, Text, View } from "react-native";

type QuizProgressProps = {
  current: number;
  total: number;
};

export default function QuizProgress({
  current,
  total,
}: QuizProgressProps) {
  const percentage =
    total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Progresso</Text>
        <Text style={styles.counter}>
          Pergunta {current} de {total}
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },
  counter: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },
  track: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 10,
  },
});
