import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiMail, CiPhone, CiLocationOn } from 'react-icons/ci';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            <span className="text-cyan-400">GYM</span>
                            <span className="text-white">SUPPS</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted source for premium gym supplements. We provide
                            high-quality products to help you achieve your fitness goals.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=pre-workout"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    Pre-Workout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=post-workout"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    Post-Workout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=supplements"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    Supplements
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Customer Service */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/chat"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cart"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    Shopping Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/wishlist"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                >
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-white font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-gray-400 text-sm">
                                <CiLocationOn className="text-cyan-400 text-xl flex-shrink-0 mt-0.5" />
                                <span>123 Fitness Street, Mumbai, Maharashtra 400001</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <CiPhone className="text-cyan-400 text-xl" />
                                <span>+91 9876543210</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <CiMail className="text-cyan-400 text-xl" />
                                <span>support@gymsupps.com</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} <span className="text-cyan-400">GYMSUPPS</span>. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Made with <span className="text-red-500">❤</span> for fitness enthusiasts
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

