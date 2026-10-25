// src/seeds/ch/body.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedBodyChangana() {
  seedCategory({
    language: { name: "Changana", code: "ch" },
    category: {
      title: "Swirho swa miri",
      description: "Partes do corpo em changana.",
      level: "Iniciante",
      icon: "body",
    },
    lessons: [
      {
        title: "Miri wa mina",
        description: "Cabeça, olhos, orelhas, boca, mãos e pés.",
        icon: "body",
        dialogues: [
          {
            title: "Swirho swa mina",
            audioGroup: "body",
            lines: [
              [P, "Leyi i nhloko ya mina.", "Esta é a minha cabeça."],
              [J, "Lawa i mahlo ya mina.", "Estes são os meus olhos."],
              [P, "Leti i tindleve ta mina.", "Estas são as minhas orelhas."],
              [J, "Lowu i nomu wa mina.", "Esta é a minha boca."],
              [P, "Lawa i mavoko ya mina.", "Estas são as minhas mãos."],
              [J, "Leyi i milenge ya mina.", "Estes são os meus pés."],
            ],
          },
        ],
      },
    ],
  });
}