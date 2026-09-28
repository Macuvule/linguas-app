// src/components/ui/icons/index.ts
import type { ComponentType } from "react";
import Welcome from "./Welcome";
import Greetings from "./greetings";
import BasicGreetings from './Basic';
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
};