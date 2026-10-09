export const greetingsAudioEn = {
  1: require("@/assets/audio/en/greetings/1.mp3"),
  2: require("@/assets/audio/en/greetings/2.mp3"),
  3: require("@/assets/audio/en/greetings/3.mp3"),
  4: require("@/assets/audio/en/greetings/4.mp3"),
} as const;

export function getGreetingAudio(
  key: number | null
) {
  if (!key) return null;

  return greetingsAudioEn[
    key as keyof typeof greetingsAudioEn
  ] ?? null;
}