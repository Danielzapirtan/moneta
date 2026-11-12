export type Kind = "plant" | "egg" | "dairy" | "fish" | "poultry" | "meat";

export type Allergen = "dairy" | "nuts" | "gluten" | "shellfish" | "eggs" | "soy" | "fish";

export type Style =
  | "balanced"
  | "mediterranean"
  | "high-protein"
  | "low-carb"
  | "vegetarian"
  | "vegan"
  | "pescatarian";

export type Slot = "breakfast" | "lunch" | "dinner" | "snack";

export type Goal = "lose" | "maintain" | "gain";

export type Activity = "sedentary" | "light" | "moderate" | "active" | "athlete";

export type Sex = "female" | "male";

export type Profile = {
  name: string;
  goal: Goal;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: Activity;
  style: Style;
  exclusions: Allergen[];
  meals: 3 | 4;
};

export type Food = {
  id: string;
  name: string;
  detail: string;
  slots: Slot[];
  role: "main" | "side";
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  kind: Kind;
  allergens: Allergen[];
  med: boolean;
  lowCarb: boolean;
};

export type Targets = {
  bmr: number;
  tdee: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  waterGlasses: number;
};

export type Serving = {
  food: Food;
  scale: number;
};

export type PlannedMeal = {
  slot: Slot;
  servings: Serving[];
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  optionCount: number;
};

export type Macros = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type DayPlan = {
  date: string;
  meals: PlannedMeal[];
  totals: Macros;
};

export type ShopItem = {
  id: string;
  name: string;
  serving: string;
  amount: number;
  group: string;
};
