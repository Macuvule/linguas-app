import db from "../db";

export type DialogueLine = {
  id: number;
  dialogue_id: number;
  speaker: string;
  english: string;
  translation: string | null;
  audio_key: number | null;
};

export type Dialogue = {
  id: number;
  lesson_id: number;
  title: string;
  audio_group: string | null;
  lines: DialogueLine[];
};

export function getDialogueByLesson(
  lessonId: number
): Dialogue | null {
  const dialogue = db.getFirstSync<{
    id: number;
    lesson_id: number;
    title: string;
    audio_group: string | null;
  }>(
    `
      SELECT
        id,
        lesson_id,
        title,
        audio_group
      FROM dialogues
      WHERE lesson_id = ?
      LIMIT 1;
    `,
    lessonId
  );

  if (!dialogue) {
    return null;
  }

  const lines = db.getAllSync<DialogueLine>(
    `
      SELECT
        id,
        dialogue_id,
        speaker,
        english,
        translation,
        audio_key
      FROM dialogue_lines
      WHERE dialogue_id = ?
      ORDER BY order_index ASC;
    `,
    dialogue.id
  );

  return {
    ...dialogue,
    lines,
  };
}