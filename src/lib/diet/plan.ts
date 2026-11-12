import { addDays, format, startOfWeek } from "date-fns";
import { FOODS } from "@/lib/diet/foods";
import type {
  Allergen,
  DayPlan,
  Food,
  Goal,
  Kind,
  Macros,
  PlannedMeal,
  Profile,
  ShopItem,
  Slot,
  Style,
  Targets,
} from "@/lib/diet/types";

const ACTIVITY_FACTOR = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
} as const;

const GROUP: Record<Kind, string> = {
  plant: "Plante și produse de bază",
  egg: "Ouă și lactate",
  dairy: "Ouă și lactate",
  fish: "Pește",
  poultry: "Pui și carne",
  meat: "Pui și carne",
};

const GROUP_ORDER = ["Plante și produse de bază", "Ouă și lactate", "Pește", "Pui și carne"];

export function formatKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
}

export function todayKey(now = new Date()): string {
  return formatKey(now);
}

export function shiftDate(key: string, days: number): string {
  return formatKey(addDays(parseKey(key), days));
}

export function weekDates(anchorKey: string): string[] {
  const start = startOfWeek(parseKey(anchorKey), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => formatKey(addDays(start, i)));
}

export function weekLabel(anchorKey: string): string {
  const days = weekDates(anchorKey);
  const a = parseKey(days[0] ?? anchorKey);
  const b = parseKey(days[6] ?? anchorKey);
  if (a.getMonth() === b.getMonth()) return `${format(a, "d")}–${format(b, "d MMM")}`;
  return `${format(a, "d MMM")} – ${format(b, "d MMM")}`;
}

export function greeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 11) return "Bună dimineața";
  if (h < 17) return "Bună ziua";
  return "Bună seara";
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

