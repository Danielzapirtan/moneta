import type { Activity, Allergen, Goal, Slot, Style } from "@/lib/diet/types";

export const GOAL_COPY: Record<Goal, { label: string; hint: string }> = {
  lose: { label: "Reducere", hint: "Un deficit modest, dar cu farfurie plină" },
  maintain: { label: "Menținere", hint: "Mănânci cam cât arzi" },
  gain: { label: "Creștere", hint: "Un surplus mic pentru a câștiga în greutate" },
};

export const ACTIVITY_COPY: Record<Activity, { label: string; hint: string }> = {
  sedentary: { label: "La birou", hint: "Puțină plimbare" },
  light: { label: "Ușor", hint: "Mergi în majoritatea zilelor" },
  moderate: { label: "În mișcare", hint: "Sau antrenament de aproximativ trei ori pe săptămână" },
  active: { label: "Antrenament intens", hint: "Majoritatea zilelor sau un job fizic" },
  athlete: { label: "Atlet", hint: "Două sesiuni pe zi sau muncă grea" },
};

export const STYLE_COPY: Record<Style, { label: string; hint: string }> = {
  balanced: { label: "Echilibrat", hint: "Fără reguli suplimentare" },
  mediterranean: { label: "Mediteranean", hint: "Pește, ulei de măsline, plante" },
  "high-protein": { label: "Ridicat în proteine", hint: "Farfurii orientate spre proteină" },
  "low-carb": { label: "Cu puține carbohidrați", hint: "Mai puține amidonuri, mai multe grăsimi" },
  pescatarian: { label: "Pescatarian", hint: "Pește, fără carne" },
  vegetarian: { label: "Vegetarian", hint: "Ouăle și produsele lactate rămân" },
  vegan: { label: "Vegan", hint: "Numai plante" },
};

export const ALLERGEN_COPY: Record<Allergen, string> = {
  dairy: "Lactate",
  eggs: "Ouă",
  nuts: "Nuci",
  gluten: "Gluten",
  soy: "Soia",
  fish: "Pește",
  shellfish: "Crustacee",
};

export const SLOT_COPY: Record<Slot, string> = {
  breakfast: "Mic dejun",
  lunch: "Prânz",
  dinner: "Cină",
  snack: "Gustare",
};

export const STYLE_ORDER: Style[] = [
  "balanced",
  "mediterranean",
  "high-protein",
  "low-carb",
  "pescatarian",
  "vegetarian",
  "vegan",
];

export const ACTIVITY_ORDER: Activity[] = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "athlete",
];

export const ALLERGEN_ORDER: Allergen[] = [
  "dairy",
  "eggs",
  "nuts",
  "gluten",
  "soy",
  "fish",
  "shellfish",
];

/** Allergens a style already refuses, so the chips stay quiet. */
export function hiddenAllergens(style: Style): Allergen[] {
  if (style === "vegan") return ["dairy", "eggs", "fish", "shellfish"];
  if (style === "vegetarian") return ["fish", "shellfish"];
  return [];
}
