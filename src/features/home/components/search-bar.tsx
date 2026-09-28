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
      <Search size={20} color="#737a65" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Procurar diálogos..."
        placeholderTextColor="#737a65"
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
    backgroundColor: "#f2f5e4",
    borderRadius: 20,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#191d13",
  },
});