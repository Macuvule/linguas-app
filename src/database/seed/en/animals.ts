// src/seeds/en/animals.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedAnimalsEnglish() {
  seedCategory({
    language: { name: "Inglês", code: "en" },
    category: {
      title: "Animals",
      description: "Animais domésticos e selvagens em inglês.",
      level: "Iniciante",
      icon: "animals",
    },
    lessons: [
      {
        title: "Pets and Farm Animals",
        description: "Cão, gato, galinha e cabra.",
        icon: "animals",
        dialogues: [
          {
            title: "At Home",
           audioGroup: "animals",
            lines: [
              [J, "What is this?", "O que é isto?"],
              [P, "It's a dog.", "É um cão."],
              [J, "And this?", "E isto?"],
              [P, "It's a cat.", "É um gato."],
              [J, "And this?", "E isto?"],
              [P, "It's a chicken.", "É uma galinha."],
              [J, "And this?", "E isto?"],
              [P, "It's a goat.", "É uma cabra."],
            ],
          },
        ],
      },
      {
        title: "Wild Animals",
        description: "Leão, elefante, macaco e girafa.",
        icon: "animals",
        dialogues: [
          {
            title: "In the Wild",
            audioGroup: "animals",
            lines: [
              [J, "What is this?", "O que é isto?"],
              [P, "It's a lion.", "É um leão."],
              [J, "And this?", "E isto?"],
              [P, "It's an elephant.", "É um elefante."],
              [J, "And this?", "E isto?"],
              [P, "It's a monkey.", "É um macaco."],
              [J, "And this?", "E isto?"],
              [P, "It's a giraffe.", "É uma girafa."],
            ],
          },
        ],
      },
    ],
  });
}