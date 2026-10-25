// src/seeds/en/family.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedFamilyEnglish() {
  seedCategory({
    language: { name: "Inglês", code: "en" },
    category: {
      title: "Family",
      description: "Membros da família em inglês.",
      level: "Iniciante",
      icon: "family",
    },
    lessons: [
      {
        title: "My Family",
        description: "Pai, mãe, irmão e irmã.",
        icon: "parents",
        dialogues: [
          {
            title: "Introducing My Family",
            audioGroup: "family",
            lines: [
              [J, "Who is this?", "Quem é este?"],
              [P, "This is my father.", "Este é o meu pai."],
              [J, "And who is this?", "E quem é esta?"],
              [P, "This is my mother.", "Esta é a minha mãe."],
              [P, "These are my brother and my sister.", "Estes são o meu irmão e a minha irmã."],
            ],
          },
        ],
      },
      {
        title: "Grandparents and Baby",
        description: "Avó, avô e bebé.",
        icon: "grandma",
        dialogues: [
          {
            title: "Meeting the Grandparents",
            audioGroup: "family",
            lines: [
              [J, "Who is this?", "Quem é este?"],
              [P, "This is my grandfather.", "Este é o meu avô."],
              [J, "And who is this?", "E quem é esta?"],
              [P, "This is my grandmother.", "Esta é a minha avó."],
              [J, "And who is this?", "E quem é este?"],
              [P, "This is the baby.", "Este é o bebé."],
            ],
          },
        ],
      },
    ],
  });
}