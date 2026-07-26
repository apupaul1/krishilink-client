import type { Feature } from "../../../types";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <div className="group rounded-3xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
        <Icon size={32} />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-stone-800">
        {feature.title}
      </h3>

      <p className="leading-7 text-stone-500">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;