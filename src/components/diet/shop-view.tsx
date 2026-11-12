import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatAmount, weekLabel } from "@/lib/diet/plan";
import type { ShopItem } from "@/lib/diet/types";

export function ShopView({
  date,
  items,
  checked,
  onToggle,
}: {
  date: string;
  items: ShopItem[];
  checked: (id: string) => boolean;
  onToggle: (id: string) => void;
}) {
  const done = items.filter((item) => checked(item.id)).length;
  let lastGroup = "";

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-sm text-mist">{weekLabel(date)}</p>
        <h1 className="font-display text-4xl leading-tight">Shopping</h1>
        <p className="mt-2 max-w-md text-mist">
          From the plates in this week. Amounts follow the servings on the plan.
        </p>
        <p className="mt-3 text-sm tabular-nums text-mist">
          {done} of {items.length} packed
        </p>
      </header>
      {items.length === 0 ? (
        <p className="rounded-2xl border border-line bg-panel p-4 text-mist">
          No plates yet. Ease a restriction and the list will fill.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const on = checked(item.id);
            const showGroup = item.group !== lastGroup;
            const heading =
              showGroup ? (
                <h2 className={cn("mb-2 text-sm text-mist", lastGroup !== "" && "mt-4")}>{item.group}</h2>
              ) : null;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {heading}
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onToggle(item.id)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-line bg-panel px-3 py-3 text-left"
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full border",
                      on ? "border-leaf bg-leaf text-ink-on-leaf" : "border-line",
                    )}
                    aria-hidden="true"
                  >
                    {on && <Check className="size-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block break-words", on && "text-mist line-through")}>{item.name}</span>
                    <span className="block text-sm tabular-nums text-mist">
                      {formatAmount(item.amount)} × {item.serving}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
