import { Button } from "antd";
import { ArrowRight, Leaf, PlayCircle, Truck } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../assets/hero/farmer.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-stone-50 via-green-50 to-emerald-100">
      {/* Blur Background */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-green-300/30 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 py-8 lg:flex-row">
        {/* ================= Left ================= */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 shadow">
            <Leaf className="text-green-600" size={18} />

            <span className="text-sm font-medium text-green-700">
              Fresh From Local Farmers
            </span>
          </div>

          {/* Heading */}

          <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Fresh Crops,
            <br />
            Directly From
            <span className="text-green-600"> Farmers.</span>
          </h1>

          {/* Description */}

          <p className="my-2 max-w-xl text-sm leading-8 text-gray-600">
            Buy fresh vegetables, fruits and organic products directly from
            trusted farmers. Enjoy fair prices, high quality products and fast
            delivery across Bangladesh.
          </p>

          {/* Buttons */}

          <div className="mt-5 flex flex-wrap gap-4">
            <Button
              type="primary"
              size="large"
              className="h-12! px-8!"
            >
              Shop Now
              <ArrowRight size={18} className="ml-2" />
            </Button>

            <Button
              size="large"
              className="h-12! px-8!"
            >
              <PlayCircle size={18} className="mr-2" />
              Become a Farmer
            </Button>
          </div>

          {/* Statistics */}

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">1000+</h3>

              <p className="mt-1 text-gray-600">
                Trusted
                <br />
                Farmers
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">25K+</h3>

              <p className="mt-1 text-gray-600">
                Happy
                <br />
                Customers
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">150+</h3>

              <p className="mt-1 text-gray-600">
                Fresh
                <br />
                Products
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= Right ================= */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-1 justify-center"
        >
          {/* Glow */}

          <div className="absolute bottom-5 h-80 w-80 rounded-full bg-green-300/30 blur-3xl" />

          {/* Image */}

          <img
            src={heroImage}
            alt="Farmer"
            className="relative z-10 w-full max-w-130"
          />

          {/* Rating Card */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute right-0 top-16 z-20 rounded-2xl border border-white/30 bg-white/70 p-5 shadow-xl backdrop-blur-lg"
          >
            <h4 className="text-3xl font-bold text-amber-500">
              ⭐ 4.9
            </h4>

            <p className="text-sm text-gray-600">
              Customer Rating
            </p>
          </motion.div>

          {/* Fresh Card */}

          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute bottom-20 left-0 z-20 rounded-2xl border border-white/30 bg-white/70 p-5 shadow-xl backdrop-blur-lg"
          >
            <div className="flex items-center gap-3">
              <Leaf className="text-green-600" />

              <div>
                <h4 className="font-semibold">
                  Today's Harvest
                </h4>

                <p className="text-sm text-gray-500">
                  150+ Fresh Crops
                </p>
              </div>
            </div>
          </motion.div>

          {/* Delivery Card */}

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute bottom-0 right-8 z-20 rounded-2xl border border-white/30 bg-white/70 p-5 shadow-xl backdrop-blur-lg"
          >
            <div className="flex items-center gap-3">
              <Truck className="text-green-600" />

              <div>
                <h4 className="font-semibold">
                  Fast Delivery
                </h4>

                <p className="text-sm text-gray-500">
                  Across Bangladesh
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;