export function formatAmount(n: number): string {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

export function formatScale(scale: number): string | null {
  if (Math.abs(scale - 1) < 0.05) return null;
  return `${formatAmount(scale)}×`;
}

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function targets(profile: Profile): Targets {
  const sexConst = profile.sex === "male" ? 5 : -161;
  const bmrRaw =
    10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + sexConst;
  const tdeeRaw = bmrRaw * ACTIVITY_FACTOR[profile.activity];
  let kcal = tdeeRaw;
  if (profile.goal === "lose") kcal = Math.max(bmrRaw, tdeeRaw * 0.82);
  if (profile.goal === "gain") kcal = tdeeRaw * 1.12;
  kcal = Math.round(kcal / 10) * 10;

  const perKg = profile.style === "high-protein" ? 2 : profile.goal === "gain" ? 1.6 : 1.8;
  const protein = Math.round(profile.weightKg * perKg);
  const minFat = Math.round(profile.weightKg * 0.7);
  const proteinKcal = protein * 4;

  let fat: number;
  let carbs: number;
  if (profile.style === "low-carb") {
    const carbCap = Math.min(100, Math.round((kcal * 0.22) / 4));
    fat = Math.max(minFat, Math.round((kcal - proteinKcal - carbCap * 4) / 9));
    carbs = Math.max(0, Math.round((kcal - proteinKcal - fat * 9) / 4));
  } else {
    const fatRatio = profile.style === "high-protein" ? 0.28 : 0.3;
    fat = Math.max(minFat, Math.round((kcal * fatRatio) / 9));
    carbs = Math.round((kcal - proteinKcal - fat * 9) / 4);
    if (carbs < 0) {
      fat = Math.max(minFat, Math.round((kcal - proteinKcal) / 9));
      carbs = Math.max(0, Math.round((kcal - proteinKcal - fat * 9) / 4));
    }
  }

  const waterGlasses = Math.min(12, Math.max(6, Math.round((profile.weightKg * 35) / 250)));
  return {
    bmr: Math.round(bmrRaw),
    tdee: Math.round(tdeeRaw),
    kcal,
    protein,
    carbs,
    fat,
    waterGlasses,
  };
}

function slotsFor(meals: 3 | 4): Slot[] {
  return meals === 4 ? ["breakfast", "lunch", "dinner", "snack"] : ["breakfast", "lunch", "dinner"];
}

function share(slot: Slot, meals: 3 | 4): number {
  if (meals === 4) {
    if (slot === "breakfast") return 0.27;
    if (slot === "lunch") return 0.36;
    if (slot === "dinner") return 0.27;
    return 0.1;
  }
  if (slot === "breakfast") return 0.3;
  if (slot === "lunch") return 0.4;
  return 0.3;
}

function kindOk(food: Food, style: Style): boolean {
  if (style === "vegan") return food.kind === "plant";
  if (style === "vegetarian") return food.kind === "plant" || food.kind === "egg" || food.kind === "dairy";
  if (style === "pescatarian") return food.kind !== "poultry" && food.kind !== "meat";
  if (style === "mediterranean" && food.kind === "meat") return false;
  return true;
}

function allergenOk(food: Food, exclusions: Allergen[]): boolean {
  return !food.allergens.some((a) => exclusions.includes(a));
}

function candidates(slot: Slot, profile: Profile): Food[] {
  const base = FOODS.filter(
    (food) =>
      food.slots.includes(slot) && allergenOk(food, profile.exclusions) && kindOk(food, profile.style),
  );
  const strict = base.filter((food) => {
    if (profile.style === "low-carb" && !food.lowCarb) return false;
    if (profile.style === "mediterranean" && food.role === "main" && !food.med) return false;
    return true;
  });
  const mains = strict.filter((food) => food.role === "main");
  const sides = strict.filter((food) => food.role === "side");
  if (slot !== "snack" && mains.length < 2) return base;
  if (slot === "snack" && sides.length < 2) return base;
  return strict.length > 0 ? strict : base;
}

function combos(slot: Slot, foods: Food[], target: number): Food[][] {
  const mains = foods.filter((food) => food.role === "main");
  const sides = foods.filter((food) => food.role === "side");
  const out: Food[][] = [];
  if (slot === "snack") {
    for (const side of sides) out.push([side]);
    for (let i = 0; i < sides.length; i++) {
      for (let j = i + 1; j < sides.length; j++) {
        const a = sides[i];
        const b = sides[j];
        if (!a || !b) continue;
        if (a.kcal + b.kcal <= target * 1.35) out.push([a, b]);
      }
    }
  } else {
    for (const main of mains) {
      out.push([main]);
      if (main.kcal >= target) continue;
      for (const side of sides) out.push([main, side]);
    }
  }
  if (out.length === 0) {
    for (const food of foods) out.push([food]);
  }
  return out;
}

function sumBase(list: Food[]): Macros {
  return list.reduce(
    (total, food) => ({
      kcal: total.kcal + food.kcal,
      protein: total.protein + food.protein,
      carbs: total.carbs + food.carbs,
      fat: total.fat + food.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

function qualityScore(
  list: Food[],
  target: number,
  profile: Profile,
  dayUsed: Set<string>,
): number {
  const base = sumBase(list);
  const raw = base.kcal > 0 ? target / base.kcal : 1;
  const clamped = Math.min(1.8, Math.max(0.75, raw));
  let score = -Math.abs(Math.log(raw)) * 120;
  score -= Math.abs(base.kcal * clamped - target) * 0.2;
  if (list.some((food) => dayUsed.has(food.id))) score -= 80;
  if (profile.style === "high-protein") score += base.protein * 1.5;
  if (profile.style === "low-carb") score -= base.carbs * 1.2;
  if (profile.style === "mediterranean") score += list.filter((food) => food.med).length * 36;
  return score;
}

function applyScale(list: Food[], target: number): Pick<PlannedMeal, "servings" | "kcal" | "protein" | "carbs" | "fat"> {
  const base = sumBase(list);
  let scale = base.kcal > 0 ? target / base.kcal : 1;
  scale = Math.min(1.8, Math.max(0.75, scale));
  scale = Math.round(scale * 10) / 10;
  return {
    servings: list.map((food) => ({ food, scale })),
    kcal: Math.round(base.kcal * scale),
    protein: Math.round(base.protein * scale),
    carbs: Math.round(base.carbs * scale),
    fat: Math.round(base.fat * scale),
  };
}

function pickMeal(
  slot: Slot,
  profile: Profile,
  date: string,
  target: number,
  swap: number,
  seed: number,
  dayUsed: Set<string>,
): PlannedMeal {
  const lists = combos(slot, candidates(slot, profile), target);
  const seen = new Set<string>();
  const ranked: { list: Food[]; key: string; score: number; lead: string }[] = [];
  for (const list of lists) {
    const key = list
      .map((food) => food.id)
      .sort()
      .join("+");
    if (seen.has(key)) continue;
    seen.add(key);
    const leadFood = list.find((food) => food.role === "main") ?? [...list].sort((a, b) => b.kcal - a.kcal)[0];
    ranked.push({
      list,
      key,
      lead: leadFood?.id ?? key,
      score: qualityScore(list, target, profile, dayUsed),
    });
  }
  ranked.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));

  const groups = new Map<string, typeof ranked>();
  for (const row of ranked) {
    const bucket = groups.get(row.lead);
    if (bucket) bucket.push(row);
    else groups.set(row.lead, [row]);
  }
  const representatives: typeof ranked = [];
  for (const [lead, bucket] of groups) {
    const top = bucket[0];
    if (!top) continue;
    const close = bucket.filter((row) => top.score - row.score <= 32);
    const pool = close.length > 0 ? close : [top];
    const index = hashString(`${seed}|${date}|${slot}|${lead}`) % pool.length;
    const pick = pool[index];
    if (pick) representatives.push(pick);
  }
  representatives.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
  const best = representatives[0]?.score ?? 0;
  let band = representatives.filter((row) => best - row.score <= 36);
  if (band.length < 3) band = representatives.slice(0, 6);
  band = band.slice(0, 8);
  band.sort((a, b) => {
    const ha = hashString(`${seed}|${date}|${slot}|${a.lead}`);
    const hb = hashString(`${seed}|${date}|${slot}|${b.lead}`);
    return ha - hb || a.key.localeCompare(b.key);
  });
  const chosen = band[Math.abs(swap) % Math.max(1, band.length)];
  if (!chosen) {
    return { slot, servings: [], kcal: 0, protein: 0, carbs: 0, fat: 0, optionCount: 0 };
  }
  for (const food of chosen.list) dayUsed.add(food.id);
  return { slot, optionCount: band.length, ...applyScale(chosen.list, target) };
}

function emptyMacros(): Macros {
  return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
}

function addMacros(a: Macros, b: Macros): Macros {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

export function buildWeek(
  profile: Profile,
  anchorKey: string,
  swaps: Record<string, Partial<Record<Slot, number>>>,
  seed: number,
): DayPlan[] {
  const goal = targets(profile);
  return weekDates(anchorKey).map((date) => {
    const dayUsed = new Set<string>();
    const daySwaps = swaps[date] ?? {};
    const meals = slotsFor(profile.meals).map((slot) =>
      pickMeal(slot, profile, date, goal.kcal * share(slot, profile.meals), daySwaps[slot] ?? 0, seed, dayUsed),
    );
    const totals = meals.reduce(
      (sum, meal) => addMacros(sum, meal),
      emptyMacros(),
    );
    return { date, meals, totals };
  });
}

export function loggedTotals(
  day: DayPlan,
  eaten: Partial<Record<Slot, boolean>> | undefined,
): Macros {
  return day.meals
    .filter((meal) => eaten?.[meal.slot])
    .reduce((sum, meal) => addMacros(sum, meal), emptyMacros());
}

export function plateFit(day: DayPlan, goal: Targets): number {
  const cal = 1 - Math.min(1, Math.abs(day.totals.kcal - goal.kcal) / Math.max(1, goal.kcal));
  const protein = Math.min(1, day.totals.protein / Math.max(1, goal.protein));
  const carbs =
    1 -
    Math.min(1, Math.abs(day.totals.carbs - goal.carbs) / Math.max(40, goal.carbs));
  return Math.round((0.5 * cal + 0.3 * protein + 0.2 * carbs) * 100);
}

const NOTES: Record<Goal, string[]> = {
  lose: [
    "Deficitul este intenționat modest. Sări peste o farfurie de obicei face următoarea mai zgomotoasă.",
    "Dacă după-amiaza se împiedică, mănâncă gustarea. Să aștepți o cină mai mare rareori ajută.",
    "Uleiul este deja calculat. Un strop suplimentar neîncadrat este scurgerea obișnuită.",
    "Foamea care apare înaintea unei farfurii planificate este un semnal de mâncat, nu un test de voință.",
    "Cântărește-te, apoi uită-te la săptămână — o singură dimineață nu contează.",
  ],
  maintain: [
    "Menținerea încă vrea o farfurie reală. Să mănânci pe ici pe colo o face să se deranjeze numărul.",
    "Sarea apa, apoi oprește. Aceste farfurii presupun un bucătar, nu un pachet.",
    "Dacă prânzul se mută, mută și gustarea. Ziua tot se adună.",
    "Repetarea unei farfurii care ți-a plăcut este permisă. Schimbă doar când te plictisești.",
    "O plimbare după cină nu este în calcule. Totuși aparține zilei.",
  ],
  gain: [
    "Supralul este o a doua porție din farfurie, nu un obicei separat de desert.",
    "Dacă o farfurie pare mare, acesta este punctul săptămânii. Împarte-o dacă trebuie și termin-o.",
    "Proteinele sunt acolo ca să aibă unde să meargă mâncarea în plus.",
    "Antrenează-te, apoi mănâncă farfuria pe care ai planificat-o. Nu inventa a treia masă în bucătărie.",
    "Somnul este cealaltă jumătate a creșterii. Meniul nu poate face asta.",
  ],
};

export function kitchenNote(date: string, goal: Goal): string {
  const lines = NOTES[goal];
  return lines[hashString(`${date}|${goal}`) % lines.length] ?? lines[0] ?? "";
}

export function shopList(week: DayPlan[]): ShopItem[] {
  const map = new Map<string, ShopItem>();
  for (const day of week) {
    for (const meal of day.meals) {
      for (const serving of meal.servings) {
        const current = map.get(serving.food.id);
        if (current) current.amount += serving.scale;
        else {
          map.set(serving.food.id, {
            id: serving.food.id,
            name: serving.food.name,
            serving: serving.food.serving,
            amount: serving.scale,
            group: GROUP[serving.food.kind],
          });
        }
      }
    }
  }
  return [...map.values()].sort((a, b) => {
    const group = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group);
    return group || a.name.localeCompare(b.name);
  });
}
