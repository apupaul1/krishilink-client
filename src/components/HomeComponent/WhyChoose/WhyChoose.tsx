import { Button } from "antd";
import { ArrowRight } from "lucide-react";

import FeatureCard from "./FeatureCard";
import { features } from "../../../data/features";

const WhyChoose = () => {
  return (
    <section className="bg-stone-50 py-12">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:items-center">
        {/* Left Side */}
        <div>
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-stone-900 lg:text-5xl">
            Why Thousands of People Trust KrishiLink
          </h2>

          <p className="mt-6 text-md leading-8 text-stone-600">
            We connect farmers directly with customers, ensuring fresher
            products, fair prices, and a reliable shopping experience across
            Bangladesh.
          </p>

          <Button
            type="primary"
            size="large"
            className="mt-8"
          >
            Learn More
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>

        {/* Right Side */}
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;