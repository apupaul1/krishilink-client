import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import type { ImpactStat } from "../../../types";

interface Props {
  stat: ImpactStat;
}

const ImpactCard = ({ stat }: Props) => {
  const Icon = stat.icon as React.ElementType; 

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });

// Framer Motion কাউন্টার লজিক
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return stat.value % 1 !== 0 
      ? latest.toFixed(1) 
      : Math.round(latest).toString(); 
  });

  useEffect(() => {
    if (isInView) {
      // ২ সেকেন্ড ধরে জিরো থেকে stat.value পর্যন্ত অ্যানিমেট হবে
      const animation = animate(count, stat.value, {
        duration: 2,
        ease: "easeOut",
      });
      return animation.stop;
    }
  }, [isInView, stat.value, count]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.4 }}
      className="
        group 
        rounded-3xl 
        border 
        border-green-100 
        bg-white/80 
        p-8 
        backdrop-blur 
        shadow-sm 
        transition-all
        duration-300 
        hover:-translate-y-2 
        hover:border-green-500 
        hover:shadow-xl
      "
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition group-hover:scale-110">
        <Icon size={32} />
      </div>

      <h3 className="mb-2 text-4xl font-extrabold text-green-600 flex items-center gap-1">
        <motion.span>{rounded}</motion.span>
        <span>{stat.suffix}</span>
      </h3>

      <h4 className="mb-2 text-xl font-semibold">
        {stat.title}
      </h4>

      <p className="text-sm leading-6 text-gray-500">
        {stat.description}
      </p>
    </motion.div>
  );
};

export default ImpactCard;