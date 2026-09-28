import { insertCategory, insertDialogue, insertDialogueLine, insertLesson } from "../db";

export function seedGreetings() {
  const categoryId = insertCategory(
    "Greetings",
    "Cumprimentos e formas de saudar alguém em inglês.",
    "Iniciante",
    "greetings"
  );

  if (!categoryId) {
    throw new Error("Não foi possível obter o ID da categoria.");
  }

  const lessonId = insertLesson(
    categoryId,
    "Basic Greetings",
    "Cumprimentos básicos usados no dia a dia.",
    "basicGreetings",
    1
  );

  if (!lessonId) {
    throw new Error("Não foi possível obter o ID da lesson.");
    }

  const dialogueId = insertDialogue(
    lessonId,
    "Meeting a Friend",
    "greetings"
  );

  if (!dialogueId){
        throw new Error("Não foi possível obter o ID da lesson.");
  }
  insertDialogueLine(
    dialogueId,
    "John",
    "Hello! How are you?",
    "Olá! Como estás?",
    1,
    1
  );

  insertDialogueLine(
    dialogueId,
    "Mary",
    "I'm fine, thank you.",
    "Estou bem, obrigado.",
    2,
    2
  );

  insertDialogueLine(
    dialogueId,
    "John",
    "I'm doing great!",
    "Estou muito bem!",
    3,
    3
  );
}