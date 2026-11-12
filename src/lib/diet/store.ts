import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Profile, Slot } from "@/lib/diet/types";

type DietState = {
  profile: Profile | null;
  eaten: Record<string, Partial<Record<Slot, boolean>>>;
  swaps: Record<string, Partial<Record<Slot, number>>>;
  water: Record<string, number>;
  shop: Record<string, boolean>;
  weekSeed: number;
  setProfile: (profile: Profile) => void;
  clearAll: () => void;
  toggleEaten: (date: string, slot: Slot) => void;
  swapMeal: (date: string, slot: Slot) => void;
  setWater: (date: string, count: number) => void;
  toggleShop: (key: string) => void;
  reshuffle: () => void;
};

export const useDiet = create<DietState>()(
  persist(
    (set) => ({
      profile: null,
      eaten: {},
      swaps: {},
      water: {},
      shop: {},
      weekSeed: 1,
      setProfile: (profile) => set({ profile }),
      clearAll: () =>
        set({
          profile: null,
          eaten: {},
          swaps: {},
          water: {},
          shop: {},
          weekSeed: 1,
        }),
      toggleEaten: (date, slot) =>
        set((state) => ({
          eaten: {
            ...state.eaten,
            [date]: { ...state.eaten[date], [slot]: !state.eaten[date]?.[slot] },
          },
        })),
      swapMeal: (date, slot) =>
        set((state) => ({
          swaps: {
            ...state.swaps,
            [date]: { ...state.swaps[date], [slot]: (state.swaps[date]?.[slot] ?? 0) + 1 },
          },
        })),
      setWater: (date, count) =>
        set((state) => ({
          water: {
            ...state.water,
            [date]: Math.max(0, Math.min(16, Math.round(count))),
          },
        })),
      toggleShop: (key) =>
        set((state) => ({
          shop: { ...state.shop, [key]: !state.shop[key] },
        })),
      reshuffle: () =>
        set((state) => ({
          weekSeed: state.weekSeed + 1,
          swaps: {},
          shop: {},
        })),
    }),
    {
      name: "linden-diet",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        profile: state.profile,
        eaten: state.eaten,
        swaps: state.swaps,
        water: state.water,
        shop: state.shop,
        weekSeed: state.weekSeed,
      }),
    },
  ),
);
