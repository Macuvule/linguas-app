// src/seeds/ch/numbers.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedNumbersChangana() {
  seedCategory({
    language: { name: "Changana", code: "ch" },
    category: {
      title: "Tinhlayo",
      description: "Números de 1 a 20 em changana.",
      level: "Iniciante",
      icon: "numbers",
    },
    lessons: [
      {
        title: "Tinhlayo ta 1 ku ya 10",
        description: "Contar de um a dez.",
        icon: "numbers",
        dialogues: [
          {
            title: "Ku hlaya",
            audioGroup: "numbers",
            lines: [
              // ⚠️ confirmar 6–9
              [P, "Xin'we, mbirhi, nharhu, mune, ntlhanu.", "Um, dois, três, quatro, cinco."],
              [J, "Tsevu, nkombo, nhungu, nkaye, khume.", "Seis, sete, oito, nove, dez."],
            ],
          },
        ],
      },
      {
        title: "Tinhlayo ta 11 ku ya 20",
        description: "Contar de onze a vinte e dizer a idade.",
        icon: "numbers",
        dialogues: [
          {
            title: "Ku hlaya ku ya eka 20",
            audioGroup: "numbers",
            lines: [
              [P, "Khume na xin'we, khume na mbirhi, khume na nharhu.", "Onze, doze, treze."],
              [J, "Khume na mune, khume na ntlhanu.", "Catorze, quinze."],
              [P, "Makume mambirhi!", "Vinte!"],
            ],
          },
          {
            title: "Malembe",
            audioGroup: "numbers",
            lines: [
              [P, "U na malembe mangani?", "Quantos anos tens?"],
              [J, "Ndzi na malembe ya khume na ntlhanu.", "Tenho quinze anos."],
              [J, "Na wena?", "E tu?"],
              [P, "Ndzi na malembe ya makume mambirhi.", "Tenho vinte anos."],
            ],
          },
        ],
      },
    ],
  });
}