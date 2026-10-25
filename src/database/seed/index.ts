import { seedGreetings } from "../seed/en/greetings";
import { seedGreetingsChangana } from "../seed/ch/greetings";

import { seedFamilyEnglish } from "../seed/en/family";
import { seedNumbersEnglish } from "../seed/en/numbers";
import { seedColorsEnglish } from "../seed/en/colors";
import { seedBodyEnglish } from "../seed/en/body";
import { seedAnimalsEnglish } from "../seed/en/animals";

import { seedFamilyChangana } from "../seed/ch/family";
import { seedNumbersChangana } from "../seed/ch/numbers";
import { seedColorsChangana } from "../seed/ch/colors";
import { seedBodyChangana } from "../seed/ch/body";
import { seedAnimalsChangana } from "../seed/ch/animals";

export function seedDatabase() {
  // Inglês
  seedGreetings();
  seedFamilyEnglish();
  seedNumbersEnglish();
  seedColorsEnglish();
  seedBodyEnglish();
  seedAnimalsEnglish();

  // Changana
  seedGreetingsChangana();
  seedFamilyChangana();
  seedNumbersChangana();
  seedColorsChangana();
  seedBodyChangana();
  seedAnimalsChangana();
}