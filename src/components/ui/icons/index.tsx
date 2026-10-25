// src/components/ui/icons/index.ts
import type { ComponentType } from "react";
import Welcome from "./Welcome";
import Greetings from "./greetings";
import BasicGreetings from './Basic';
import Animals from "./Animals";
import Colors from "./Colors";
import Family from "./Family";
import Numbers from "./Numbers";
import Body from "./Body";
import Grandma from "./Grandma";
import Parents from "./Parents"
import SpeakerIcon from "./speakerIcon";

// ... outros ícones

export * from "./home";
export * from "./settings";
export * from "./progress";
export * from "./searchIcon";
export * from "./backIcon";


export const ICONS: Record<string, ComponentType<any>> = {
  greetings: Greetings,
  welcome: Welcome,
  basicGreetings:BasicGreetings,
  speakerIcon: SpeakerIcon,
  animals: Animals,
  colors: Colors,
  family: Family,
  numbers: Numbers,
  body: Body,
  grandma: Grandma,
  parents: Parents,
};