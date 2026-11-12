import type { Activity, Allergen, Goal, Slot, Style } from "@/lib/diet/types";

export const GOAL_COPY: Record<Goal, { label: string; hint: string }> = {
  lose: { label: "Ease down", hint: "A modest deficit, still a full plate" },
  maintain: { label: "Hold steady", hint: "Eat about what you burn" },
  gain: { label: "Build", hint: "A small surplus for adding weight" },
};

export const ACTIVITY_COPY: Record<Activity, { label: string; hint: string }> = {
  sedentary: { label: "Desk-bound", hint: "Little walking" },
  light: { label: "Light", hint: "Walks most days" },
  moderate: { label: "On your feet", hint: "Or training about three times a week" },
  active: { label: "Hard training", hint: "Most days, or a physical job" },
  athlete: { label: "Athlete", hint: "Two sessions a day, or heavy labor" },
};

export const STYLE_COPY: Record<Style, { label: string; hint: string }> = {
  balanced: { label: "Balanced", hint: "No extra rules" },
  mediterranean: { label: "Mediterranean", hint: "Fish, olive oil, plants" },
  "high-protein": { label: "High protein", hint: "Plates lean toward protein" },
  "low-carb": { label: "Low carb", hint: "Fewer starches, more fat" },
  pescatarian: { label: "Pescatarian", hint: "Fish, no meat" },
  vegetarian: { label: "Vegetarian", hint: "Eggs and dairy stay" },
  vegan: { label: "Vegan", hint: "Plants only" },
};

export const ALLERGEN_COPY: Record<Allergen, string> = {
  dairy: "Dairy",
  eggs: "Eggs",
  nuts: "Nuts",
  gluten: "Gluten",
  soy: "Soy",
  fish: "Fish",
  shellfish: "Shellfish",
};

export const SLOT_COPY: Record<Slot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
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
