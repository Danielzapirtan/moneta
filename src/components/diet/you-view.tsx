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
        <p className="text-sm text-mist">Păstrat pe acest dispozitiv</p>
        <h1 className="font-display text-4xl leading-tight">{profile.name}</h1>
        <p className="mt-2 text-mist">
          {GOAL_COPY[profile.goal].label} · {STYLE_COPY[profile.style].label} ·{" "}
          {ACTIVITY_COPY[profile.activity].label}
          {profile.meals === 4 ? " · gustare inclusă" : " · trei farfurii"}
          {skipped.length > 0 ? ` · exclud ${skipped.join(", ").toLowerCase()}` : ""}
        </p>
      </header>

      <section className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-4">
        <div>
          <p className="text-sm text-mist">Greutate</p>
          <p className="font-display text-4xl tabular-nums">{formatKg(profile.weightKg)} kg</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="quiet"
            aria-label="Scade greutatea cu jumătate de kilogram"
            onClick={() => onWeight(Math.max(40, Math.round((profile.weightKg - 0.5) * 10) / 10))}
          >
            <Minus className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="quiet"
            aria-label="Crește greutatea cu jumătate de kilogram"
            onClick={() => onWeight(Math.min(220, Math.round((profile.weightKg + 0.5) * 10) / 10))}
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Metabolism de repaus" value={String(targets.bmr)} unit="kcal" />
        <Stat label="Cu activitate" value={String(targets.tdee)} unit="kcal" />
        <Stat label="Ținta zilei" value={String(targets.kcal)} unit="kcal" />
        <Stat label="Proteine" value={String(targets.protein)} unit="grame" />
        <Stat label="Carbohidrați" value={String(targets.carbs)} unit="grame" />
        <Stat label="Grăsimi" value={String(targets.fat)} unit="grame" />
      </section>

      <p className="max-w-xl text-sm text-mist">
        {profile.goal === "lose" && `Aproximativ ${delta} kcal sub întreținere. `}
        {profile.goal === "gain" && `Aproximativ ${Math.abs(delta)} kcal peste întreținere. `}
        {profile.goal === "maintain" && "Setat să se potrivească cu ceea ce arzi. "}
        Estimate cu Mifflin–St Jeor. Acestea sunt ținte, nu o prescripție.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onEdit}>Editează regulile</Button>
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
          {confirm ? "Ștergi totul pe acest dispozitiv?" : "Golește acest dispozitiv"}
        </Button>
      </div>
    </div>
  );
}
