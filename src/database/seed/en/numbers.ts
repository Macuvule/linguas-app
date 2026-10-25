// src/seeds/en/numbers.ts
import { seedCategory, P, J } from "../seedHelper";

export function seedNumbersEnglish() {
  seedCategory({
    language: { name: "Inglês", code: "en" },
    category: {
      title: "Numbers",
      description: "Números de 1 a 20 em inglês.",
      level: "Iniciante",
      icon: "numbers",
    },
    lessons: [
      {
        title: "Numbers 1 to 10",
        description: "Contar de um a dez.",
        icon: "numbers",
        dialogues: [
          {
            title: "Let's Count",
            audioGroup: "numbers",
            lines: [
              [P, "One, two, three, four, five.", "Um, dois, três, quatro, cinco."],
              [J, "Six, seven, eight, nine, ten.", "Seis, sete, oito, nove, dez."],
            ],
          },
        ],
      },
      {
        title: "Numbers 11 to 20",
        description: "Contar de onze a vinte e dizer a idade.",
        icon: "numbers",
        dialogues: [
          {
            title: "Counting to Twenty",
            audioGroup: "numbers",
            lines: [
              [P, "Eleven, twelve, thirteen.", "Onze, doze, treze."],
              [J, "Fourteen, fifteen.", "Catorze, quinze."],
              [P, "Twenty!", "Vinte!"],
            ],
          },
          {
            title: "How Old Are You?",
            audioGroup: "numbers",
            lines: [
              [P, "How old are you?", "Quantos anos tens?"],
              [J, "I'm fifteen years old.", "Tenho quinze anos."],
              [J, "And you?", "E tu?"],
              [P, "I'm twenty years old.", "Tenho vinte anos."],
            ],
          },
        ],
      },
    ],
  });
}