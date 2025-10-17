import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { demoProducts } from '../data/demoData';
import { CiDumbbell, CiPill, CiDeliveryTruck, CiStar } from 'react-icons/ci';

const Home = () => {
    const featuredProducts = demoProducts.slice(0, 6);

    const categories = [
        {
            name: 'Pre-Workout',
            icon: CiDumbbell,
            description: 'Boost your energy and performance',
            color: 'from-red-500 to-orange-500',
            link: '/products?category=pre-workout',
        },
        {
            name: 'Post-Workout',
            icon: CiStar,
            description: 'Recover faster and build muscle',
            color: 'from-blue-500 to-cyan-500',
            link: '/products?category=post-workout',
        },
        {
            name: 'Supplements',
            icon: CiPill,
            description: 'Support your overall health',
            color: 'from-green-500 to-emerald-500',
            link: '/products?category=supplements',
        },
    ];

    const features = [
        {
            icon: CiDumbbell,
            title: 'Premium Quality',
            description: 'Only the best supplements for your fitness journey',
        },
        {
            icon: CiDeliveryTruck,
            title: 'Fast Delivery',
            description: 'Quick and reliable shipping across India',
        },
        {
            icon: CiStar,
            title: 'Expert Support',
            description: '24/7 customer support for all your queries',
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-black"></div>
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            <span className="text-white">Fuel Your </span>
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                                Fitness Journey
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg md:text-xl mb-8"
                        >
                            Premium quality supplements for athletes and fitness enthusiasts.
                            Build muscle, boost energy, and achieve your goals.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <Link
                                to="/products"
                                className="bg-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-cyan-600 transition-all hover:scale-105 transform"
                            >
                                Shop Now
                            </Link>
                            <Link
                                to="/chat"
                                className="bg-gray-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                            >
                                Get Advice
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                    >
                        <span className="text-white">Shop by </span>
                        <span className="text-cyan-400">Category</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={category.link}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white h-full`}
                                    >
                                        <category.icon className="text-6xl mb-4" />
                                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                        <p className="text-white/90">{category.description}</p>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="text-white">Featured </span>
                            <span className="text-cyan-400">Products</span>
                        </h2>
                        <Link
                            to="/products"
                            className="text-cyan-400 hover:text-cyan-300 font-semibold"
                        >
                            View All →
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500">
                                    <feature.icon className="text-4xl text-cyan-400" />
                                </div>
                                <h3 className="text-white text-xl font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-cyan-900 to-blue-900">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Ready to Transform Your Fitness?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-cyan-100 text-lg mb-8"
                    >
                        Join thousands of satisfied customers and start your journey today
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            to="/products"
                            className="bg-white text-cyan-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all inline-block hover:scale-105 transform"
                        >
                            Start Shopping
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;

