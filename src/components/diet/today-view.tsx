import { format } from "date-fns";
import { ArrowLeftRight, Check, ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { SLOT_COPY } from "@/lib/diet/copy";
import {
  firstName,
  formatScale,
  greeting,
  kitchenNote,
  loggedTotals,
  parseKey,
  plateFit,
  shiftDate,
  todayKey,
} from "@/lib/diet/plan";
import type { DayPlan, Profile, Slot, Targets } from "@/lib/diet/types";

function Ring({ logged, target }: { logged: number; target: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const over = logged > target;
  const pct = target > 0 ? Math.max(0, Math.min(1, logged / target)) : 0;
  const left = Math.max(0, target - logged);
  const shown = over ? logged - target : left;
  return (
    <div
      className="relative size-32 shrink-0"
      role="img"
      aria-label={
        over
          ? `${logged} kilocalories logged, ${shown} over the ${target} target`
          : `${left} kilocalories left of ${target}`
      }
    >
      <svg viewBox="0 0 100 100" className="size-full">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="stroke-panel-2" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 50 50)"
          className={cn(
            "motion-safe:transition-[stroke-dashoffset] motion-safe:duration-300",
            over ? "stroke-clay" : "stroke-leaf",
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display text-2xl tabular-nums", over && "text-clay")}>{shown}</span>
        <span className="text-xs text-mist">{over ? "peste" : "rămas"}</span>
      </div>
    </div>
  );
}

function MacroBar({
  label,
  value,
  goal,
  tone,
}: {
  label: string;
  value: number;
  goal: number;
  tone: string;
}) {
  const pct = Math.max(0, Math.min(100, goal > 0 ? (value / goal) * 100 : 0));
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="text-mist">{label}</span>
        <span className="tabular-nums">
          {value}
          <span className="text-mist"> / {goal} g</span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-panel-2">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function TodayView({
  profile,
  date,
  setDate,
  day,
  targets,
  eaten,
  swapIndex,
  water,
  onToggle,
  onSwap,
  onWater,
}: {
  profile: Profile;
  date: string;
  setDate: (date: string) => void;
  day: DayPlan;
  targets: Targets;
  eaten: Partial<Record<Slot, boolean>> | undefined;
  swapIndex: (slot: Slot) => number;
  water: number;
  onToggle: (slot: Slot) => void;
  onSwap: (slot: Slot) => void;
  onWater: (count: number) => void;
}) {
  const logged = loggedTotals(day, eaten);
  const loggedMeals = day.meals.filter((meal) => eaten?.[meal.slot]).length;
  const fit = plateFit(day, targets);
  const isToday = date === todayKey();
  const when = parseKey(date);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:col-span-5">
        <div>
          <p className="text-sm text-mist">{format(when, "EEEE d MMMM")}</p>
          <h1 className="font-display text-4xl leading-tight">
            {isToday ? `${greeting()}, ${firstName(profile.name)}.` : format(when, "EEEE")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="quiet" aria-label="Ziua anterioară" onClick={() => setDate(shiftDate(date, -1))}>
            <ChevronLeft className="size-5" />
          </Button>
          {!isToday && (
            <Button variant="quiet" size="sm" onClick={() => setDate(todayKey())}>
              Azi
            </Button>
          )}
          <Button size="icon" variant="quiet" aria-label="Ziua următoare" onClick={() => setDate(shiftDate(date, 1))}>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-5 lg:col-span-2">
        <div className="flex items-center gap-4">
          <Ring logged={logged.kcal} target={targets.kcal} />
          <div className="min-w-0">
            <p className="text-sm text-mist">Înregistrat</p>
            <p className="font-display text-3xl tabular-nums leading-none">
              {logged.kcal}
              <span className="text-lg text-mist"> / {targets.kcal}</span>
            </p>
            <p className="mt-2 text-sm text-mist">
              Plan {day.totals.kcal} kcal · {fit}% potrivire a farfuriei
            </p>
            <p className="text-sm text-mist">
              {loggedMeals} din {day.meals.length} farfurii înregistrate
            </p>
          </div>        </div>
        <div className="flex flex-col gap-3">
          <MacroBar label="Proteine" value={logged.protein} goal={targets.protein} tone="bg-leaf" />
          <MacroBar label="Carbohidrați" value={logged.carbs} goal={targets.carbs} tone="bg-cream" />
          <MacroBar label="Grăsimi" value={logged.fat} goal={targets.fat} tone="bg-clay" />
        </div>
        <div className="border-t border-line pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-mist">
              <Droplets className="size-4 text-leaf" aria-hidden="true" />
              Apă
            </p>
            <p className="text-sm tabular-nums text-mist">
              {water * 250} / {targets.waterGlasses * 250} ml
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: targets.waterGlasses }, (_, index) => {
              const filled = index < water;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Setează apa la ${index + 1} pahar${index === 0 ? "" : "e"}`}
                  aria-pressed={filled}
                  onClick={() => onWater(water === index + 1 ? index : index + 1)}
                  className={cn(
                    "size-11 rounded-full border",
                    filled ? "border-leaf bg-leaf" : "border-line bg-ink",
                  )}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 lg:col-span-3">
        {day.meals.map((meal) => {
          const loggedPlate = Boolean(eaten?.[meal.slot]);
          const swap = swapIndex(meal.slot);
          const option = meal.optionCount > 0 ? (swap % meal.optionCount) + 1 : 0;
          return (
            <article
              key={meal.slot}
              className={cn(
                "rounded-2xl border bg-panel p-4",
                loggedPlate ? "border-leaf" : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl">{SLOT_COPY[meal.slot]}</h2>
                  {meal.optionCount > 1 && (
                    <p className="text-sm tabular-nums text-mist">
                      Farfurie {option} din {meal.optionCount}
                    </p>
                  )}
                </div>
                {meal.optionCount > 1 && (
                  <Button
                    size="icon"
                    variant="quiet"
                    aria-label={`Altă ${SLOT_COPY[meal.slot].toLowerCase()}`}
                    onClick={() => onSwap(meal.slot)}
                  >
                    <ArrowLeftRight className="size-5" />
                  </Button>
                )}
              </div>
              {meal.servings.length === 0 ? (
                <p className="mt-3 text-sm text-mist">
                  Nimic din bucătărie nu se potrivește acestui interval. Relaxează o restricție din secțiunea Numerele tale.
                </p>
              ) : (
                <ul className="mt-3 flex flex-col gap-3">
                  {meal.servings.map((serving) => {
                    const scale = formatScale(serving.scale);
                    return (
                      <li key={serving.food.id}>
                        <p className="font-medium">{serving.food.name}</p>
                        <p className="text-sm text-mist">
                          {serving.food.detail}
                          {" · "}
                          {[scale, serving.food.serving].filter(Boolean).join(" · ")}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
              <p className="mt-3 text-sm tabular-nums text-mist">
                {meal.kcal} kcal · {meal.protein} g proteine · {meal.carbs} g carbohidrați · {meal.fat} g grăsimi
              </p>
              <Button
                variant={loggedPlate ? "primary" : "quiet"}
                className="mt-4 w-full"
                aria-pressed={loggedPlate}
                onClick={() => onToggle(meal.slot)}
                disabled={meal.servings.length === 0}
              >
                <Check className="size-4" aria-hidden="true" />
                {loggedPlate ? "Înregistrat" : "Înregistrează farfuria"}
              </Button>
            </article>
          );
        })}
        <p className="border-l-2 border-leaf px-4 py-1 text-sm text-mist">
          {kitchenNote(date, profile.goal)}
        </p>
      </section>
    </div>
  );
}
