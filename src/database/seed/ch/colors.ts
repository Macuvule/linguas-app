// src/seeds/ch/colors.ts
import { seedCategory, P, J } from "../seedHelper";

// confirmar estas palavras
const AZUL = "wasi";
const AMARELO = "CONFIRMAR_AMARELO";

export function seedColorsChangana() {
  seedCategory({
    language: { name: "Changana", code: "ch" },
    category: {
      title: "Mivala",
      description: "As cores básicas em changana.",
      level: "Iniciante",
      icon: "colors",
    },
    lessons: [
      {
        title: "Mivala ya xisekelo",
        description: "Vermelho, azul, amarelo, verde, preto e branco.",
        icon: "colors",
        dialogues: [
          {
            title: "Mivala yo sungula",
            audioGroup: "colors",
            lines: [
              [J, "I muvala wihi?", "Que cor é?"],
              [P, "I tshwuka.", "É vermelho."],
              [J, "Na lowu?", "E esta?"],
              [P, `I ${AZUL}.`, "É azul."],
              [J, "Na lowu?", "E esta?"],
              [P, `I ${AMARELO}.`, "É amarelo."],
            ],
          },
          {
            title: "Mivala yin'wana",
            audioGroup: "colors",
            lines: [
              [J, "I muvala wihi?", "Que cor é?"],
              [P, "I rihlaza.", "É verde."],
              [J, "Na lowu?", "E esta?"],
              [P, "I ntima.", "É preto."],
              [J, "Na lowu?", "E esta?"],
              [P, "I basa.", "É branco."],
            ],
          },
        ],
      },
    ],
  });
}