import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("english_app.db");

export function initializeDatabase() {
    db.execSync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS languages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          code TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          language_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          level TEXT,
          image TEXT,

          UNIQUE (language_id, title),

          FOREIGN KEY (language_id)
            REFERENCES languages(id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            image TEXT,
            order_index INTEGER NOT NULL DEFAULT 0,
            UNIQUE (category_id, title),


            FOREIGN KEY (category_id)
                REFERENCES categories(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS dialogues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lesson_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            audio_group TEXT,

            UNIQUE(lesson_id, title),

            FOREIGN KEY (lesson_id)
                REFERENCES lessons(id)
                ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS dialogue_lines (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          dialogue_id INTEGER NOT NULL,
          speaker TEXT NOT NULL,
          text TEXT NOT NULL,
          translation TEXT,
          audio_key INTEGER,
          order_index INTEGER NOT NULL DEFAULT 0,

          UNIQUE(dialogue_id, order_index),

          FOREIGN KEY (dialogue_id)
            REFERENCES dialogues(id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS lesson_questions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          lesson_id INTEGER NOT NULL,
          question_text TEXT NOT NULL,
          explanation TEXT,
          order_index INTEGER NOT NULL DEFAULT 0,

          UNIQUE (lesson_id, order_index),

          FOREIGN KEY (lesson_id)
            REFERENCES lessons(id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS question_options (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question_id INTEGER NOT NULL,
          option_text TEXT NOT NULL,
          is_correct INTEGER NOT NULL DEFAULT 0
            CHECK (is_correct IN (0, 1)),
          order_index INTEGER NOT NULL DEFAULT 0,

          UNIQUE (question_id, order_index),

          FOREIGN KEY (question_id)
            REFERENCES lesson_questions(id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          lesson_id INTEGER NOT NULL,
          started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          completed_at TEXT,
          score INTEGER,
          total_questions INTEGER NOT NULL DEFAULT 0,

          FOREIGN KEY (lesson_id)
            REFERENCES lessons(id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS user_question_answers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          attempt_id INTEGER NOT NULL,
          question_id INTEGER NOT NULL,
          selected_option_id INTEGER NOT NULL,
          is_correct INTEGER NOT NULL
            CHECK (is_correct IN (0, 1)),

          UNIQUE (attempt_id, question_id),

          FOREIGN KEY (attempt_id)
            REFERENCES quiz_attempts(id)
            ON DELETE CASCADE,

          FOREIGN KEY (question_id)
            REFERENCES lesson_questions(id)
            ON DELETE CASCADE,

          FOREIGN KEY (selected_option_id)
            REFERENCES question_options(id)
        );

        CREATE TABLE IF NOT EXISTS user_recordings (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              dialogue_line_id INTEGER NOT NULL UNIQUE,
              audio_path TEXT NOT NULL,
              created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

              FOREIGN KEY (dialogue_line_id)
                  REFERENCES dialogue_lines(id)
                  ON DELETE CASCADE
          );
      
    `)

    console.log("base de dados inicializado");
}

export function resetDatabase() {
  db.execSync(`
    PRAGMA foreign_keys = OFF;

    DROP TABLE IF EXISTS dialogue_lines;
    DROP TABLE IF EXISTS dialogues;
    DROP TABLE IF EXISTS user_question_answers;
    DROP TABLE IF EXISTS quiz_attempts;
    DROP TABLE IF EXISTS question_options;
    DROP TABLE IF EXISTS lesson_questions;
    DROP TABLE IF EXISTS lessons;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS languages;

    PRAGMA foreign_keys = ON;
  `);

  console.log("Banco de dados apagado.");
}

export function insertLanguage(
  name: string,
  code: string
): number | undefined {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO languages (name, code)
      VALUES (?, ?);
    `,
    name,
    code
  );

  if (result.changes > 0) {
    return result.lastInsertRowId;
  }

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM languages
      WHERE code = ?;
    `,
    code
  );

  return existing?.id;
}

export function insertCategory(
  languageId: number,
  title: string,
  description: string | null,
  level: string,
  image: string
): number | undefined {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO categories
        (language_id, title, description, level, image)
      VALUES (?, ?, ?, ?, ?);
    `,
    languageId,
    title,
    description,
    level,
    image
  );

  if (result.changes > 0) {
    return result.lastInsertRowId;
  }

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM categories
      WHERE language_id = ?
        AND title = ?;
    `,
    languageId,
    title
  );

  return existing?.id;
}

export function insertLesson(
  categoryId: number,
  title: string,
  description: string,
  image: string,
  orderIndex: number
) {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO lessons
        (category_id, title, description, image, order_index)
      VALUES (?, ?, ?, ?, ?);
    `,
    categoryId,
    title,
    description,
    image,
    orderIndex
  );

  if (result.changes > 0) {
    return result.lastInsertRowId;
  }

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM lessons
      WHERE category_id = ?
        AND title = ?;
    `,
    categoryId,
    title
  );

  return existing?.id;
}

export function insertDialogue(
  lessonId: number,
  title: string,
  audioGroup: string
) {
  const result = db.runSync(
    `
      INSERT INTO dialogues (
        lesson_id,
        title,
        audio_group
      )
      VALUES (?, ?, ?)

      ON CONFLICT(lesson_id, title)
      DO UPDATE SET
        audio_group = excluded.audio_group;
    `,
    lessonId,
    title,
    audioGroup
  );

  const dialogue = db.getFirstSync<{
    id: number;
  }>(
    `
      SELECT id
      FROM dialogues
      WHERE lesson_id = ?
      AND title = ?;
    `,
    lessonId,
    title
  );

  return dialogue?.id;
}

export function insertDialogueLine(
  dialogueId: number,
  speaker: string,
  text: string,
  translation: string | null,
  audioKey: number | null,
  orderIndex: number
): number | undefined {
  const result = db.runSync(
    `
      INSERT OR IGNORE INTO dialogue_lines
        (dialogue_id, speaker, text, translation, audio_key, order_index)
      VALUES (?, ?, ?, ?, ?, ?);
    `,
    dialogueId,
    speaker,
    text,
    translation,
    audioKey,
    orderIndex
  );

  if (result.changes > 0) {
    return result.lastInsertRowId;
  }

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM dialogue_lines
      WHERE dialogue_id = ?
        AND order_index = ?;
    `,
    dialogueId,
    orderIndex
  );

  return existing?.id;
}

export function insertLessonQuestion(
  lessonId: number,
  questionText: string,
  explanation: string | null,
  orderIndex: number
): number | undefined {
  db.runSync(
    `
      INSERT OR IGNORE INTO lesson_questions
        (lesson_id, question_text, explanation, order_index)
      VALUES (?, ?, ?, ?);
    `,
    lessonId,
    questionText,
    explanation,
    orderIndex
  );

  const existing = db.getFirstSync<{ id: number }>(
    `
      SELECT id
      FROM lesson_questions
      WHERE lesson_id = ? AND order_index = ?;
    `,
    lessonId,
    orderIndex
  );

  return existing?.id;
}

export function insertQuestionOption(
  questionId: number,
  optionText: string,
  isCorrect: boolean,
  orderIndex: number
): void {
  db.runSync(
    `
      INSERT OR IGNORE INTO question_options
        (question_id, option_text, is_correct, order_index)
      VALUES (?, ?, ?, ?);
    `,
    questionId,
    optionText,
    isCorrect ? 1 : 0,
    orderIndex
  );
}


export default db;