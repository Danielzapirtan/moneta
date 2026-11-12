import { createFileRoute } from "@tanstack/react-router";
import { DietApp } from "@/components/diet/diet-app";

export const Route = createFileRoute("/")({ component: DietApp });
