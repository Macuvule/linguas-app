import db from "../db";

export type UserRecording = {
  id: number;
  dialogue_line_id: number;
  audio_path: string;
  created_at: string;
};

/**
 * Busca a gravação do usuário para uma determinada fala.
 */
export function getRecordingByDialogueLine(
  dialogueLineId: number
): UserRecording | null {
  const recording = db.getFirstSync<UserRecording>(
    `
      SELECT
        id,
        dialogue_line_id,
        audio_path,
        created_at
      FROM user_recordings
      WHERE dialogue_line_id = ?;
    `,
    dialogueLineId
  );

  return recording ?? null;
}

/**
 * Guarda ou substitui a gravação de uma fala.
 */
export function saveRecording(
  dialogueLineId: number,
  audioPath: string
): UserRecording | null {
  db.runSync(
    `
      INSERT INTO user_recordings (
        dialogue_line_id,
        audio_path
      )
      VALUES (?, ?)
      ON CONFLICT(dialogue_line_id)
      DO UPDATE SET
        audio_path = excluded.audio_path,
        created_at = CURRENT_TIMESTAMP;
    `,
    dialogueLineId,
    audioPath
  );

  return getRecordingByDialogueLine(dialogueLineId);
}

/**
 * Remove a gravação associada a uma fala.
 */
export function deleteRecording(
  dialogueLineId: number
): void {
  db.runSync(
    `
      DELETE FROM user_recordings
      WHERE dialogue_line_id = ?;
    `,
    dialogueLineId
  );
}

/**
 * Verifica se o usuário já gravou uma determinada fala.
 */
export function hasRecording(
  dialogueLineId: number
): boolean {
  const result = db.getFirstSync<{ count: number }>(
    `
      SELECT COUNT(*) as count
      FROM user_recordings
      WHERE dialogue_line_id = ?;
    `,
    dialogueLineId
  );

  return (result?.count ?? 0) > 0;
}

