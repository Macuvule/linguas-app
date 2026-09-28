import { greetingsAudio } from "./greetingsAudio";

export const audioRegistry = {
  greetings: greetingsAudio,
};

export function getOriginalAudio(
  audioGroup: string,
  audioKey: number | null
) {
  if (!audioKey) {
    return null;
  }

  const group =
    audioRegistry[
      audioGroup as keyof typeof audioRegistry
    ];

  if (!group) {
    console.warn(
      `Grupo de áudio não encontrado: ${audioGroup}`
    );

    return null;
  }

  return group[
    audioKey as keyof typeof group
  ] ?? null;
}