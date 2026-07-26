import {
  PackageCheck,
  Sprout,
  Star,
  Users,
} from "lucide-react";
import type { ImpactStat } from "../types";


export const impactStats: ImpactStat[] = [
  {
    id: 1,
    value: 2500,
    suffix: "+",
    title: "Verified Farmers",
    description: "Trusted farmers growing fresh produce across Bangladesh.",
    icon: Users,
  },
  {
    id: 2,
    value: 50000,
    suffix: "+",
    title: "Orders Delivered",
    description: "Successfully delivered fresh groceries to customers.",
    icon: PackageCheck,
  },
  {
    id: 3,
    value: 15000,
    suffix: "+",
    title: "Happy Customers",
    description: "Families enjoying healthy and farm-fresh food.",
    icon: Sprout,
  },
  {
    id: 4,
    value: 4.9,
    suffix: "/5",
    title: "Customer Rating",
    description: "Average rating from verified customer reviews.",
    icon: Star,
  },
];