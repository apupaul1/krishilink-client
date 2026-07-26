import { motion } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";

const SubscribeForm = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: .9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="relative"
        >
            {/* Floating Decorations */}
            <motion.div
                animate={{
                    y: [0, -12, 0],
                    rotate: [0, 8, -8, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-8 -top-6 text-3xl"
            >
                🌿
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 12, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -right-6 -bottom-4 text-2xl"
            >
                🍃
            </motion.div>

            {/* Card */}
            <div className="rounded-4xl border border-white/60  p-8 backdrop-blur-xl">

                {/* Glow */}
                <div className="absolute inset-0 -z-10 rounded-4xl  blur-xl" />

                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <Mail size={36} />
                    </div>
                </div>

                <h3 className="mt-6 text-center text-2xl font-bold text-gray-900">
                    Subscribe Now
                </h3>

                <p className="mt-3 text-center text-gray-600">
                    Never miss fresh harvests, farming tips and exclusive offers.
                </p>

                {/* Input */}
                <div className="mt-8 relative">

                    <Mail
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            py-4
                            pl-12
                            pr-4
                            outline-none
                            transition-all
                            focus:border-green-500
                            focus:ring-4
                            focus:ring-green-200
                        "
                    />

                </div>

                {/* Button */}

                <motion.button
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: .97,
                    }}
                    className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-green-600
                        py-4
                        font-semibold
                        text-white
                        transition-colors
                        hover:bg-green-700
                    "
                >
                    Subscribe

                    <motion.span
                        animate={{
                            x: [0, 5, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        <ArrowRight size={20} />
                    </motion.span>

                </motion.button>

                {/* Bottom Info */}

                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">

                    <div className="flex items-center gap-1">
                        <Check
                            size={16}
                            className="text-green-600"
                        />
                        No Spam
                    </div>

                    <div className="flex items-center gap-1">
                        <Check
                            size={16}
                            className="text-green-600"
                        />
                        Weekly Updates
                    </div>

                    <div className="flex items-center gap-1">
                        <Check
                            size={16}
                            className="text-green-600"
                        />
                        Unsubscribe Anytime
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default SubscribeForm;