import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
};

export function Input({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrapper,
          error && styles.inputError,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#9AA08F"
          style={styles.input}
        />
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#434937',
    marginLeft: 4,
  },

  inputWrapper: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F5F6EF',
    borderWidth: 1,
    borderColor: '#E1E4D4',
    paddingHorizontal: 18,
    justifyContent: 'center',
  },

  inputError: {
    borderColor: '#BA1A1A',
  },

  input: {
    fontSize: 16,
    color: '#191D13',
    fontWeight: '500',
  },

  error: {
    color: '#BA1A1A',
    fontSize: 12,
    marginLeft: 4,
  },
});