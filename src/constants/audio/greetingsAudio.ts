export const greetingsAudio = {
  1: require("@/assets/audio/greetings/1.mp3"),
  2: require("@/assets/audio/greetings/2.mp3"),
  3: require("@/assets/audio/greetings/3.mp3"),
  4: require("@/assets/audio/greetings/4.mp3"),
} as const;

export function getGreetingAudio(
  key: number | null
) {
  if (!key) return null;

  return greetingsAudio[
    key as keyof typeof greetingsAudio
  ] ?? null;
}