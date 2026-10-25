export const greetingsAudioCh = {
  1: require("@/assets/audio/ch/greetings/1.mp3"),
  2: require("@/assets/audio/ch/greetings/2.mp3"),
  3: require("@/assets/audio/ch/greetings/3.mp3"),
} as const;

export function getGreetingAudio(
  key: number | null
) {
  if (!key) return null;

  return greetingsAudioCh[
    key as keyof typeof greetingsAudioCh
  ] ?? null;
}