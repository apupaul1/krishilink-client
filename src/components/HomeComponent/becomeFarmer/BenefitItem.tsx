import type { FarmerBenefit } from "../../../types";

interface BenefitItemProps {
  benefit: FarmerBenefit;
}

const BenefitItem = ({ benefit }: BenefitItemProps) => {
  const Icon = benefit.icon;

  return (
    <div className="group flex items-start gap-4">
      {/* Icon */}
      <div
        className="
          flex h-14 w-14 shrink-0 items-center justify-center
          rounded-2xl bg-white/15 backdrop-blur-sm
          border border-white/20
          transition-all duration-300
          group-hover:scale-110
          group-hover:bg-white
          group-hover:text-green-700
        "
      >
        <Icon size={28} />
      </div>

      {/* Content */}
      <div>
        <h4 className="text-lg font-semibold text-white">
          {benefit.title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-green-100">
          {benefit.description}
        </p>
      </div>
    </div>
  );
};

export default BenefitItem;