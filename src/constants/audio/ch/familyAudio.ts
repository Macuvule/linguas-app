export const familyAudioCh = {
  1: require("@/assets/audio/ch/family/1.mp3"),
  2: require("@/assets/audio/ch/family/2.mp3"),
  3: require("@/assets/audio/ch/family/3.mp3"),
  4: require("@/assets/audio/ch/family/4.mp3"),
  5: require("@/assets/audio/ch/family/5.mp3"),
  6: require("@/assets/audio/ch/family/6.mp3"),
  7: require("@/assets/audio/ch/family/7.mp3"),
  8: require("@/assets/audio/ch/family/8.mp3"),
  9: require("@/assets/audio/ch/family/9.mp3"),
  10: require("@/assets/audio/ch/family/10.mp3"),
  11: require("@/assets/audio/ch/family/11.mp3"),
} as const;

export function getFamilyAudio(
  key: number | null
) {
  if (!key) return null;

  return familyAudioCh[
    key as keyof typeof familyAudioCh
  ] ?? null;
}