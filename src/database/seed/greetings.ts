import {
  insertLanguage,
  insertCategory,
  insertDialogue,
  insertDialogueLine,
  insertLesson,
} from "../db";

export function seedGreetings() {
  // Idioma
  const englishLanguageId = insertLanguage(
    "English",
    "en"
  );

  if (!englishLanguageId) {
    throw new Error("Não foi possível obter o ID do idioma English.");
  }

  // Categoria
  const categoryId = insertCategory(
    englishLanguageId,
    "Greetings",
    "Cumprimentos e formas de saudar alguém em inglês.",
    "Iniciante",
    "greetings"
  );

  if (!categoryId) {
    throw new Error("Não foi possível criar a categoria Greetings.");
  }

  // Lição
  const lessonId = insertLesson(
    categoryId,
    "Basic Greetings",
    "Cumprimentos básicos usados no dia a dia.",
    "basicGreetings",
    1
  );

  if (!lessonId) {
    throw new Error("Não foi possível criar a lição Basic Greetings.");
  }

  // Diálogo
  const dialogueId = insertDialogue(
    lessonId,
    "Meeting a Friend",
    "greetings"
  );

  if (!dialogueId) {
    throw new Error("Não foi possível criar o diálogo Meeting a Friend.");
  }

  // Linhas do diálogo
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