import { useState } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  ACTIVITY_COPY,
  ACTIVITY_ORDER,
  ALLERGEN_COPY,
  ALLERGEN_ORDER,
  GOAL_COPY,
  STYLE_COPY,
  STYLE_ORDER,
  hiddenAllergens,
} from "@/lib/diet/copy";
import type { Activity, Allergen, Goal, Profile, Sex, Style } from "@/lib/diet/types";

const SAMPLES: { label: string; hint: string; profile: Profile }[] = [
  {
    label: "Ana",
    hint: "Ease down · Mediterranean",
    profile: {
      name: "Ana",
      goal: "lose",
      sex: "female",
      age: 34,
      heightCm: 168,
      weightKg: 74,
      activity: "moderate",
      style: "mediterranean",
      exclusions: [],
      meals: 4,
    },
  },
  {
    label: "Mihai",
    hint: "Hold steady · high protein, no gluten",
    profile: {
      name: "Mihai",
      goal: "maintain",
      sex: "male",
      age: 41,
      heightCm: 182,
      weightKg: 88,
      activity: "active",
      style: "high-protein",
      exclusions: ["gluten"],
      meals: 4,
    },
  },
];

const FIELD =
  "h-12 w-full rounded-2xl border border-line bg-panel px-4 text-base text-cream outline-none placeholder:text-mist focus:border-leaf";

