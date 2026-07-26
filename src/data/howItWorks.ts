import {
  Search,
  ShoppingCart,
  Truck,
  Smile,
} from "lucide-react";

import type { WorkStep } from "../types";

export const steps: WorkStep[] = [
  {
    id: 1,
    title: "Browse Products",
    description:
      "Explore fresh vegetables, fruits, grains, and more from trusted farmers.",
    icon: Search,
  },
  {
    id: 2,
    title: "Place Your Order",
    description:
      "Add your favorite products to the cart and place your order securely.",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Fast Delivery",
    description:
      "Our delivery partners ensure your products arrive fresh and on time.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Enjoy Fresh Food",
    description:
      "Receive farm-fresh products at your doorstep and enjoy healthy living.",
    icon: Smile,
  },
];