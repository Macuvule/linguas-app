// src/seeds/en/body.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedBodyEnglish() {
  seedCategory({
    language: { name: "Inglês", code: "en" },
    category: {
      title: "Body Parts",
      description: "Partes do corpo em inglês.",
      level: "Iniciante",
      icon: "body",
    },
    lessons: [
      {
        title: "My Body",
        description: "Cabeça, olhos, orelhas, boca, mãos e pés.",
        icon: "body",
        dialogues: [
          {
            title: "Parts of My Body",
            audioGroup: "body",
            lines: [
              [P, "This is my head.", "Esta é a minha cabeça."],
              [J, "These are my eyes.", "Estes são os meus olhos."],
              [P, "These are my ears.", "Estas são as minhas orelhas."],
              [J, "This is my mouth.", "Esta é a minha boca."],
              [P, "These are my hands.", "Estas são as minhas mãos."],
              [J, "These are my feet.", "Estes são os meus pés."],
            ],
          },
        ],
      },
    ],
  });
}