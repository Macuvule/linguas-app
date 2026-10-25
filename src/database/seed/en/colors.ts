// src/seeds/en/colors.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedColorsEnglish() {
  seedCategory({
    language: { name: "Inglês", code: "en" },
    category: {
      title: "Colors",
      description: "As cores básicas em inglês.",
      level: "Iniciante",
      icon: "colors",
    },
    lessons: [
      {
        title: "Basic Colors",
        description: "Vermelho, azul, amarelo, verde, preto e branco.",
        icon: "colors",
        dialogues: [
          {
            title: "First Colors",
            audioGroup: "colors",
            lines: [
              [J, "What color is this?", "Que cor é esta?"],
              [P, "It's red.", "É vermelho."],
              [J, "And this one?", "E esta?"],
              [P, "It's blue.", "É azul."],
              [J, "And this one?", "E esta?"],
              [P, "It's yellow.", "É amarelo."],
            ],
          },
          {
            title: "More Colors",
            audioGroup: "colors",
            lines: [
              [J, "What color is this?", "Que cor é esta?"],
              [P, "It's green.", "É verde."],
              [J, "And this one?", "E esta?"],
              [P, "It's black.", "É preto."],
              [J, "And this one?", "E esta?"],
              [P, "It's white.", "É branco."],
            ],
          },
        ],
      },
    ],
  });
}