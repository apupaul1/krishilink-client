import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { testimonials } from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-green-50 py-24">

      <div className="container relative mx-auto px-4">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-5 text-gray-600">
            Thousands of families trust KrishiLink for fresh,
            healthy, and farm-direct products every day.
          </p>

        </div>

        {/* Swiper */}

        <Swiper
          modules={[
            EffectCoverflow,
            Pagination,
            Autoplay,
          ]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            scale: 0.9,
            slideShadows: false,
          }}
          className="pb-14"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="
                w-full!
                md:w-125!
              "
            >
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;