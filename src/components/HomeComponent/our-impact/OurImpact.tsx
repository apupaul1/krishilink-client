import { impactStats } from "../../../data/impactStats";
import ImpactCard from "./ImpactCard";

const OurImpact = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-lime-50 py-16">
      {/* Decorative Blur */}

      <div className="mx-auto max-w-7xl px-5">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Our Impact
          </span>

          <h2 className="mt-5 text-2xl font-bold md:text-4xl">
            Growing Together with Farmers Across Bangladesh
          </h2>

          <p className="mt-5 text-sm text-gray-600">
            Every order supports local farmers, promotes sustainable
            agriculture, and delivers fresh produce directly to
            thousands of families.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {impactStats.map((stat) => (
            <ImpactCard
              key={stat.id}
              stat={stat}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurImpact;