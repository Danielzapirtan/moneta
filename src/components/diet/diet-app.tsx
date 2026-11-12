import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CircleUser, Leaf, ShoppingBasket, UtensilsCrossed } from "lucide-react";
import { Onboarding } from "@/components/diet/onboarding";
import { ShopView } from "@/components/diet/shop-view";
import { TodayView } from "@/components/diet/today-view";
import { WeekView } from "@/components/diet/week-view";
import { YouView } from "@/components/diet/you-view";
import { cn } from "@/lib/cn";
import { buildWeek, shopList, targets, todayKey, weekDates } from "@/lib/diet/plan";
import { useDiet } from "@/lib/diet/store";
import type { Profile, Slot } from "@/lib/diet/types";

type Tab = "today" | "week" | "shop" | "you";

const TABS: { id: Tab; label: string; icon: typeof Leaf }[] = [
  { id: "today", label: "Azi", icon: UtensilsCrossed },
  { id: "week", label: "Săptămâna", icon: CalendarDays },
  { id: "shop", label: "Cumpărături", icon: ShoppingBasket },
  { id: "you", label: "Tu", icon: CircleUser },
];

function Shell() {
  const profile = useDiet((state) => state.profile);
  const eaten = useDiet((state) => state.eaten);
  const swaps = useDiet((state) => state.swaps);
  const water = useDiet((state) => state.water);
  const shop = useDiet((state) => state.shop);
  const weekSeed = useDiet((state) => state.weekSeed);
  const setProfile = useDiet((state) => state.setProfile);
  const clearAll = useDiet((state) => state.clearAll);
  const toggleEaten = useDiet((state) => state.toggleEaten);
  const swapMeal = useDiet((state) => state.swapMeal);
  const setWater = useDiet((state) => state.setWater);
  const toggleShop = useDiet((state) => state.toggleShop);
  const reshuffle = useDiet((state) => state.reshuffle);

  const [tab, setTab] = useState<Tab>("today");
  const [date, setDate] = useState(todayKey);
  const [editing, setEditing] = useState(false);

  const goal = useMemo(() => (profile ? targets(profile) : null), [profile]);
  const week = useMemo(
    () => (profile ? buildWeek(profile, date, swaps, weekSeed) : []),
    [profile, date, swaps, weekSeed],
  );
  const day = week.find((item) => item.date === date) ?? week[0];
  const items = useMemo(() => shopList(week), [week]);
  const weekStart = weekDates(date)[0] ?? date;

  if (!profile || editing || !goal || !day) {
    return (
      <Onboarding
        initial={profile}
        onCancel={profile ? () => setEditing(false) : undefined}
        onDone={(next: Profile) => {
          setProfile(next);
          setEditing(false);
          setTab("today");
        }}
      />
    );
  }

  const shopKey = (id: string) => `${weekSeed}:${weekStart}:${id}`;

  return (
    <div className="min-h-screen bg-ink text-cream">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-leaf focus:px-4 focus:py-2 focus:text-ink-on-leaf"
      >
        Sari la conținut
      </a>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-line px-4 py-6 lg:flex">
          <div>
            <p className="flex items-center gap-2 px-2 font-display text-2xl font-semibold italic">
              <span className="flex size-10 items-center justify-center rounded-full bg-leaf text-ink-on-leaf">
                <Leaf className="size-5" aria-hidden="true" />
              </span>
              Linden
            </p>
            <nav aria-label="Primary" className="mt-8 flex flex-col gap-1">
              {TABS.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setTab(item.id)}
                    className={cn(
                      "flex h-12 items-center gap-3 rounded-2xl px-3 text-left",
                      active ? "bg-panel-2 text-cream" : "text-mist hover:bg-panel hover:text-cream",
                    )}
                  >
                    <Icon className={cn("size-5", active && "text-leaf")} aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <p className="px-3 text-sm text-mist">Păstrat pe acest dispozitiv.</p>
        </aside>
        <main id="content" className="min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-8 lg:px-10 lg:pb-12">
          {tab === "today" && (
            <TodayView
              profile={profile}
              date={date}
              setDate={setDate}
              day={day}
              targets={goal}
              eaten={eaten[date]}
              swapIndex={(slot: Slot) => swaps[date]?.[slot] ?? 0}
              water={water[date] ?? 0}
              onToggle={(slot) => toggleEaten(date, slot)}
              onSwap={(slot) => swapMeal(date, slot)}
              onWater={(count) => setWater(date, count)}
            />
          )}
          {tab === "week" && (
            <WeekView
              date={date}
              week={week}
              targets={goal}
              eaten={eaten}
              onOpen={(next) => {
                setDate(next);
                setTab("today");
              }}
              onShuffle={reshuffle}
            />
          )}
          {tab === "shop" && (
            <ShopView
              date={date}
              items={items}
              checked={(id) => Boolean(shop[shopKey(id)])}
              onToggle={(id) => toggleShop(shopKey(id))}
            />
          )}
          {tab === "you" && (
            <YouView
              profile={profile}
              targets={goal}
              onWeight={(kg) => setProfile({ ...profile, weightKg: kg })}
              onEdit={() => setEditing(true)}
              onClear={clearAll}
            />
          )}
        </main>
      </div>
      <nav
        aria-label="Primary"
        className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink lg:hidden"
      >
        <div className="mx-auto flex max-w-lg">
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex h-16 flex-1 flex-col items-center justify-center gap-1 text-xs",
                  active ? "text-leaf" : "text-mist",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function DietApp() {
  useEffect(() => {
    void useDiet.persist.rehydrate();
  }, []);
  return <Shell />;
}
