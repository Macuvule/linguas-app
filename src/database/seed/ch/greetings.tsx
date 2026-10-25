import {
  insertLanguage,
  insertCategory,
  insertDialogue,
  insertDialogueLine,
  insertLesson,
} from "../../db";

export function seedGreetingsChangana() {
  // Idioma
  const changanaLanguageId = insertLanguage("Changana", "ch");

  if (!changanaLanguageId) {
    throw new Error("Não foi possível obter o ID do idioma Changana.");
  }

  // Categoria
  const categoryId = insertCategory(
    changanaLanguageId,
    "Ku Losa",
    "Cumprimentos e formas de saudar alguém em changana.",
    "Iniciante",
    "greetings"
  );

  if (!categoryId) {
    throw new Error("Não foi possível criar a categoria Ku Losa.");
  }

  // Lição
  const lessonId = insertLesson(
    categoryId,
    "Avuxeni",
    "Cumprimentos básicos usados no dia a dia.",
    "basicGreetings",
    1
  );

  if (!lessonId) {
    throw new Error("Não foi possível criar a lição Avuxeni.");
  }

  // Diálogo
  const dialogueId = insertDialogue(
    lessonId,
    "Ku hlangana na munghana",
    "greetings"
  );

  if (!dialogueId) {
    throw new Error("Não foi possível criar o diálogo Ku hlangana na munghana.");
  }

  // Linhas do diálogo
  insertDialogueLine(
    dialogueId,
    "Paito",
    "Xewani! U njhani?",
    "Olá! Como estás?",
    1,
    1
  );

  insertDialogueLine(
    dialogueId,
    "Jessica",
    "Ndzi kona, inkomu.",
    "Estou bem, obrigado.",
    2,
    2
  );

  insertDialogueLine(
    dialogueId,
    "Paito",
    "Na mina ni ",
    "Tambem estou bem, obrigado!",
    3,
    3
  );
}