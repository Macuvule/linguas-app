import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Search } from "@/components/ui/icons";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color="#456800" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Procurar ..."
        placeholderTextColor="#7f9a4f"
        selectionColor="#456800"
        cursorColor="#456800"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#456800",
    fontWeight: "600",
  },
});