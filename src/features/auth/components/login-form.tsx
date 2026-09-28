import { useForm } from '@tanstack/react-form';
import * as React from 'react';
import { Dimensions, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as zod from 'zod';

import { Button, Input, Text, View } from '@/components/ui';
import { getFieldError } from '@/components/ui/form-utils';
import { Wave } from './wave';
import Welcome from '@/components/ui/icons/Welcome'

import { TextInput } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const WAVE_HEIGHT = SCREEN_HEIGHT * 0.4; // wave ocupa metade da tela

const schema = zod.object({
  name: zod.string().min(1, 'Nome obrigatorio'),
  phone: zod
    .string()
    .min(1, 'Telefone é obrigatorio')
    .regex(/^(82|83|84|85|86|87)\d{7}$/, 'Telefone invalido'),
});

export type FormType = zod.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit: (data: FormType) => void;
};

export function LoginForm({ onSubmit = () => {} }: LoginFormProps) {
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
    validators: {
      onChange: schema as any,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <ScrollView>
      <View style={styles.screen}>
        {/* Wave no topo, ocupando metade da tela */}
        <View style={styles.waveContainer}>
          <Wave width={SCREEN_WIDTH} height={WAVE_HEIGHT} Icon={Welcome} />
        </View>

        {/* Cartão branco com título, subtítulo e formulário */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Conecte-se</Text>
            <Text style={styles.subtitle}>
              Bem-vindo! Esta é uma plataforma para aprender inglês do jeito
              Sky.
            </Text>
          </View>

          <View style={styles.field}>
            <form.Field
              name="name"
              children={(field) => (
                <Input
                  label="Nome"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  error={getFieldError(field)}
                />
              )}
            />
          </View>

          <View style={styles.field}>
            <form.Field
              name="phone"
              children={(field) => (
                <Input
                  label="Contacto"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  error={getFieldError(field)}
                />
              )}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmitting]) => (
                <Button
                  label="Inscrever"
                  onPress={form.handleSubmit}
                  loading={isSubmitting}
                />
              )}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  waveContainer: {
    height: WAVE_HEIGHT,
    width: '100%',
  },

  card: {
    flex: 1,
    marginTop: -80, // sobe por cima da onda pra ficar contínuo
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 16,
  },

  header: {
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#191d13',
    marginBottom: 6,
    textAlign: 'center',
  },

  subtitle: {
    maxWidth: 280,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    color: '#5f5e5e',
  },

  field: {
    marginBottom: 4,
  },

  buttonWrapper: {
    marginTop: 8,
  },
});
