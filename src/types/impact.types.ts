import type { LucideIcon } from "lucide-react";

export interface ImpactStat {
  id: number;
  value: number;
  suffix: string;
  title: string;
  description: string;
  icon: LucideIcon;
}