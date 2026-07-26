import {
  Fish,
  Sprout,
  Wheat,
  Apple,
  Egg,
  Milk,
  Leaf,
  Salad,
} from "lucide-react";
import type { Category } from "../types/category.types";

export const categories: Category[] = [
  {
    id: 1,
    name: "Vegetables",
    icon: Salad,
    productCount: 120,
  },
  {
    id: 2,
    name: "Fruits",
    icon: Apple,
    productCount: 80,
  },
  {
    id: 3,
    name: "Grains",
    icon: Wheat,
    productCount: 65,
  },
  {
    id: 4,
    name: "Dairy",
    icon: Milk,
    productCount: 40,
  },
  {
    id: 5,
    name: "Organic",
    icon: Leaf,
    productCount: 55,
  },
  {
    id: 6,
    name: "Poultry",
    icon: Egg,
    productCount: 35,
  },
  {
    id: 7,
    name: "Fish",
    icon: Fish,
    productCount: 28,
  },
  {
    id: 8,
    name: "Spices",
    icon: Sprout,
    productCount: 70,
  },
];
