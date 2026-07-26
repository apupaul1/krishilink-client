import type { LucideIcon } from "lucide-react";

export interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  productCount: number;
}