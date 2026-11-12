import { useState } from "react";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { parseKey, plateFit, weekLabel } from "@/lib/diet/plan";
import type { DayPlan, Slot, Targets } from "@/lib/diet/types";

export function WeekView({
  date,
  week,
  targets,
  eaten,
  onOpen,
  onShuffle,
}: {
  date: string;
  week: DayPlan[];
  targets: Targets;
  eaten: Record<string, Partial<Record<Slot, boolean>>>;
  onOpen: (date: string) => void;
  onShuffle: () => void;
}) {
  const [arm, setArm] = useState(false);
  const [noted, setNoted] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-mist">{weekLabel(date)}</p>
          <h1 className="font-display text-4xl leading-tight">Săptămâna aceasta</h1>
          <p className="mt-2 max-w-md text-mist">
            Șapte zile cu aceleași reguli. Deschide o zi pentru a o înregistra, sau amestecă dacă masa pare plictisitoare.
          </p>
        </div>
        <Button
          variant="quiet"
          onClick={() => {
            if (!arm) {
              setArm(true);
              return;
            }
            onShuffle();
            setArm(false);
            setNoted(true);
          }}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {arm ? "Înlocuiești farfuriile din această săptămână?" : "Amestecă farfuriile"}
        </Button>
      </header>
      {noted && <p className="text-sm text-mist">Farfurii noi. Înlocuirile anterioare pentru această săptămână au fost șterse.</p>}
      <div className="grid gap-3">
        {week.map((day) => {
          const when = parseKey(day.date);
          const active = day.date === date;
          const logged = day.meals.filter((meal) => eaten[day.date]?.[meal.slot]).length;
          const fit = plateFit(day, targets);
          const width = Math.max(4, Math.min(100, (day.totals.kcal / Math.max(1, targets.kcal)) * 100));
          const over = day.totals.kcal > targets.kcal * 1.05;
          const line = day.meals
            .map((meal) => meal.servings.map((serving) => serving.food.name).join(" + "))
            .filter(Boolean)
            .join(" · ");
          return (
            <button
              key={day.date}
              type="button"
              onClick={() => onOpen(day.date)}
              className={cn(
                "rounded-2xl border p-4 text-left",
                active ? "border-leaf bg-panel-2" : "border-line bg-panel",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl">{format(when, "EEE d")}</span>
                <span className="tabular-nums text-sm text-mist">{day.totals.kcal} kcal</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-mist">{line}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink">
                <div
                  className={cn("h-full rounded-full", over ? "bg-clay" : "bg-leaf")}
                  style={{ width: `${width}%` }}
                />
              </div>
              <p className="mt-2 text-sm tabular-nums text-mist">
                {logged} din {day.meals.length} înregistrate · {fit}% potrivire
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
