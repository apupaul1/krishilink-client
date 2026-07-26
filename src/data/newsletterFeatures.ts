import {
    Gift,
    Leaf,
    Newspaper,
} from "lucide-react";

import type { NewsletterFeature } from "../types";

export const newsletterFeatures: NewsletterFeature[] = [
    {
        id: 1,
        title: "Weekly Farming Tips",
        description: "Expert advice to improve your harvest.",
        icon: Leaf,
    },
    {
        id: 2,
        title: "Fresh Crop Updates",
        description: "Know what's available every week.",
        icon: Newspaper,
    },
    {
        id: 3,
        title: "Exclusive Offers",
        description: "Special discounts only for subscribers.",
        icon: Gift,
    },
];