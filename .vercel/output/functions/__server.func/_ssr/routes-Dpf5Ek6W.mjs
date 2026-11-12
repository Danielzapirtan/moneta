import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, c as Droplets, d as ChevronLeft, f as Check, i as RefreshCw, l as CircleUser, m as ArrowLeftRight, o as Minus, p as CalendarDays, r as ShoppingBasket, s as Leaf, t as UtensilsCrossed, u as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as startOfWeek, r as addDays, t as format } from "../_libs/date-fns.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dpf5Ek6W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonStyles = cva("inline-flex items-center justify-center gap-2 rounded-full font-medium motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf disabled:pointer-events-none disabled:opacity-40", {
	variants: {
		variant: {
			primary: "bg-leaf text-ink-on-leaf hover:bg-leaf/90",
			quiet: "border border-line bg-panel-2 text-cream hover:bg-panel",
			ghost: "bg-transparent text-cream hover:bg-panel-2"
		},
		size: {
			md: "h-12 px-5 text-base",
			sm: "h-11 px-4 text-sm",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonStyles({
			variant,
			size
		}), className),
		...props
	});
}
var GOAL_COPY = {
	lose: {
		label: "Ease down",
		hint: "A modest deficit, still a full plate"
	},
	maintain: {
		label: "Hold steady",
		hint: "Eat about what you burn"
	},
	gain: {
		label: "Build",
		hint: "A small surplus for adding weight"
	}
};
var ACTIVITY_COPY = {
	sedentary: {
		label: "Desk-bound",
		hint: "Little walking"
	},
	light: {
		label: "Light",
		hint: "Walks most days"
	},
	moderate: {
		label: "On your feet",
		hint: "Or training about three times a week"
	},
	active: {
		label: "Hard training",
		hint: "Most days, or a physical job"
	},
	athlete: {
		label: "Athlete",
		hint: "Two sessions a day, or heavy labor"
	}
};
var STYLE_COPY = {
	balanced: {
		label: "Balanced",
		hint: "No extra rules"
	},
	mediterranean: {
		label: "Mediterranean",
		hint: "Fish, olive oil, plants"
	},
	"high-protein": {
		label: "High protein",
		hint: "Plates lean toward protein"
	},
	"low-carb": {
		label: "Low carb",
		hint: "Fewer starches, more fat"
	},
	pescatarian: {
		label: "Pescatarian",
		hint: "Fish, no meat"
	},
	vegetarian: {
		label: "Vegetarian",
		hint: "Eggs and dairy stay"
	},
	vegan: {
		label: "Vegan",
		hint: "Plants only"
	}
};
var ALLERGEN_COPY = {
	dairy: "Dairy",
	eggs: "Eggs",
	nuts: "Nuts",
	gluten: "Gluten",
	soy: "Soy",
	fish: "Fish",
	shellfish: "Shellfish"
};
var SLOT_COPY = {
	breakfast: "Breakfast",
	lunch: "Lunch",
	dinner: "Dinner",
	snack: "Snack"
};
var STYLE_ORDER = [
	"balanced",
	"mediterranean",
	"high-protein",
	"low-carb",
	"pescatarian",
	"vegetarian",
	"vegan"
];
var ACTIVITY_ORDER = [
	"sedentary",
	"light",
	"moderate",
	"active",
	"athlete"
];
var ALLERGEN_ORDER = [
	"dairy",
	"eggs",
	"nuts",
	"gluten",
	"soy",
	"fish",
	"shellfish"
];
/** Allergens a style already refuses, so the chips stay quiet. */
function hiddenAllergens(style) {
	if (style === "vegan") return [
		"dairy",
		"eggs",
		"fish",
		"shellfish"
	];
	if (style === "vegetarian") return ["fish", "shellfish"];
	return [];
}
var SAMPLES = [{
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
		meals: 4
	}
}, {
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
		meals: 4
	}
}];
var FIELD = "h-12 w-full rounded-2xl border border-line bg-panel px-4 text-base text-cream outline-none placeholder:text-mist focus:border-leaf";
function validName(name) {
	return /^[\p{L}][\p{L}\s'’-]{1,31}$/u.test(name.trim());
}
function Onboarding({ initial, onDone, onCancel }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [goal, setGoal] = (0, import_react.useState)(initial?.goal ?? null);
	const [sex, setSex] = (0, import_react.useState)(initial?.sex ?? "female");
	const [age, setAge] = (0, import_react.useState)(String(initial?.age ?? 34));
	const [heightCm, setHeightCm] = (0, import_react.useState)(String(initial?.heightCm ?? 168));
	const [weightKg, setWeightKg] = (0, import_react.useState)(String(initial?.weightKg ?? 70));
	const [activity, setActivity] = (0, import_react.useState)(initial?.activity ?? "moderate");
	const [style, setStyle] = (0, import_react.useState)(initial?.style ?? "balanced");
	const [exclusions, setExclusions] = (0, import_react.useState)(initial?.exclusions ?? []);
	const [meals, setMeals] = (0, import_react.useState)(initial?.meals ?? 4);
	function toggleExclusion(id) {
		setExclusions((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
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
			meals
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-ink text-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-8 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 font-display text-2xl font-semibold italic",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
							className: "size-5 text-leaf",
							"aria-hidden": "true"
						}), "Linden"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-mist",
						children: [step + 1, " / 3"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rise mt-10 flex flex-1 flex-col",
					onSubmit: (event) => {
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
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-tight",
							children: [
								"Who are we feeding?",
								"The arithmetic",
								"The kitchen you have"
							][step]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-mist",
							children: [
								step === 0 && "Linden builds a week of plates around your numbers, not a generic menu.",
								step === 1 && "Mifflin–St Jeor, then a trim or a little extra for the goal. You can change this later.",
								step === 2 && "One way of eating, plus anything the kitchen must skip."
							]
						}),
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-2 block text-sm text-mist",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: FIELD,
									value: name,
									autoComplete: "given-name",
									autoCapitalize: "words",
									maxLength: 32,
									placeholder: "Your name",
									onChange: (event) => setName(event.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "mb-3 text-sm text-mist",
								children: "What should the week do?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3",
								children: Object.keys(GOAL_COPY).map((id) => {
									const copy = GOAL_COPY[id];
									const selected = goal === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": selected,
										onClick: () => setGoal(id),
										className: cn("rounded-2xl border px-4 py-4 text-left", selected ? "border-leaf bg-panel-2" : "border-line bg-panel"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-medium",
											children: copy.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-sm text-mist",
											children: copy.hint
										})]
									}, id);
								})
							})] })]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-sm text-mist",
												children: "Age"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: FIELD,
												inputMode: "numeric",
												value: age,
												onChange: (event) => setAge(event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-sm text-mist",
												children: "Height"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: FIELD,
												inputMode: "decimal",
												value: heightCm,
												"aria-label": "Height in centimeters",
												onChange: (event) => setHeightCm(event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-2 block text-sm text-mist",
												children: "Weight"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: FIELD,
												inputMode: "decimal",
												value: weightKg,
												"aria-label": "Weight in kilograms",
												onChange: (event) => setWeightKg(event.target.value)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "-mt-3 text-sm text-mist",
									children: "Height in cm, weight in kg."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
										className: "mb-2 text-sm text-mist",
										children: "Body formula"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-3 text-sm text-mist",
										children: "The equation uses one of two constants."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-3",
										children: ["female", "male"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": sex === id,
											onClick: () => setSex(id),
											className: cn("h-12 rounded-2xl border capitalize", sex === id ? "border-leaf bg-panel-2" : "border-line bg-panel"),
											children: id
										}, id))
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-3 text-sm text-mist",
									children: "A usual day"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2",
									children: ACTIVITY_ORDER.map((id) => {
										const copy = ACTIVITY_COPY[id];
										const selected = activity === id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": selected,
											onClick: () => setActivity(id),
											className: cn("rounded-2xl border px-4 py-3 text-left", selected ? "border-leaf bg-panel-2" : "border-line bg-panel"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: copy.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm text-mist",
												children: copy.hint
											})]
										}, id);
									})
								})] })
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-3 text-sm text-mist",
									children: "Way of eating"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-3",
									children: STYLE_ORDER.map((id) => {
										const copy = STYLE_COPY[id];
										const selected = style === id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": selected,
											onClick: () => setStyle(id),
											className: cn("rounded-2xl border px-3 py-3 text-left", id === "vegan" && "col-span-2", selected ? "border-leaf bg-panel-2" : "border-line bg-panel"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: copy.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-sm text-mist",
												children: copy.hint
											})]
										}, id);
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-3 text-sm text-mist",
									children: "Skip these"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: ALLERGEN_ORDER.filter((id) => !hiddenAllergens(style).includes(id)).map((id) => {
										const selected = exclusions.includes(id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": selected,
											onClick: () => toggleExclusion(id),
											className: cn("h-11 rounded-full border px-4 text-sm", selected ? "border-leaf bg-leaf text-ink-on-leaf" : "border-line bg-panel text-cream"),
											children: ALLERGEN_COPY[id]
										}, id);
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "mb-3 text-sm text-mist",
									children: "Plates in a day"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [[3, "Three plates"], [4, "Three, plus a snack"]].map(([count, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": meals === count,
										onClick: () => setMeals(count),
										className: cn("min-h-12 rounded-2xl border px-3 py-3 text-sm", meals === count ? "border-leaf bg-panel-2" : "border-line bg-panel"),
										children: label
									}, count))
								})] })
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-clay",
							role: "alert",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center gap-3",
							children: [
								step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "quiet",
									onClick: () => {
										setError(null);
										setStep((value) => value - 1);
									},
									children: "Back"
								}),
								step === 0 && onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "quiet",
									onClick: onCancel,
									children: "Cancel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "flex-1",
									children: step < 2 ? "Continue" : initial ? "Save rules" : "Build my week"
								})
							]
						})
					]
				}, step),
				step === 0 && !initial && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 border-t border-line pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "Or start from a sample kitchen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onDone(sample.profile),
							className: "rounded-2xl border border-line bg-panel px-4 py-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: sample.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-mist",
								children: sample.hint
							})]
						}, sample.label))
					})]
				})
			]
		})
	});
}
function dish(input) {
	const kcal = Math.round(input.protein * 4 + input.carbs * 4 + input.fat * 9);
	return {
		id: input.id,
		name: input.name,
		detail: input.detail,
		slots: input.slots,
		role: input.role,
		protein: input.protein,
		carbs: input.carbs,
		fat: input.fat,
		serving: input.serving,
		kind: input.kind,
		allergens: input.allergens ?? [],
		med: input.med ?? false,
		lowCarb: input.lowCarb ?? false,
		kcal
	};
}
var FOODS = [
	dish({
		id: "oats-berries",
		name: "Oat bowl with berries",
		detail: "Rolled oats, oat milk, mixed berries",
		slots: ["breakfast"],
		role: "main",
		protein: 13,
		carbs: 58,
		fat: 10,
		serving: "1 bowl",
		kind: "plant",
		allergens: ["gluten"],
		med: true
	}),
	dish({
		id: "yogurt-seeds",
		name: "Yogurt, honey, seeds",
		detail: "Greek yogurt, honey, pumpkin seeds",
		slots: ["breakfast"],
		role: "main",
		protein: 26,
		carbs: 30,
		fat: 10,
		serving: "1 bowl",
		kind: "dairy",
		allergens: ["dairy"],
		med: true
	}),
	dish({
		id: "veggie-omelette",
		name: "Vegetable omelette",
		detail: "Eggs, peppers, herbs, olive oil",
		slots: ["breakfast"],
		role: "main",
		protein: 24,
		carbs: 8,
		fat: 22,
		serving: "2 eggs",
		kind: "egg",
		allergens: ["eggs"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "trout-rye",
		name: "Smoked trout on rye",
		detail: "Trout, rye, cucumber, dill",
		slots: ["breakfast"],
		role: "main",
		protein: 30,
		carbs: 34,
		fat: 16,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish", "gluten"],
		med: true
	}),
	dish({
		id: "tofu-scramble",
		name: "Tofu scramble",
		detail: "Tofu, spinach, turmeric, olive oil",
		slots: ["breakfast"],
		role: "main",
		protein: 24,
		carbs: 11,
		fat: 16,
		serving: "1 pan",
		kind: "plant",
		allergens: ["soy"],
		lowCarb: true
	}),
	dish({
		id: "cottage-tomato",
		name: "Cottage cheese and tomato",
		detail: "Cottage cheese, tomato, black pepper",
		slots: ["breakfast"],
		role: "main",
		protein: 30,
		carbs: 10,
		fat: 10,
		serving: "1 bowl",
		kind: "dairy",
		allergens: ["dairy"],
		lowCarb: true
	}),
	dish({
		id: "peanut-toast",
		name: "Peanut toast and banana",
		detail: "Bread, peanut butter, banana",
		slots: ["breakfast"],
		role: "main",
		protein: 14,
		carbs: 52,
		fat: 18,
		serving: "2 slices",
		kind: "plant",
		allergens: ["nuts", "gluten"]
	}),
	dish({
		id: "chia-pudding",
		name: "Chia pudding",
		detail: "Chia, coconut milk, berries",
		slots: ["breakfast"],
		role: "main",
		protein: 9,
		carbs: 28,
		fat: 18,
		serving: "1 jar",
		kind: "plant",
		med: true
	}),
	dish({
		id: "turkey-wrap",
		name: "Turkey breakfast wrap",
		detail: "Turkey, egg white, tortilla",
		slots: ["breakfast"],
		role: "main",
		protein: 38,
		carbs: 26,
		fat: 12,
		serving: "1 wrap",
		kind: "poultry",
		allergens: ["gluten", "eggs"]
	}),
	dish({
		id: "avocado-cakes",
		name: "Avocado on rice cakes",
		detail: "Avocado, rice cakes, lemon",
		slots: ["breakfast"],
		role: "main",
		protein: 6,
		carbs: 34,
		fat: 20,
		serving: "2 cakes",
		kind: "plant",
		med: true
	}),
	dish({
		id: "skyr-berries",
		name: "Skyr and berries",
		detail: "Plain skyr, a handful of berries",
		slots: ["breakfast"],
		role: "main",
		protein: 32,
		carbs: 22,
		fat: 2,
		serving: "1 bowl",
		kind: "dairy",
		allergens: ["dairy"]
	}),
	dish({
		id: "eggs-spinach",
		name: "Eggs and spinach",
		detail: "Fried eggs, spinach, olive oil",
		slots: ["breakfast"],
		role: "main",
		protein: 20,
		carbs: 4,
		fat: 22,
		serving: "2 eggs",
		kind: "egg",
		allergens: ["eggs"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "buckwheat-apple",
		name: "Buckwheat and apple",
		detail: "Buckwheat, apple, cinnamon",
		slots: ["breakfast"],
		role: "main",
		protein: 11,
		carbs: 62,
		fat: 8,
		serving: "1 bowl",
		kind: "plant"
	}),
	dish({
		id: "shakshuka",
		name: "Skillet eggs in tomato",
		detail: "Eggs, tomato, pepper, olive oil",
		slots: ["breakfast"],
		role: "main",
		protein: 18,
		carbs: 14,
		fat: 22,
		serving: "1 skillet",
		kind: "egg",
		allergens: ["eggs"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "chickpea-pancake",
		name: "Chickpea pancake",
		detail: "Gram flour, herbs, olive oil",
		slots: ["breakfast"],
		role: "main",
		protein: 16,
		carbs: 32,
		fat: 14,
		serving: "1 pancake",
		kind: "plant",
		med: true
	}),
	dish({
		id: "polenta-yogurt",
		name: "Polenta with yogurt",
		detail: "Mămăligă, yogurt, a thread of honey",
		slots: ["breakfast"],
		role: "main",
		protein: 14,
		carbs: 52,
		fat: 10,
		serving: "1 bowl",
		kind: "dairy",
		allergens: ["dairy"]
	}),
	dish({
		id: "chicken-quinoa",
		name: "Chicken and quinoa",
		detail: "Grilled chicken, quinoa, leaves",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 44,
		carbs: 40,
		fat: 16,
		serving: "1 plate",
		kind: "poultry",
		med: true
	}),
	dish({
		id: "lentil-soup",
		name: "Lentil soup and bread",
		detail: "Lentils, vegetables, one slice of bread",
		slots: ["lunch"],
		role: "main",
		protein: 22,
		carbs: 64,
		fat: 10,
		serving: "1 bowl",
		kind: "plant",
		allergens: ["gluten"],
		med: true
	}),
	dish({
		id: "salmon-beets",
		name: "Salmon and beets",
		detail: "Baked salmon, beets, olive oil",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 38,
		carbs: 18,
		fat: 30,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "chickpea-feta",
		name: "Chickpea salad with feta",
		detail: "Chickpeas, feta, cucumber, olive oil",
		slots: ["lunch"],
		role: "main",
		protein: 20,
		carbs: 38,
		fat: 26,
		serving: "1 bowl",
		kind: "dairy",
		allergens: ["dairy"],
		med: true
	}),
	dish({
		id: "turkey-zoodles",
		name: "Turkey and zucchini",
		detail: "Turkey mince, zucchini, tomato",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 42,
		carbs: 12,
		fat: 24,
		serving: "1 plate",
		kind: "poultry",
		lowCarb: true
	}),
	dish({
		id: "tofu-bowl",
		name: "Tofu grain bowl",
		detail: "Tofu, rice, cabbage, sesame",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 26,
		carbs: 58,
		fat: 16,
		serving: "1 bowl",
		kind: "plant",
		allergens: ["soy"]
	}),
	dish({
		id: "steak-beans",
		name: "Steak and green beans",
		detail: "Beef steak, beans, mustard",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 48,
		carbs: 10,
		fat: 32,
		serving: "1 plate",
		kind: "meat",
		lowCarb: true
	}),
	dish({
		id: "sardine-toast",
		name: "Sardines and tomato toast",
		detail: "Sardines, tomato, whole grain",
		slots: ["lunch"],
		role: "main",
		protein: 32,
		carbs: 36,
		fat: 20,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish", "gluten"],
		med: true
	}),
	dish({
		id: "halloumi-pita",
		name: "Halloumi and salad",
		detail: "Halloumi, pita, tomato, olives",
		slots: ["lunch"],
		role: "main",
		protein: 26,
		carbs: 40,
		fat: 28,
		serving: "1 plate",
		kind: "dairy",
		allergens: ["dairy", "gluten"],
		med: true
	}),
	dish({
		id: "bean-kale",
		name: "White beans and kale",
		detail: "Beans, kale, garlic, olive oil",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 22,
		carbs: 52,
		fat: 14,
		serving: "1 bowl",
		kind: "plant",
		med: true
	}),
	dish({
		id: "shrimp-rice",
		name: "Shrimp and rice",
		detail: "Shrimp, rice, cucumber, lemon",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 38,
		carbs: 48,
		fat: 10,
		serving: "1 plate",
		kind: "fish",
		allergens: ["shellfish"]
	}),
	dish({
		id: "ciorba",
		name: "Vegetable sour soup",
		detail: "Ciorbă de legume with a wedge of polenta",
		slots: ["lunch"],
		role: "main",
		protein: 12,
		carbs: 68,
		fat: 12,
		serving: "1 bowl",
		kind: "plant"
	}),
	dish({
		id: "chicken-soup",
		name: "Chicken soup",
		detail: "Chicken, noodles, a spoon of sour cream, dill",
		slots: ["lunch"],
		role: "main",
		protein: 30,
		carbs: 40,
		fat: 18,
		serving: "1 bowl",
		kind: "poultry",
		allergens: ["gluten", "dairy"]
	}),
	dish({
		id: "tuna-salad",
		name: "Tuna salad plate",
		detail: "Tuna, leaves, olive oil, no bread",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 40,
		carbs: 6,
		fat: 24,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "paprika-chicken",
		name: "Chicken paprikash",
		detail: "Chicken, paprika, a spoon of cream",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 42,
		carbs: 14,
		fat: 28,
		serving: "1 plate",
		kind: "poultry",
		allergens: ["dairy"],
		lowCarb: true
	}),
	dish({
		id: "trout-salad",
		name: "Trout and leaf salad",
		detail: "Grilled trout, leaves, lemon",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 40,
		carbs: 6,
		fat: 26,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "cod-potato",
		name: "Cod and potatoes",
		detail: "Baked cod, potatoes, dill",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 40,
		carbs: 44,
		fat: 14,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true
	}),
	dish({
		id: "roast-chicken",
		name: "Roast chicken and carrots",
		detail: "Chicken, carrots, thyme",
		slots: ["dinner"],
		role: "main",
		protein: 46,
		carbs: 22,
		fat: 26,
		serving: "1 plate",
		kind: "poultry",
		med: true
	}),
	dish({
		id: "eggplant-polenta",
		name: "Eggplant and polenta",
		detail: "Eggplant stew over mămăligă",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 12,
		carbs: 66,
		fat: 16,
		serving: "1 plate",
		kind: "plant"
	}),
	dish({
		id: "pork-cabbage",
		name: "Pork and cabbage",
		detail: "Pork tenderloin, cabbage, apple",
		slots: ["dinner"],
		role: "main",
		protein: 44,
		carbs: 18,
		fat: 28,
		serving: "1 plate",
		kind: "meat",
		lowCarb: true
	}),
	dish({
		id: "tofu-stir",
		name: "Tofu stir-fry",
		detail: "Tofu, vegetables, brown rice",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 28,
		carbs: 60,
		fat: 16,
		serving: "1 plate",
		kind: "plant",
		allergens: ["soy"]
	}),
	dish({
		id: "sea-bream",
		name: "Sea bream and fennel",
		detail: "Grilled bream, fennel, olive oil",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 42,
		carbs: 8,
		fat: 30,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "lentil-pasta",
		name: "Lentil ragù and pasta",
		detail: "Lentils, tomato, spaghetti",
		slots: ["dinner"],
		role: "main",
		protein: 24,
		carbs: 78,
		fat: 12,
		serving: "1 plate",
		kind: "plant",
		allergens: ["gluten"],
		med: true
	}),
	dish({
		id: "turkey-chili",
		name: "Turkey chili",
		detail: "Turkey, peppers, a few beans",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 46,
		carbs: 28,
		fat: 16,
		serving: "1 bowl",
		kind: "poultry"
	}),
	dish({
		id: "stuffed-peppers",
		name: "Stuffed peppers",
		detail: "Beef, rice, peppers",
		slots: ["dinner"],
		role: "main",
		protein: 34,
		carbs: 48,
		fat: 22,
		serving: "1 plate",
		kind: "meat"
	}),
	dish({
		id: "mushroom-cauli",
		name: "Mushrooms and cauliflower",
		detail: "Roasted mushrooms, cauliflower, olive oil",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 12,
		carbs: 14,
		fat: 26,
		serving: "1 plate",
		kind: "plant",
		med: true,
		lowCarb: true
	}),
	dish({
		id: "salmon-asparagus",
		name: "Salmon and asparagus",
		detail: "Salmon, asparagus, olive oil",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 40,
		carbs: 8,
		fat: 36,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "paneer-spinach",
		name: "Paneer and spinach",
		detail: "Paneer, spinach, a small spoon of rice",
		slots: ["dinner"],
		role: "main",
		protein: 28,
		carbs: 34,
		fat: 28,
		serving: "1 plate",
		kind: "dairy",
		allergens: ["dairy"]
	}),
	dish({
		id: "chickpea-curry",
		name: "Chickpea curry",
		detail: "Chickpeas, tomato, rice",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 18,
		carbs: 74,
		fat: 16,
		serving: "1 plate",
		kind: "plant"
	}),
	dish({
		id: "mackerel-beet",
		name: "Mackerel and beets",
		detail: "Grilled mackerel, beets, dill",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 36,
		carbs: 16,
		fat: 32,
		serving: "1 plate",
		kind: "fish",
		allergens: ["fish"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "veg-peppers",
		name: "Peppers stuffed with rice",
		detail: "Rice, peppers, herbs, olive oil",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 12,
		carbs: 74,
		fat: 14,
		serving: "1 plate",
		kind: "plant"
	}),
	dish({
		id: "bean-stew",
		name: "Bean stew",
		detail: "Iahnie de fasole, onion, paprika",
		slots: ["lunch", "dinner"],
		role: "main",
		protein: 22,
		carbs: 58,
		fat: 14,
		serving: "1 bowl",
		kind: "plant"
	}),
	dish({
		id: "berries",
		name: "Mixed berries",
		detail: "A cup of berries",
		slots: ["breakfast", "snack"],
		role: "side",
		protein: 1,
		carbs: 16,
		fat: 0,
		serving: "1 cup",
		kind: "plant",
		med: true
	}),
	dish({
		id: "boiled-eggs",
		name: "Boiled eggs",
		detail: "Two eggs, salt",
		slots: ["breakfast", "snack"],
		role: "side",
		protein: 13,
		carbs: 1,
		fat: 11,
		serving: "2 eggs",
		kind: "egg",
		allergens: ["eggs"],
		lowCarb: true
	}),
	dish({
		id: "walnuts",
		name: "Walnuts",
		detail: "A small handful",
		slots: ["breakfast", "snack"],
		role: "side",
		protein: 4,
		carbs: 4,
		fat: 18,
		serving: "30 g",
		kind: "plant",
		allergens: ["nuts"],
		med: true,
		lowCarb: true
	}),
	dish({
		id: "apple-almond",
		name: "Apple and almond butter",
		detail: "Apple with almond butter",
		slots: ["snack"],
		role: "side",
		protein: 5,
		carbs: 24,
		fat: 12,
		serving: "1 apple",
		kind: "plant",
		allergens: ["nuts"],
		med: true
	}),
	dish({
		id: "skyr-cup",
		name: "Skyr cup",
		detail: "Plain skyr",
		slots: ["breakfast", "snack"],
		role: "side",
		protein: 22,
		carbs: 6,
		fat: 1,
		serving: "1 cup",
		kind: "dairy",
		allergens: ["dairy"],
		lowCarb: true
	}),
	dish({
		id: "hummus-carrots",
		name: "Hummus and carrots",
		detail: "Hummus, carrot sticks",
		slots: ["lunch", "snack"],
		role: "side",
		protein: 6,
		carbs: 18,
		fat: 10,
		serving: "1 cup",
		kind: "plant",
		med: true
	}),
	dish({
		id: "cottage-cakes",
		name: "Cottage cheese on rice cakes",
		detail: "Cottage cheese, rice cakes",
		slots: ["breakfast", "snack"],
		role: "side",
		protein: 18,
		carbs: 18,
		fat: 6,
		serving: "2 cakes",
		kind: "dairy",
		allergens: ["dairy"]
	}),
	dish({
		id: "edamame",
		name: "Edamame",
		detail: "Steamed edamame, salt",
		slots: ["snack"],
		role: "side",
		protein: 16,
		carbs: 10,
		fat: 6,
		serving: "1 bowl",
		kind: "plant",
		allergens: ["soy"],
		lowCarb: true
	}),
	dish({
		id: "olives",
		name: "Olives and cucumber",
		detail: "Olives, cucumber",
		slots: ["lunch", "snack"],
		role: "side",
		protein: 1,
		carbs: 4,
		fat: 12,
		serving: "1 cup",
		kind: "plant",
		med: true,
		lowCarb: true
	}),
	dish({
		id: "shake",
		name: "Milk protein shake",
		detail: "Milk and protein powder",
		slots: ["snack"],
		role: "side",
		protein: 30,
		carbs: 8,
		fat: 3,
		serving: "1 glass",
		kind: "dairy",
		allergens: ["dairy"],
		lowCarb: true
	}),
	dish({
		id: "jerky",
		name: "Beef jerky",
		detail: "Lean dried beef",
		slots: ["snack"],
		role: "side",
		protein: 24,
		carbs: 6,
		fat: 3,
		serving: "1 pack",
		kind: "meat",
		lowCarb: true
	}),
	dish({
		id: "kefir",
		name: "Kefir",
		detail: "A glass of kefir",
		slots: ["breakfast", "snack"],
		role: "side",
		protein: 8,
		carbs: 12,
		fat: 6,
		serving: "250 ml",
		kind: "dairy",
		allergens: ["dairy"],
		lowCarb: true
	}),
	dish({
		id: "apple",
		name: "Apple",
		detail: "One apple",
		slots: ["snack"],
		role: "side",
		protein: 0,
		carbs: 22,
		fat: 0,
		serving: "1 apple",
		kind: "plant",
		med: true
	}),
	dish({
		id: "orange",
		name: "Orange",
		detail: "One orange",
		slots: ["snack"],
		role: "side",
		protein: 1,
		carbs: 16,
		fat: 0,
		serving: "1 fruit",
		kind: "plant",
		med: true
	})
];
var ACTIVITY_FACTOR = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	athlete: 1.9
};
var GROUP = {
	plant: "Plants & pantry",
	egg: "Eggs & dairy",
	dairy: "Eggs & dairy",
	fish: "Fish",
	poultry: "Poultry & meat",
	meat: "Poultry & meat"
};
var GROUP_ORDER = [
	"Plants & pantry",
	"Eggs & dairy",
	"Fish",
	"Poultry & meat"
];
function formatKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function parseKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
}
function todayKey(now = /* @__PURE__ */ new Date()) {
	return formatKey(now);
}
function shiftDate(key, days) {
	return formatKey(addDays(parseKey(key), days));
}
function weekDates(anchorKey) {
	const start = startOfWeek(parseKey(anchorKey), { weekStartsOn: 1 });
	return Array.from({ length: 7 }, (_, i) => formatKey(addDays(start, i)));
}
function weekLabel(anchorKey) {
	const days = weekDates(anchorKey);
	const a = parseKey(days[0] ?? anchorKey);
	const b = parseKey(days[6] ?? anchorKey);
	if (a.getMonth() === b.getMonth()) return `${format(a, "d")}–${format(b, "d MMM")}`;
	return `${format(a, "d MMM")} – ${format(b, "d MMM")}`;
}
function greeting(now = /* @__PURE__ */ new Date()) {
	const h = now.getHours();
	if (h < 11) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function firstName(name) {
	return name.trim().split(/\s+/)[0] || name;
}
function formatAmount(n) {
	const r = Math.round(n * 10) / 10;
	return Number.isInteger(r) ? String(r) : r.toFixed(1);
}
function formatScale(scale) {
	if (Math.abs(scale - 1) < .05) return null;
	return `${formatAmount(scale)}×`;
}
function hashString(input) {
	let h = 2166136261;
	for (let i = 0; i < input.length; i++) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function targets(profile) {
	const sexConst = profile.sex === "male" ? 5 : -161;
	const bmrRaw = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + sexConst;
	const tdeeRaw = bmrRaw * ACTIVITY_FACTOR[profile.activity];
	let kcal = tdeeRaw;
	if (profile.goal === "lose") kcal = Math.max(bmrRaw, tdeeRaw * .82);
	if (profile.goal === "gain") kcal = tdeeRaw * 1.12;
	kcal = Math.round(kcal / 10) * 10;
	const perKg = profile.style === "high-protein" ? 2 : profile.goal === "gain" ? 1.6 : 1.8;
	const protein = Math.round(profile.weightKg * perKg);
	const minFat = Math.round(profile.weightKg * .7);
	const proteinKcal = protein * 4;
	let fat;
	let carbs;
	if (profile.style === "low-carb") {
		const carbCap = Math.min(100, Math.round(kcal * .22 / 4));
		fat = Math.max(minFat, Math.round((kcal - proteinKcal - carbCap * 4) / 9));
		carbs = Math.max(0, Math.round((kcal - proteinKcal - fat * 9) / 4));
	} else {
		const fatRatio = profile.style === "high-protein" ? .28 : .3;
		fat = Math.max(minFat, Math.round(kcal * fatRatio / 9));
		carbs = Math.round((kcal - proteinKcal - fat * 9) / 4);
		if (carbs < 0) {
			fat = Math.max(minFat, Math.round((kcal - proteinKcal) / 9));
			carbs = Math.max(0, Math.round((kcal - proteinKcal - fat * 9) / 4));
		}
	}
	const waterGlasses = Math.min(12, Math.max(6, Math.round(profile.weightKg * 35 / 250)));
	return {
		bmr: Math.round(bmrRaw),
		tdee: Math.round(tdeeRaw),
		kcal,
		protein,
		carbs,
		fat,
		waterGlasses
	};
}
function slotsFor(meals) {
	return meals === 4 ? [
		"breakfast",
		"lunch",
		"dinner",
		"snack"
	] : [
		"breakfast",
		"lunch",
		"dinner"
	];
}
function share(slot, meals) {
	if (meals === 4) {
		if (slot === "breakfast") return .27;
		if (slot === "lunch") return .36;
		if (slot === "dinner") return .27;
		return .1;
	}
	if (slot === "breakfast") return .3;
	if (slot === "lunch") return .4;
	return .3;
}
function kindOk(food, style) {
	if (style === "vegan") return food.kind === "plant";
	if (style === "vegetarian") return food.kind === "plant" || food.kind === "egg" || food.kind === "dairy";
	if (style === "pescatarian") return food.kind !== "poultry" && food.kind !== "meat";
	if (style === "mediterranean" && food.kind === "meat") return false;
	return true;
}
function allergenOk(food, exclusions) {
	return !food.allergens.some((a) => exclusions.includes(a));
}
function candidates(slot, profile) {
	const base = FOODS.filter((food) => food.slots.includes(slot) && allergenOk(food, profile.exclusions) && kindOk(food, profile.style));
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
function combos(slot, foods, target) {
	const mains = foods.filter((food) => food.role === "main");
	const sides = foods.filter((food) => food.role === "side");
	const out = [];
	if (slot === "snack") {
		for (const side of sides) out.push([side]);
		for (let i = 0; i < sides.length; i++) for (let j = i + 1; j < sides.length; j++) {
			const a = sides[i];
			const b = sides[j];
			if (!a || !b) continue;
			if (a.kcal + b.kcal <= target * 1.35) out.push([a, b]);
		}
	} else for (const main of mains) {
		out.push([main]);
		if (main.kcal >= target) continue;
		for (const side of sides) out.push([main, side]);
	}
	if (out.length === 0) for (const food of foods) out.push([food]);
	return out;
}
function sumBase(list) {
	return list.reduce((total, food) => ({
		kcal: total.kcal + food.kcal,
		protein: total.protein + food.protein,
		carbs: total.carbs + food.carbs,
		fat: total.fat + food.fat
	}), {
		kcal: 0,
		protein: 0,
		carbs: 0,
		fat: 0
	});
}
function qualityScore(list, target, profile, dayUsed) {
	const base = sumBase(list);
	const raw = base.kcal > 0 ? target / base.kcal : 1;
	const clamped = Math.min(1.8, Math.max(.75, raw));
	let score = -Math.abs(Math.log(raw)) * 120;
	score -= Math.abs(base.kcal * clamped - target) * .2;
	if (list.some((food) => dayUsed.has(food.id))) score -= 80;
	if (profile.style === "high-protein") score += base.protein * 1.5;
	if (profile.style === "low-carb") score -= base.carbs * 1.2;
	if (profile.style === "mediterranean") score += list.filter((food) => food.med).length * 36;
	return score;
}
function applyScale(list, target) {
	const base = sumBase(list);
	let scale = base.kcal > 0 ? target / base.kcal : 1;
	scale = Math.min(1.8, Math.max(.75, scale));
	scale = Math.round(scale * 10) / 10;
	return {
		servings: list.map((food) => ({
			food,
			scale
		})),
		kcal: Math.round(base.kcal * scale),
		protein: Math.round(base.protein * scale),
		carbs: Math.round(base.carbs * scale),
		fat: Math.round(base.fat * scale)
	};
}
function pickMeal(slot, profile, date, target, swap, seed, dayUsed) {
	const lists = combos(slot, candidates(slot, profile), target);
	const seen = /* @__PURE__ */ new Set();
	const ranked = [];
	for (const list of lists) {
		const key = list.map((food) => food.id).sort().join("+");
		if (seen.has(key)) continue;
		seen.add(key);
		const leadFood = list.find((food) => food.role === "main") ?? [...list].sort((a, b) => b.kcal - a.kcal)[0];
		ranked.push({
			list,
			key,
			lead: leadFood?.id ?? key,
			score: qualityScore(list, target, profile, dayUsed)
		});
	}
	ranked.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
	const groups = /* @__PURE__ */ new Map();
	for (const row of ranked) {
		const bucket = groups.get(row.lead);
		if (bucket) bucket.push(row);
		else groups.set(row.lead, [row]);
	}
	const representatives = [];
	for (const [lead, bucket] of groups) {
		const top = bucket[0];
		if (!top) continue;
		const close = bucket.filter((row) => top.score - row.score <= 32);
		const pool = close.length > 0 ? close : [top];
		const pick = pool[hashString(`${seed}|${date}|${slot}|${lead}`) % pool.length];
		if (pick) representatives.push(pick);
	}
	representatives.sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
	const best = representatives[0]?.score ?? 0;
	let band = representatives.filter((row) => best - row.score <= 36);
	if (band.length < 3) band = representatives.slice(0, 6);
	band = band.slice(0, 8);
	band.sort((a, b) => {
		return hashString(`${seed}|${date}|${slot}|${a.lead}`) - hashString(`${seed}|${date}|${slot}|${b.lead}`) || a.key.localeCompare(b.key);
	});
	const chosen = band[Math.abs(swap) % Math.max(1, band.length)];
	if (!chosen) return {
		slot,
		servings: [],
		kcal: 0,
		protein: 0,
		carbs: 0,
		fat: 0,
		optionCount: 0
	};
	for (const food of chosen.list) dayUsed.add(food.id);
	return {
		slot,
		optionCount: band.length,
		...applyScale(chosen.list, target)
	};
}
function emptyMacros() {
	return {
		kcal: 0,
		protein: 0,
		carbs: 0,
		fat: 0
	};
}
function addMacros(a, b) {
	return {
		kcal: a.kcal + b.kcal,
		protein: a.protein + b.protein,
		carbs: a.carbs + b.carbs,
		fat: a.fat + b.fat
	};
}
function buildWeek(profile, anchorKey, swaps, seed) {
	const goal = targets(profile);
	return weekDates(anchorKey).map((date) => {
		const dayUsed = /* @__PURE__ */ new Set();
		const daySwaps = swaps[date] ?? {};
		const meals = slotsFor(profile.meals).map((slot) => pickMeal(slot, profile, date, goal.kcal * share(slot, profile.meals), daySwaps[slot] ?? 0, seed, dayUsed));
		return {
			date,
			meals,
			totals: meals.reduce((sum, meal) => addMacros(sum, meal), emptyMacros())
		};
	});
}
function loggedTotals(day, eaten) {
	return day.meals.filter((meal) => eaten?.[meal.slot]).reduce((sum, meal) => addMacros(sum, meal), emptyMacros());
}
function plateFit(day, goal) {
	const cal = 1 - Math.min(1, Math.abs(day.totals.kcal - goal.kcal) / Math.max(1, goal.kcal));
	const protein = Math.min(1, day.totals.protein / Math.max(1, goal.protein));
	const carbs = 1 - Math.min(1, Math.abs(day.totals.carbs - goal.carbs) / Math.max(40, goal.carbs));
	return Math.round((.5 * cal + .3 * protein + .2 * carbs) * 100);
}
var NOTES = {
	lose: [
		"The deficit is modest on purpose. Skipping a plate usually makes the next one louder.",
		"If the afternoon drags, eat the snack. Waiting for a bigger dinner rarely helps.",
		"Oil is already counted. An extra unmeasured pour is the usual leak.",
		"Hunger that arrives before a planned plate is a cue to eat, not a test of will.",
		"Weigh yourself, then look at the week — one morning is noise."
	],
	maintain: [
		"Maintenance still wants a real plate. Grazing around it is what drifts the number.",
		"Salt the water, then stop. These plates assume a cook, not a packet.",
		"If lunch moves, move the snack with it. The day still adds up.",
		"Repeating a plate you liked is allowed. Swap only when you are bored.",
		"A walk after dinner is not in the math. It still belongs to the day."
	],
	gain: [
		"The surplus is a second helping of the plate, not a separate dessert habit.",
		"If a plate looks large, that is the point this week. Split it if you need to, and finish it.",
		"Protein is there so the extra food has somewhere to go.",
		"Train, then eat the plate you already planned. Don't invent a third meal in the kitchen.",
		"Sleep is the other half of building. The menu cannot do that part."
	]
};
function kitchenNote(date, goal) {
	const lines = NOTES[goal];
	return lines[hashString(`${date}|${goal}`) % lines.length] ?? lines[0] ?? "";
}
function shopList(week) {
	const map = /* @__PURE__ */ new Map();
	for (const day of week) for (const meal of day.meals) for (const serving of meal.servings) {
		const current = map.get(serving.food.id);
		if (current) current.amount += serving.scale;
		else map.set(serving.food.id, {
			id: serving.food.id,
			name: serving.food.name,
			serving: serving.food.serving,
			amount: serving.scale,
			group: GROUP[serving.food.kind]
		});
	}
	return [...map.values()].sort((a, b) => {
		return GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.name.localeCompare(b.name);
	});
}
function ShopView({ date, items, checked, onToggle }) {
	const done = items.filter((item) => checked(item.id)).length;
	let lastGroup = "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: weekLabel(date)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl leading-tight",
				children: "Shopping"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-mist",
				children: "From the plates in this week. Amounts follow the servings on the plan."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm tabular-nums text-mist",
				children: [
					done,
					" of ",
					items.length,
					" packed"
				]
			})
		] }), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl border border-line bg-panel p-4 text-mist",
			children: "No plates yet. Ease a restriction and the list will fill."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: items.map((item) => {
				const on = checked(item.id);
				const heading = item.group !== lastGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: cn("mb-2 text-sm text-mist", lastGroup !== "" && "mt-4"),
					children: item.group
				}) : null;
				lastGroup = item.group;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [heading, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => onToggle(item.id),
					className: "flex w-full items-center gap-3 rounded-2xl border border-line bg-panel px-3 py-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-11 shrink-0 items-center justify-center rounded-full border", on ? "border-leaf bg-leaf text-ink-on-leaf" : "border-line"),
						"aria-hidden": "true",
						children: on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("block break-words", on && "text-mist line-through"),
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-sm tabular-nums text-mist",
							children: [
								formatAmount(item.amount),
								" × ",
								item.serving
							]
						})]
					})]
				})] }, item.id);
			})
		})]
	});
}
function Ring({ logged, target }) {
	const r = 36;
	const c = 2 * Math.PI * r;
	const over = logged > target;
	const pct = target > 0 ? Math.max(0, Math.min(1, logged / target)) : 0;
	const left = Math.max(0, target - logged);
	const shown = over ? logged - target : left;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-32 shrink-0",
		role: "img",
		"aria-label": over ? `${logged} kilocalories logged, ${shown} over the ${target} target` : `${left} kilocalories left of ${target}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "size-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r,
				fill: "none",
				strokeWidth: "8",
				className: "stroke-panel-2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r,
				fill: "none",
				strokeWidth: "8",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - pct),
				transform: "rotate(-90 50 50)",
				className: cn("motion-safe:transition-[stroke-dashoffset] motion-safe:duration-300", over ? "stroke-clay" : "stroke-leaf")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-display text-2xl tabular-nums", over && "text-clay"),
				children: shown
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-mist",
				children: over ? "over" : "left"
			})]
		})]
	});
}
function MacroBar({ label, value, goal, tone }) {
	const pct = Math.max(0, Math.min(100, goal > 0 ? value / goal * 100 : 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-baseline justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-mist",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular-nums",
			children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-mist",
				children: [
					" / ",
					goal,
					" g"
				]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-panel-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full", tone),
			style: { width: `${pct}%` }
		})
	})] });
}
function TodayView({ profile, date, setDate, day, targets, eaten, swapIndex, water, onToggle, onSwap, onWater }) {
	const logged = loggedTotals(day, eaten);
	const loggedMeals = day.meals.filter((meal) => eaten?.[meal.slot]).length;
	const fit = plateFit(day, targets);
	const isToday = date === todayKey();
	const when = parseKey(date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: format(when, "EEEE d MMMM")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-tight",
					children: isToday ? `${greeting()}, ${firstName(profile.name)}.` : format(when, "EEEE")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "quiet",
							"aria-label": "Previous day",
							onClick: () => setDate(shiftDate(date, -1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						!isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							size: "sm",
							onClick: () => setDate(todayKey()),
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "quiet",
							"aria-label": "Next day",
							onClick: () => setDate(shiftDate(date, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-2xl border border-line bg-panel p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
							logged: logged.kcal,
							target: targets.kcal
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-mist",
									children: "Logged"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-3xl tabular-nums leading-none",
									children: [logged.kcal, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-lg text-mist",
										children: [" / ", targets.kcal]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-mist",
									children: [
										"Plan ",
										day.totals.kcal,
										" kcal · ",
										fit,
										"% plate fit"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-mist",
									children: [
										loggedMeals,
										" of ",
										day.meals.length,
										" plates logged"
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroBar, {
								label: "Protein",
								value: logged.protein,
								goal: targets.protein,
								tone: "bg-leaf"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroBar, {
								label: "Carbs",
								value: logged.carbs,
								goal: targets.carbs,
								tone: "bg-cream"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroBar, {
								label: "Fat",
								value: logged.fat,
								goal: targets.fat,
								tone: "bg-clay"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-sm text-mist",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
									className: "size-4 text-leaf",
									"aria-hidden": "true"
								}), "Water"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm tabular-nums text-mist",
								children: [
									water * 250,
									" / ",
									targets.waterGlasses * 250,
									" ml"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: Array.from({ length: targets.waterGlasses }, (_, index) => {
								const filled = index < water;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Set water to ${index + 1} glass${index === 0 ? "" : "es"}`,
									"aria-pressed": filled,
									onClick: () => onWater(water === index + 1 ? index : index + 1),
									className: cn("size-11 rounded-full border", filled ? "border-leaf bg-leaf" : "border-line bg-ink")
								}, index);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3 lg:col-span-3",
				children: [day.meals.map((meal) => {
					const loggedPlate = Boolean(eaten?.[meal.slot]);
					const swap = swapIndex(meal.slot);
					const option = meal.optionCount > 0 ? swap % meal.optionCount + 1 : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: cn("rounded-2xl border bg-panel p-4", loggedPlate ? "border-leaf" : "border-line"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: SLOT_COPY[meal.slot]
								}), meal.optionCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm tabular-nums text-mist",
									children: [
										"Plate ",
										option,
										" of ",
										meal.optionCount
									]
								})] }), meal.optionCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "quiet",
									"aria-label": `Another ${SLOT_COPY[meal.slot].toLowerCase()}`,
									onClick: () => onSwap(meal.slot),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-5" })
								})]
							}),
							meal.servings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-mist",
								children: "Nothing in the kitchen fits this slot. Ease a restriction under Your numbers."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-col gap-3",
								children: meal.servings.map((serving) => {
									const scale = formatScale(serving.scale);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: serving.food.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-mist",
										children: [
											serving.food.detail,
											" · ",
											[scale, serving.food.serving].filter(Boolean).join(" · ")
										]
									})] }, serving.food.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm tabular-nums text-mist",
								children: [
									meal.kcal,
									" kcal · ",
									meal.protein,
									" g protein · ",
									meal.carbs,
									" g carb · ",
									meal.fat,
									" g fat"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: loggedPlate ? "primary" : "quiet",
								className: "mt-4 w-full",
								"aria-pressed": loggedPlate,
								onClick: () => onToggle(meal.slot),
								disabled: meal.servings.length === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-4",
									"aria-hidden": "true"
								}), loggedPlate ? "Logged" : "Log plate"]
							})
						]
					}, meal.slot);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-l-2 border-leaf px-4 py-1 text-sm text-mist",
					children: kitchenNote(date, profile.goal)
				})]
			})
		]
	});
}
function WeekView({ date, week, targets, eaten, onOpen, onShuffle }) {
	const [arm, setArm] = (0, import_react.useState)(false);
	const [noted, setNoted] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: weekLabel(date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight",
						children: "This week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-mist",
						children: "Seven days from the same rules. Open a day to log it, or shuffle if the table feels stale."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "quiet",
					onClick: () => {
						if (!arm) {
							setArm(true);
							return;
						}
						onShuffle();
						setArm(false);
						setNoted(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: "size-4",
						"aria-hidden": "true"
					}), arm ? "Replace this week’s plates?" : "Shuffle plates"]
				})]
			}),
			noted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "New plates. Earlier swaps for this week were cleared."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: week.map((day) => {
					const when = parseKey(day.date);
					const active = day.date === date;
					const logged = day.meals.filter((meal) => eaten[day.date]?.[meal.slot]).length;
					const fit = plateFit(day, targets);
					const width = Math.max(4, Math.min(100, day.totals.kcal / Math.max(1, targets.kcal) * 100));
					const over = day.totals.kcal > targets.kcal * 1.05;
					const line = day.meals.map((meal) => meal.servings.map((serving) => serving.food.name).join(" + ")).filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onOpen(day.date),
						className: cn("rounded-2xl border p-4 text-left", active ? "border-leaf bg-panel-2" : "border-line bg-panel"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-2xl",
									children: format(when, "EEE d")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-sm text-mist",
									children: [day.totals.kcal, " kcal"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-mist",
								children: line
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 overflow-hidden rounded-full bg-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full", over ? "bg-clay" : "bg-leaf"),
									style: { width: `${width}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm tabular-nums text-mist",
								children: [
									logged,
									" of ",
									day.meals.length,
									" logged · ",
									fit,
									"% fit"
								]
							})
						]
					}, day.date);
				})
			})
		]
	});
}
function Stat({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-panel p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular-nums leading-none",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mist",
				children: unit
			})
		]
	});
}
function formatKg(n) {
	return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
function YouView({ profile, targets, onWeight, onEdit, onClear }) {
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const delta = targets.tdee - targets.kcal;
	const skipped = profile.exclusions.map((id) => ALLERGEN_COPY[id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-3xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: "Kept on this device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-tight",
					children: profile.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-mist",
					children: [
						GOAL_COPY[profile.goal].label,
						" · ",
						STYLE_COPY[profile.style].label,
						" ·",
						" ",
						ACTIVITY_COPY[profile.activity].label,
						profile.meals === 4 ? " · snack included" : " · three plates",
						skipped.length > 0 ? ` · skipping ${skipped.join(", ").toLowerCase()}` : ""
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: "Weight"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-4xl tabular-nums",
					children: [formatKg(profile.weightKg), " kg"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "quiet",
						"aria-label": "Decrease weight by half a kilogram",
						onClick: () => onWeight(Math.max(40, Math.round((profile.weightKg - .5) * 10) / 10)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "quiet",
						"aria-label": "Increase weight by half a kilogram",
						onClick: () => onWeight(Math.min(220, Math.round((profile.weightKg + .5) * 10) / 10)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Resting burn",
						value: String(targets.bmr),
						unit: "kcal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "With activity",
						value: String(targets.tdee),
						unit: "kcal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Day's target",
						value: String(targets.kcal),
						unit: "kcal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Protein",
						value: String(targets.protein),
						unit: "grams"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Carbs",
						value: String(targets.carbs),
						unit: "grams"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Fat",
						value: String(targets.fat),
						unit: "grams"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-xl text-sm text-mist",
				children: [
					profile.goal === "lose" && `About ${delta} kcal under maintenance. `,
					profile.goal === "gain" && `About ${Math.abs(delta)} kcal over maintenance. `,
					profile.goal === "maintain" && "Set to match what you burn. ",
					"Estimated with Mifflin–St Jeor. These are targets, not a prescription."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onEdit,
					children: "Edit rules"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					className: "text-clay",
					onClick: () => {
						if (!confirm) {
							setConfirm(true);
							return;
						}
						onClear();
					},
					children: confirm ? "Erase everything on this device?" : "Clear this device"
				})]
			})
		]
	});
}
var useDiet = create()(persist((set) => ({
	profile: null,
	eaten: {},
	swaps: {},
	water: {},
	shop: {},
	weekSeed: 1,
	setProfile: (profile) => set({ profile }),
	clearAll: () => set({
		profile: null,
		eaten: {},
		swaps: {},
		water: {},
		shop: {},
		weekSeed: 1
	}),
	toggleEaten: (date, slot) => set((state) => ({ eaten: {
		...state.eaten,
		[date]: {
			...state.eaten[date],
			[slot]: !state.eaten[date]?.[slot]
		}
	} })),
	swapMeal: (date, slot) => set((state) => ({ swaps: {
		...state.swaps,
		[date]: {
			...state.swaps[date],
			[slot]: (state.swaps[date]?.[slot] ?? 0) + 1
		}
	} })),
	setWater: (date, count) => set((state) => ({ water: {
		...state.water,
		[date]: Math.max(0, Math.min(16, Math.round(count)))
	} })),
	toggleShop: (key) => set((state) => ({ shop: {
		...state.shop,
		[key]: !state.shop[key]
	} })),
	reshuffle: () => set((state) => ({
		weekSeed: state.weekSeed + 1,
		swaps: {},
		shop: {}
	}))
}), {
	name: "linden-diet",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		profile: state.profile,
		eaten: state.eaten,
		swaps: state.swaps,
		water: state.water,
		shop: state.shop,
		weekSeed: state.weekSeed
	})
}));
var TABS = [
	{
		id: "today",
		label: "Today",
		icon: UtensilsCrossed
	},
	{
		id: "week",
		label: "Week",
		icon: CalendarDays
	},
	{
		id: "shop",
		label: "Shop",
		icon: ShoppingBasket
	},
	{
		id: "you",
		label: "You",
		icon: CircleUser
	}
];
function Boot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-ink px-6 text-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-semibold italic",
				children: "Linden"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: "Setting the table"
			})]
		})
	});
}
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
	const [tab, setTab] = (0, import_react.useState)("today");
	const [date, setDate] = (0, import_react.useState)(todayKey);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const goal = (0, import_react.useMemo)(() => profile ? targets(profile) : null, [profile]);
	const week = (0, import_react.useMemo)(() => profile ? buildWeek(profile, date, swaps, weekSeed) : [], [
		profile,
		date,
		swaps,
		weekSeed
	]);
	const day = week.find((item) => item.date === date) ?? week[0];
	const items = (0, import_react.useMemo)(() => shopList(week), [week]);
	const weekStart = weekDates(date)[0] ?? date;
	if (!profile || editing || !goal || !day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {
		initial: profile,
		onCancel: profile ? () => setEditing(false) : void 0,
		onDone: (next) => {
			setProfile(next);
			setEditing(false);
			setTab("today");
		}
	});
	const shopKey = (id) => `${weekSeed}:${weekStart}:${id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ink text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-leaf focus:px-4 focus:py-2 focus:text-ink-on-leaf",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-screen w-full max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-line px-4 py-6 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 px-2 font-display text-2xl font-semibold italic",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-full bg-leaf text-ink-on-leaf",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
								className: "size-5",
								"aria-hidden": "true"
							})
						}), "Linden"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Primary",
						className: "mt-8 flex flex-col gap-1",
						children: TABS.map((item) => {
							const Icon = item.icon;
							const active = tab === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-current": active ? "page" : void 0,
								onClick: () => setTab(item.id),
								className: cn("flex h-12 items-center gap-3 rounded-2xl px-3 text-left", active ? "bg-panel-2 text-cream" : "text-mist hover:bg-panel hover:text-cream"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: cn("size-5", active && "text-leaf"),
									"aria-hidden": "true"
								}), item.label]
							}, item.id);
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 text-sm text-mist",
						children: "Kept on this device."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					id: "content",
					className: "min-w-0 flex-1 px-4 pb-28 pt-6 sm:px-8 lg:px-10 lg:pb-12",
					children: [
						tab === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, {
							profile,
							date,
							setDate,
							day,
							targets: goal,
							eaten: eaten[date],
							swapIndex: (slot) => swaps[date]?.[slot] ?? 0,
							water: water[date] ?? 0,
							onToggle: (slot) => toggleEaten(date, slot),
							onSwap: (slot) => swapMeal(date, slot),
							onWater: (count) => setWater(date, count)
						}),
						tab === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekView, {
							date,
							week,
							targets: goal,
							eaten,
							onOpen: (next) => {
								setDate(next);
								setTab("today");
							},
							onShuffle: reshuffle
						}),
						tab === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopView, {
							date,
							items,
							checked: (id) => Boolean(shop[shopKey(id)]),
							onToggle: (id) => toggleShop(shopKey(id))
						}),
						tab === "you" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouView, {
							profile,
							targets: goal,
							onWeight: (kg) => setProfile({
								...profile,
								weightKg: kg
							}),
							onEdit: () => setEditing(true),
							onClear: clearAll
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Primary",
				className: "safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-lg",
					children: TABS.map((item) => {
						const Icon = item.icon;
						const active = tab === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-current": active ? "page" : void 0,
							onClick: () => setTab(item.id),
							className: cn("flex h-16 flex-1 flex-col items-center justify-center gap-1 text-xs", active ? "text-leaf" : "text-mist"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								"aria-hidden": "true"
							}), item.label]
						}, item.id);
					})
				})
			})
		]
	});
}
function DietApp() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const finish = () => {
			if (alive) setReady(true);
		};
		try {
			const unsub = useDiet.persist.onFinishHydration(finish);
			useDiet.persist.rehydrate();
			return () => {
				alive = false;
				unsub();
			};
		} catch {
			finish();
			return () => {
				alive = false;
			};
		}
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
var SplitComponent = DietApp;
//#endregion
export { SplitComponent as component };
