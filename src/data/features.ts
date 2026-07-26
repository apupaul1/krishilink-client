import {
  Leaf,
  Truck,
  BadgeDollarSign,
  ShieldCheck,
} from "lucide-react";
import type { Feature } from "../types";

export const features: Feature[] = [
  {
    id: 1,
    title: "Fresh Products",
    description:
      "Freshly harvested crops delivered directly from trusted local farmers.",
    icon: Leaf,
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "Reliable delivery to your doorstep with our delivery partners.",
    icon: Truck,
  },
  {
    id: 3,
    title: "Fair Pricing",
    description:
      "Buy directly from farmers with no unnecessary middlemen.",
    icon: BadgeDollarSign,
  },
  {
    id: 4,
    title: "Trusted Farmers",
    description:
      "Every farmer is verified to ensure quality and authenticity.",
    icon: ShieldCheck,
  },
];