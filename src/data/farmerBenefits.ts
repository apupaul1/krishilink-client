import {
  BadgeCheck,
  HandCoins,
  Sprout,
  Users,
} from "lucide-react";

import type { FarmerBenefit } from "../types";

export const farmerBenefits: FarmerBenefit[] = [
  {
    id: 1,
    title: "Sell Directly",
    description:
      "Connect with customers without middlemen and keep more of your earnings.",
    icon: Sprout,
  },
  {
    id: 2,
    title: "Fair Market Prices",
    description:
      "Receive transparent pricing and maximize your profit on every sale.",
    icon: HandCoins,
  },
  {
    id: 3,
    title: "Secure Payments",
    description:
      "Get paid safely and on time through trusted payment methods.",
    icon: BadgeCheck,
  },
  {
    id: 4,
    title: "Reach More Buyers",
    description:
      "Expand your customer base and grow your farming business nationwide.",
    icon: Users,
  },
];