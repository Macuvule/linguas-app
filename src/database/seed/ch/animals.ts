// src/seeds/ch/animals.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedAnimalsChangana() {
  seedCategory({
    language: { name: "Changana", code: "ch" },
    category: {
      title: "Swihari",
      description: "Animais domésticos e selvagens em changana.",
      level: "Iniciante",
      icon: "animals",
    },
    lessons: [
      {
        title: "Swihari swa le kaya",
        description: "Cão, gato, galinha e cabra.",
        icon: "animals",
        dialogues: [
          {
            title: "Swihari swa le kaya",
            audioGroup: "animals",
            lines: [
              [J, "Lexi i yini?", "O que é isto?"],
              [P, "I mbyana.", "É um cão."],
              [J, "Na lexi?", "E isto?"],
              [P, "I katsi.", "É um gato."], // ⚠️ confirmar
              [J, "Na lexi?", "E isto?"],
              [P, "I nkuku.", "É uma galinha."],
              [J, "Na lexi?", "E isto?"],
              [P, "I mbuti.", "É uma cabra."],
            ],
          },
        ],
      },
      {
        title: "Swihari swa nhova",
        description: "Leão, elefante, macaco e girafa.",
        icon: "animals",
        dialogues: [
          {
            title: "Swihari swa nhova",
            audioGroup: "animals",
            lines: [
              [J, "Lexi i yini?", "O que é isto?"],
              [P, "I nghala.", "É um leão."],
              [J, "Na lexi?", "E isto?"],
              [P, "I ndlopfu.", "É um elefante."],
              [J, "Na lexi?", "E isto?"],
              [P, "I nkawu.", "É um macaco."], // ⚠️ confirmar
              [J, "Na lexi?", "E isto?"],
              [P, "I ndlulamithi.", "É uma girafa."],
            ],
          },
        ],
      },
    ],
  });
}