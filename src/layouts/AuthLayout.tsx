import { Outlet } from "react-router";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";

import farmerLottie from "../assets/lotties/farmerLottie.json";
import Logo from "../components/shared/Logo/Logo";

const AuthLayout = () => {
  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-1 items-center justify-center px-6 py-10"
        >
          {/* Logo */}
          <div className="absolute left-8 top-8">
            <Logo />
          </div>

          {/* Form */}
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden flex-1 items-center justify-center bg-linear-to-br from-green-50 via-white to-lime-50 lg:flex"
        >
          <Lottie
            animationData={farmerLottie}
            play
            loop
            speed={1}
            className="w-125 max-w-full"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default AuthLayout;