function validName(name: string): boolean {
  return /^[\p{L}][\p{L}\s'’-]{1,31}$/u.test(name.trim());
}

export function Onboarding({
  initial,
  onDone,
  onCancel,
}: {
  initial: Profile | null;
  onDone: (profile: Profile) => void;
  onCancel?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(initial?.name ?? "");
  const [goal, setGoal] = useState<Goal | null>(initial?.goal ?? null);
  const [sex, setSex] = useState<Sex>(initial?.sex ?? "female");
  const [age, setAge] = useState(String(initial?.age ?? 34));
  const [heightCm, setHeightCm] = useState(String(initial?.heightCm ?? 168));
  const [weightKg, setWeightKg] = useState(String(initial?.weightKg ?? 70));
  const [activity, setActivity] = useState<Activity>(initial?.activity ?? "moderate");
  const [style, setStyle] = useState<Style>(initial?.style ?? "balanced");
  const [exclusions, setExclusions] = useState<Allergen[]>(initial?.exclusions ?? []);
  const [meals, setMeals] = useState<3 | 4>(initial?.meals ?? 4);

  function toggleExclusion(id: Allergen) {
    setExclusions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function nextFromNumbers() {
    const ageN = Number(age);
    const heightN = Number(heightCm);
    const weightN = Number(weightKg);
    if (!Number.isFinite(ageN) || ageN < 16 || ageN > 90) {
      setError("Age needs to sit between 16 and 90.");
      return;
    }
    if (!Number.isFinite(heightN) || heightN < 140 || heightN > 220) {
      setError("Height, in centimeters, between 140 and 220.");
      return;
    }
    if (!Number.isFinite(weightN) || weightN < 40 || weightN > 220) {
      setError("Weight, in kilograms, between 40 and 220.");
      return;
    }
    setError(null);
    setStep(2);
  }

  function finish() {
    const ageN = Number(age);
    const heightN = Number(heightCm);
    const weightN = Number(weightKg);
    if (!goal) return;
    const hidden = new Set(hiddenAllergens(style));
    onDone({
      name: name.trim(),
      goal,
      sex,
      age: Math.round(ageN),
      heightCm: Math.round(heightN),
      weightKg: Math.round(weightN * 10) / 10,
      activity,
      style,
      exclusions: exclusions.filter((item) => !hidden.has(item)),
      meals,
    });
  }

  const titles = ["Who are we feeding?", "The arithmetic", "The kitchen you have"];

  return (
    <main className="min-h-screen bg-ink text-cream">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-8 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-display text-2xl font-semibold italic">
            <Leaf className="size-5 text-leaf" aria-hidden="true" />
            Linden
          </p>
          <p className="text-sm tabular-nums text-mist">
            {step + 1} / 3
          </p>
        </div>

        <form
          className="rise mt-10 flex flex-1 flex-col"
          key={step}
          onSubmit={(event) => {
            event.preventDefault();
            if (step === 0) {
              if (!validName(name)) {
                setError("Use a first name, two letters or more.");
                return;
              }
              if (!goal) {
                setError("Choose what this week should do.");
                return;
              }
              setError(null);
              setStep(1);
              return;
            }
            if (step === 1) {
              nextFromNumbers();
              return;
            }
            finish();
          }}
        >
          <h1 className="font-display text-4xl leading-tight">{titles[step]}</h1>
          <p className="mt-3 text-mist">
            {step === 0 && "Linden builds a week of plates around your numbers, not a generic menu."}
            {step === 1 && "Mifflin–St Jeor, then a trim or a little extra for the goal. You can change this later."}
            {step === 2 && "One way of eating, plus anything the kitchen must skip."}
          </p>

          {step === 0 && (
            <div className="mt-8 flex flex-col gap-6">
              <label className="block">
                <span className="mb-2 block text-sm text-mist">Name</span>
                <input
                  className={FIELD}
                  value={name}
                  autoComplete="given-name"
                  autoCapitalize="words"
                  maxLength={32}
                  placeholder="Your name"
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <fieldset>
                <legend className="mb-3 text-sm text-mist">What should the week do?</legend>
                <div className="grid gap-3">
                  {(Object.keys(GOAL_COPY) as Goal[]).map((id) => {
                    const copy = GOAL_COPY[id];
                    const selected = goal === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setGoal(id)}
                        className={cn(
                          "rounded-2xl border px-4 py-4 text-left",
                          selected ? "border-leaf bg-panel-2" : "border-line bg-panel",
                        )}
                      >
                        <span className="block font-medium">{copy.label}</span>
                        <span className="mt-1 block text-sm text-mist">{copy.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="mb-2 block text-sm text-mist">Age</span>
                  <input
                    className={FIELD}
                    inputMode="numeric"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-mist">Height</span>
                  <input
                    className={FIELD}
                    inputMode="decimal"
                    value={heightCm}
                    aria-label="Height in centimeters"
                    onChange={(event) => setHeightCm(event.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-mist">Weight</span>
                  <input
                    className={FIELD}
                    inputMode="decimal"
                    value={weightKg}
                    aria-label="Weight in kilograms"
                    onChange={(event) => setWeightKg(event.target.value)}
                  />
                </label>
              </div>
              <p className="-mt-3 text-sm text-mist">Height in cm, weight in kg.</p>
              <fieldset>
                <legend className="mb-2 text-sm text-mist">Body formula</legend>
                <p className="mb-3 text-sm text-mist">The equation uses one of two constants.</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["female", "male"] as Sex[]).map((id) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={sex === id}
                      onClick={() => setSex(id)}
                      className={cn(
                        "h-12 rounded-2xl border capitalize",
                        sex === id ? "border-leaf bg-panel-2" : "border-line bg-panel",
                      )}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm text-mist">A usual day</legend>
                <div className="grid gap-2">
                  {ACTIVITY_ORDER.map((id) => {
                    const copy = ACTIVITY_COPY[id];
                    const selected = activity === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setActivity(id)}
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-left",
                          selected ? "border-leaf bg-panel-2" : "border-line bg-panel",
                        )}
                      >
                        <span className="block font-medium">{copy.label}</span>
                        <span className="block text-sm text-mist">{copy.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 flex flex-col gap-6">
              <fieldset>
                <legend className="mb-3 text-sm text-mist">Way of eating</legend>
                <div className="grid grid-cols-2 gap-3">
                  {STYLE_ORDER.map((id) => {
                    const copy = STYLE_COPY[id];
                    const selected = style === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setStyle(id)}
                        className={cn(
                          "rounded-2xl border px-3 py-3 text-left",
                          id === "vegan" && "col-span-2",
                          selected ? "border-leaf bg-panel-2" : "border-line bg-panel",
                        )}
                      >
                        <span className="block font-medium">{copy.label}</span>
                        <span className="mt-1 block text-sm text-mist">{copy.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm text-mist">Skip these</legend>
                <div className="flex flex-wrap gap-2">
                  {ALLERGEN_ORDER.filter((id) => !hiddenAllergens(style).includes(id)).map((id) => {
                    const selected = exclusions.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleExclusion(id)}
                        className={cn(
                          "h-11 rounded-full border px-4 text-sm",
                          selected ? "border-leaf bg-leaf text-ink-on-leaf" : "border-line bg-panel text-cream",
                        )}
                      >
                        {ALLERGEN_COPY[id]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm text-mist">Plates in a day</legend>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      [3, "Three plates"],
                      [4, "Three, plus a snack"],
                    ] as const
                  ).map(([count, label]) => (
                    <button
                      key={count}
                      type="button"
                      aria-pressed={meals === count}
                      onClick={() => setMeals(count)}
                      className={cn(
                        "min-h-12 rounded-2xl border px-3 py-3 text-sm",
                        meals === count ? "border-leaf bg-panel-2" : "border-line bg-panel",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-clay" role="alert">
              {error}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <Button
                variant="quiet"
                onClick={() => {
                  setError(null);
                  setStep((value) => value - 1);
                }}
              >
                Back
              </Button>
            )}
            {step === 0 && onCancel && (
              <Button variant="quiet" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {step < 2 ? "Continue" : initial ? "Save rules" : "Build my week"}
            </Button>
          </div>
        </form>

        {step === 0 && !initial && (
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-sm text-mist">Or start from a sample kitchen</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SAMPLES.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => onDone(sample.profile)}
                  className="rounded-2xl border border-line bg-panel px-4 py-3 text-left"
                >
                  <span className="block font-medium">{sample.label}</span>
                  <span className="mt-1 block text-sm text-mist">{sample.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
