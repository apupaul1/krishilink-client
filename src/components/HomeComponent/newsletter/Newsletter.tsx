import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    Leaf,
    Mail
} from "lucide-react";

const Newsletter = () => {
    return (
        <section className="bg-linear-to-br from-stone-50 via-green-50 to-emerald-100">
            <div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: .7,
                    }}
                    className="p-10 text-center md:p-16"
                >

                    {/* Badge */}

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700"
                    >
                        <Leaf size={16} />
                        Join Our Community
                    </motion.div>

                    {/* Heading */}

                    <h2 className="mt-8 text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
                        Stay Connected with{" "}
                        <span className="bg-linear-to-r from-green-700 to-lime-500 bg-clip-text text-transparent">
                            KrishiLink
                        </span>
                    </h2>

                    {/* Description */}

                    <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-500">
                        Receive seasonal farming tips, fresh harvest updates,
                        market insights and exclusive offers directly in your inbox.
                    </p>

                    {/* Subscribe */}

                    <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 rounded-full border border-gray-200 bg-white shadow-lg md:flex-row">

                        <div className="flex flex-1 items-center gap-3 px-4">

                            <Mail
                                size={20}
                                className="text-gray-400"
                            />

                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-transparent outline-none placeholder:text-gray-400"
                            />

                        </div>

                        <motion.button
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: .96,
                            }}
                            className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
                        >
                            Subscribe

                            <motion.div
                                animate={{
                                    x: [0, 6, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            >
                                <ArrowRight size={18} />
                            </motion.div>

                        </motion.button>

                    </div>

                    {/* Stats */}

                    <div className="mt-10 flex flex-wrap justify-center gap-8">

                        <div>
                            <h3 className="text-3xl font-bold text-green-700">
                                10K+
                            </h3>

                            <p className="text-gray-600">
                                Subscribers
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-green-700">
                                Weekly
                            </h3>

                            <p className="text-gray-600">
                                Farming Tips
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-green-700">
                                100%
                            </h3>

                            <p className="text-gray-600">
                                Free Updates
                            </p>
                        </div>

                    </div>

                    {/* Trust */}

                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

                        <div className="flex items-center gap-2">

                            <Check
                                size={16}
                                className="text-green-600"
                            />

                            No Spam

                        </div>

                        <div className="flex items-center gap-2">

                            <Check
                                size={16}
                                className="text-green-600"
                            />

                            Weekly Updates

                        </div>

                        <div className="flex items-center gap-2">

                            <Check
                                size={16}
                                className="text-green-600"
                            />

                            Unsubscribe Anytime

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default Newsletter;