import { motion } from "framer-motion";
import {
    Mail,
    MapPin,
    Phone,
    Sprout,
} from "lucide-react";

const quickLinks = [
    "Home",
    "Products",
    "Categories",
    "Become a Farmer",
    "Contact",
];

const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
];

const socialLinks = [
    {
        icon: Mail,
        href: "#",
    },
    {
        icon: Mail,
        href: "#",
    },
    {
        icon: Mail,
        href: "#",
    },
    {
        icon: Mail,
        href: "#",
    },
];

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300">

            {/* Top Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-green-500 to-transparent" />

            <div className="container mx-auto px-4 py-20">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2">

                            <div className="rounded-xl bg-green-600 p-2">
                                <Sprout className="text-white" size={22} />
                            </div>

                            <h2 className="text-2xl font-bold text-white">
                                KrishiLink
                            </h2>

                        </div>

                        <p className="mt-5 leading-7 text-gray-400">
                            Connecting farmers directly with buyers through a
                            modern digital marketplace across Bangladesh.
                        </p>

                        <div className="mt-6 flex gap-3">

                            {socialLinks.map(({ icon: Icon, href }, index) => (
                                <motion.a
                                    key={index}
                                    href={href}
                                    whileHover={{
                                        scale: 1.15,
                                        rotate: 10,
                                    }}
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white/10
                                        text-gray-300
                                        transition-colors
                                        hover:bg-green-600
                                        hover:text-white
                                    "
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}

                        </div>
                    </motion.div>

                    {/* Quick Links */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: .1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3">

                            {quickLinks.map((link) => (
                                <motion.li
                                    key={link}
                                    whileHover={{ x: 6 }}
                                >
                                    <a
                                        href="#"
                                        className="transition hover:text-green-400"
                                    >
                                        {link}
                                    </a>
                                </motion.li>
                            ))}

                        </ul>
                    </motion.div>

                    {/* Categories */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: .2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-white">
                            Categories
                        </h3>

                        <ul className="mt-5 space-y-3">

                            {categories.map((item) => (
                                <motion.li
                                    key={item}
                                    whileHover={{ x: 6 }}
                                >
                                    <a
                                        href="#"
                                        className="transition hover:text-green-400"
                                    >
                                        {item}
                                    </a>
                                </motion.li>
                            ))}

                        </ul>
                    </motion.div>

                    {/* Contact */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: .3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <div className="mt-5 space-y-5">

                            <div className="flex items-start gap-3">
                                <MapPin
                                    className="mt-1 text-green-500"
                                    size={18}
                                />
                                <span>
                                    Dhaka, Bangladesh
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail
                                    className="text-green-500"
                                    size={18}
                                />
                                <span>
                                    support@krishilink.com
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone
                                    className="text-green-500"
                                    size={18}
                                />
                                <span>
                                    +880 1700-000000
                                </span>
                            </div>

                        </div>
                    </motion.div>

                </div>

                {/* Bottom */}

                <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">

                    <p>
                        © {new Date().getFullYear()} KrishiLink. All rights reserved.
                    </p>

                    <div className="flex gap-6">

                        <a
                            href="#"
                            className="transition hover:text-green-400"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="transition hover:text-green-400"
                        >
                            Terms & Conditions
                        </a>

                    </div>

                    <p>
                        Made with ❤️ in Bangladesh
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;