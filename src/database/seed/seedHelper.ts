// src/seeds/seedHelper.ts
import {
  insertLanguage,
  insertCategory,
  insertLesson,
  insertDialogue,
  insertDialogueLine,
  insertLessonQuestion,
  insertQuestionOption,
} from "../db"; 

export type DialogueLineData = [
  speaker: string,
  text: string,
  translation: string,
  audioKey?: number // opcional: por defeito é a posição da linha (1, 2, 3...)
];

export interface SeedDialogue {
  title: string;
  audioGroup: string; // antes era "icon"
  lines: DialogueLineData[];
}

export interface SeedQuestion {
  question: string;
  explanation?: string;
  options: {
    text: string;
    correct: boolean;
  }[];
}

export interface SeedLesson {
  title: string;
  description: string;
  icon: string;
  dialogues: SeedDialogue[];
  questions?: SeedQuestion[];
}

export interface SeedLesson {
  title: string;
  description: string;
  icon: string;
  dialogues: SeedDialogue[];
}

export interface SeedCategoryConfig {
  language: { name: string; code: string };
  category: { title: string; description: string; level: string; icon: string };
  lessons: SeedLesson[];
}

export function seedCategory({ language, category, lessons }: SeedCategoryConfig) {
  const languageId = insertLanguage(language.name, language.code);
  if (!languageId) {
    throw new Error(`Não foi possível obter o ID do idioma ${language.name}.`);
  }

  const categoryId = insertCategory(
    languageId,
    category.title,
    category.description,
    category.level,
    category.icon
  );
  if (!categoryId) {
    throw new Error(`Não foi possível criar a categoria ${category.title}.`);
  }

  lessons.forEach((lesson, lessonIndex) => {
    const lessonId = insertLesson(
      categoryId,
      lesson.title,
      lesson.description,
      lesson.icon,
      lessonIndex + 1
    );
    if (!lessonId) {
      throw new Error(`Não foi possível criar a lição ${lesson.title}.`);
    }

    lesson.dialogues.forEach((dialogue) => {
      const dialogueId = insertDialogue(lessonId, dialogue.title, dialogue.audioGroup);
        if (!dialogueId) {
        throw new Error(`Não foi possível criar o diálogo ${dialogue.title}.`);
        }

      dialogue.lines.forEach(([speaker, text, translation, audioKey], i) => {
        insertDialogueLine(
            dialogueId,
            speaker,
            text,
            translation,
            audioKey ?? i + 1, // audio_key
            i + 1              // order_index
        );
          lesson.questions?.forEach((question, questionIndex) => {
            const questionId = insertLessonQuestion(
              lessonId,
              question.question,
              question.explanation ?? null,
              questionIndex + 1
            );

            if (!questionId) {
              throw new Error(
                `Não foi possível criar a pergunta: ${question.question}`
              );
            }

            question.options.forEach((option, optionIndex) => {
              insertQuestionOption(
                questionId,
                option.text,
                option.correct,
                optionIndex + 1
              );
            });
          });
        });
    });
  });
}

export const P = "Paito";
export const J = "Jessica";