import { ArrowRight, Sprout } from "lucide-react";
import { farmerBenefits } from "../../../data/farmerBenefits";
import BenefitItem from "./BenefitItem";
import Lottie from "react-lottie-player";
import farmerLottie from "../../../assets/lotties/farmerLottie.json";
const BecomeFarmer = () => {
  return (
    <div
      className="
            bg-linear-to-r
            from-green-700
            via-green-600
            to-lime-600
            px-8 py-12
            lg:px-16 lg:py-12
          "
    >
      {/* Background Decorations */}

      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            <Sprout size={18} />
            Join Our Farming Community
          </div>

          <h2 className="mt-6 text-2xl font-bold leading-tight text-white lg:text-4xl">
            Grow Your Farm.
            <br />
            Grow Your Future.
          </h2>

          <p className="mt-6 max-w-xln leading-8 text-green-100">
            Join thousands of farmers who are selling directly to customers,
            earning better profits, and expanding their business through
            KrishiLink.
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-8">
            {farmerBenefits.map((benefit) => (
              <BenefitItem key={benefit.id} benefit={benefit} />
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:scale-105">
              Become a Farmer
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <Lottie
            animationData={farmerLottie}
            loop={true}
            play
            speed={3}
            className="w-full max-w-md drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeFarmer;
