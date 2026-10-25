
import db from "../db";

export type QuizQuestion = {
  id: number;
  lesson_id: number;
  question_text: string;
  explanation: string | null;
  order_index: number;
};

export type QuizOption = {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: number;
  order_index: number;
};

export type QuizQuestionWithOptions = QuizQuestion & {
  options: QuizOption[];
};

export function getQuizByLesson(
  lessonId: number
): QuizQuestionWithOptions[] {
  const questions = db.getAllSync<QuizQuestion>(
    `SELECT
       id,
       lesson_id,
       question_text,
       explanation,
       order_index
     FROM lesson_questions
     WHERE lesson_id = ?
     ORDER BY order_index ASC;`,
    lessonId
  );

  return questions.map((question) => {
    const options = db.getAllSync<QuizOption>(
      `SELECT
         id,
         question_id,
         option_text,
         is_correct,
         order_index
       FROM question_options
       WHERE question_id = ?
       ORDER BY order_index ASC;`,
      question.id
    );

    return {
      ...question,
      options,
    };
  });
}
