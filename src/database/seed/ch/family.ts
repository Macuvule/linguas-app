// src/seeds/ch/family.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedFamilyChangana() {
  seedCategory({
    language: { name: "Changana", code: "ch" },
    category: {
      title: "Mindyangu",
      description: "Membros da família em changana.",
      level: "Iniciante",
      icon: "family",
    },
    lessons: [
      {
        title: "Ndyangu wa mina",
        description: "A minha família (Pai, mãe, irmão e irmã).",
        icon: "parents",

        dialogues: [
          {
            title: "Ku tivisa ndyangu",
            audioGroup: "family",
            lines: [
              [J, "Lweyi yi mani?", "Quem é este?"],
              [P, "Lweyi yi tatana wa mina.", "Este é o meu pai."],
              [J, "Lweyi ke yi mani?", "E esta?"],
              [P, "Lweyi yi mamana wa mina.", "Esta é a minha mãe."],
              [
                P,
                "Lava yi va makwavo va mina",
                "Estes são o meu irmão e a minha irmã."
              ],
            ],
          },
        ],

        questions: [
          {
            question: "O que significa «Lweyi yi tatana wa mina.»?",
            explanation:
              "A expressão é utilizada para apresentar o pai.",
            options: [
              {
                text: "Este é o meu pai.",
                correct: true,
              },
              {
                text: "Esta é a minha mãe.",
                correct: false,
              },
              {
                text: "Quem é este?",
                correct: false,
              },
            ],
          },
          {
            question: "Qual expressão significa «Esta é a minha mãe.»?",
            explanation:
              "A expressão refere-se à mãe do falante.",
            options: [
              {
                text: "Lweyi yi mani?",
                correct: false,
              },
              {
                text: "Lweyi yi mamana wa mina.",
                correct: true,
              },
              {
                text: "Lweyi yi tatana wa mina.",
                correct: false,
              },
            ],
          },
        ],
      },
      {
        title: "Vakokwana ni she bebetana",
        description: "Avó, avô e bebé.",
        icon: "grandma",
        dialogues: [
          {
            title: "Vakokwana ni she bebetana",
            audioGroup: "family",
            lines: [
              [J, "Lweyi yi mani?", "Quem é este?"],
              [P, "Lweyi yi kokwana wa mina wa xinuna.", "Este é o meu avô."],
              [J, "Lweyi ke yi mani?", "E esta?"],
              [P, "Lweyi yi kokwana wa mina wa xisati.", "Esta é a minha avó."],
              [J, "Lweyi ke yi mani?", "E este?"],
              [P, "Leshe yi she bebetana", "Este é o bebé."],
            ],
          },
        ],
      },
    ],
  });
}