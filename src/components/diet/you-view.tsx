import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACTIVITY_COPY, ALLERGEN_COPY, GOAL_COPY, STYLE_COPY } from "@/lib/diet/copy";
import type { Profile, Targets } from "@/lib/diet/types";

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-4">
      <p className="text-sm text-mist">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums leading-none">{value}</p>
      <p className="mt-1 text-sm text-mist">{unit}</p>
    </div>
  );
}

function formatKg(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function YouView({
  profile,
  targets,
  onWeight,
  onEdit,
  onClear,
}: {
  profile: Profile;
  targets: Targets;
  onWeight: (kg: number) => void;
  onEdit: () => void;
  onClear: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  const delta = targets.tdee - targets.kcal;
  const skipped = profile.exclusions.map((id) => ALLERGEN_COPY[id]);

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <header>
        <p className="text-sm text-mist">Kept on this device</p>
        <h1 className="font-display text-4xl leading-tight">{profile.name}</h1>
        <p className="mt-2 text-mist">
          {GOAL_COPY[profile.goal].label} · {STYLE_COPY[profile.style].label} ·{" "}
          {ACTIVITY_COPY[profile.activity].label}
          {profile.meals === 4 ? " · snack included" : " · three plates"}
          {skipped.length > 0 ? ` · skipping ${skipped.join(", ").toLowerCase()}` : ""}
        </p>
      </header>

      <section className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-4">
        <div>
          <p className="text-sm text-mist">Weight</p>
          <p className="font-display text-4xl tabular-nums">{formatKg(profile.weightKg)} kg</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="quiet"
            aria-label="Decrease weight by half a kilogram"
            onClick={() => onWeight(Math.max(40, Math.round((profile.weightKg - 0.5) * 10) / 10))}
          >
            <Minus className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="quiet"
            aria-label="Increase weight by half a kilogram"
            onClick={() => onWeight(Math.min(220, Math.round((profile.weightKg + 0.5) * 10) / 10))}
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Resting burn" value={String(targets.bmr)} unit="kcal" />
        <Stat label="With activity" value={String(targets.tdee)} unit="kcal" />
        <Stat label="Day's target" value={String(targets.kcal)} unit="kcal" />
        <Stat label="Protein" value={String(targets.protein)} unit="grams" />
        <Stat label="Carbs" value={String(targets.carbs)} unit="grams" />
        <Stat label="Fat" value={String(targets.fat)} unit="grams" />
      </section>

      <p className="max-w-xl text-sm text-mist">
        {profile.goal === "lose" && `About ${delta} kcal under maintenance. `}
        {profile.goal === "gain" && `About ${Math.abs(delta)} kcal over maintenance. `}
        {profile.goal === "maintain" && "Set to match what you burn. "}
        Estimated with Mifflin–St Jeor. These are targets, not a prescription.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onEdit}>Edit rules</Button>
        <Button
          variant="quiet"
          className="text-clay"
          onClick={() => {
            if (!confirm) {
              setConfirm(true);
              return;
            }
            onClear();
          }}
        >
          {confirm ? "Erase everything on this device?" : "Clear this device"}
        </Button>
      </div>
    </div>
  );
}
