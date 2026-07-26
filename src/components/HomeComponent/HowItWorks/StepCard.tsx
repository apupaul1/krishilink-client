import type { WorkStep } from "../../../types";

interface Props {
  step: WorkStep;
  index: number;
}

const StepCard = ({ step, index }: Props) => {
  const Icon = step.icon;

  return (
    <div
      className={`relative flex ${
        index % 2 === 0 ? "lg:items-start" : "lg:items-end"
      }`}
    >
      <div
        className={`relative z-10 rounded-3xl bg-white border border-stone-200 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
        ${index % 2 === 0 ? "lg:mb-24" : "lg:mt-24"}`}
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
          <Icon size={30} />
        </div>

        <h3 className="text-xl font-semibold text-center">{step.title}</h3>

        <p className="mt-3 text-center text-stone-500">{step.description}</p>

        {/* Timeline Dot */}
        <div
          className={`absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-green-500 bg-white
          ${index % 2 === 0 ? "-bottom-12" : "-top-12"}`}
        />
      </div>
    </div>
  );
};

export default StepCard;
