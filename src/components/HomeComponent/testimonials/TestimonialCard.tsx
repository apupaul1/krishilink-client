import { BadgeCheck, MapPin, Quote } from "lucide-react";

import type { Testimonial } from "../../../types";
import Rating from "./Rating";

interface Props {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: Props) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border border-green-100
        bg-white
        p-8
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-green-500
        hover:shadow-2xl
      "
    >
      {/* Quote Icon */}
      <Quote
        size={90}
        className="
          absolute
          -right-6
          -top-6
          text-green-100
          transition-transform
          duration-300
          group-hover:rotate-12
        "
      />

      {/* Rating */}
      <Rating rating={testimonial.rating} />

      {/* Review */}
      <p className="mt-6 text-[15px] leading-7 text-gray-600">
        "{testimonial.review}"
      </p>

      {/* Divider */}
      <div className="my-6 h-px bg-green-100" />

      {/* Customer */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="
            h-16
            w-16
            rounded-full
            object-cover
            ring-4
            ring-green-100
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-lg">
              {testimonial.name}
            </h4>

            {testimonial.verified && (
              <BadgeCheck
                size={18}
                className="fill-green-500 text-white"
              />
            )}
          </div>

          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={15} />
            {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;