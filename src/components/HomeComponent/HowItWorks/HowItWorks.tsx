import { steps } from "../../../data/howItWorks";
import StepCard from "./StepCard";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            How It Works
          </span>

          <h2 className="mt-5 text-4xl font-bold text-stone-900">
            Fresh Food In 4 Easy Steps
          </h2>

          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            Shopping from local farmers has never been easier.
          </p>
        </div>

        <div className="relative mt-15">
          {/* Timeline */}
          <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 border-t-2 border-dashed border-green-300 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
