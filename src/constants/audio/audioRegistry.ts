import { greetingsAudioCh } from "./ch/greetingsAudio";
import { greetingsAudioEn } from "./en/greetingsAudio";
import { familyAudioCh } from "./ch/familyAudio";

type AudioSource = number; // o que o require devolve no React Native
type AudioGroup = Record<number, AudioSource>;

export const audioRegistry: Record<string, Record<string, AudioGroup>> = {
  en: {
    greetings: greetingsAudioEn,
  },
  ch: {
    greetings: greetingsAudioCh,
    family: familyAudioCh,
  },
};

export function getOriginalAudio(
  languageCode: string,
  audioGroup: string,
  audioKey: number | null
): AudioSource | null {
  if (audioKey == null) return null;

  const group = audioRegistry[languageCode]?.[audioGroup];

  if (!group) {
    console.warn(
      `Áudio não encontrado: idioma="${languageCode}", grupo="${audioGroup}"`
    );
    return null;
  }

  return group[audioKey] ?? null;
}