import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { NewsletterFeature as NewsletterFeatureType } from "../../../types";

interface NewsletterFeatureProps {
  feature: NewsletterFeatureType;
  delay?: number;
}

const NewsletterFeature = ({ feature, delay = 0 }: NewsletterFeatureProps) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
      }}
      whileHover={{
        x: 8,
      }}
      className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-green-50"
    >
      {/* Icon */}
      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: 8,
        }}
        className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-green-100
                    text-green-700
                    transition-colors
                    group-hover:bg-green-600
                    group-hover:text-white
                "
      >
        <Icon size={22} />
      </motion.div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{feature.title}</h3>

          <CheckCircle2 size={16} className="text-green-500" />
        </div>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default NewsletterFeature;
