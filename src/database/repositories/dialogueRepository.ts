import db from "../db";

export type DialogueLine = {
  id: number;
  dialogue_id: number;
  speaker: string;
  text: string;
  translation: string | null;
  audio_key: number | null;
};

export type Dialogue = {
  id: number;
  lesson_id: number;
  title: string;
  audio_group: string | null;
  language_code: string,
  lines: DialogueLine[];
};

export function getDialogueByLesson(lessonId: number): Dialogue | null {
  const dialogue = db.getFirstSync<{
    id: number;
    lesson_id: number;
    title: string;
    audio_group: string | null;
    language_code: string;
  }>(
    `
      SELECT
        d.id,
        d.lesson_id,
        d.title,
        d.audio_group,
        lang.code AS language_code
      FROM dialogues d
      JOIN lessons l ON l.id = d.lesson_id
      JOIN categories c ON c.id = l.category_id
      JOIN languages lang ON lang.id = c.language_id
      WHERE d.lesson_id = ?
      LIMIT 1;
    `,
    lessonId
  );

  if (!dialogue) return null;

  const lines = db.getAllSync<DialogueLine>(
    `
      SELECT
        id,
        dialogue_id,
        speaker,
        text,
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