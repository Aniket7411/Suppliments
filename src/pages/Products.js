import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { demoProducts } from '../data/demoData';
import { CiFilter } from 'react-icons/ci';

const Products = () => {
    const [searchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(demoProducts);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        let products = [...demoProducts];

        // Filter by search query
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            products = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category from URL or state
        const categoryParam = searchParams.get('category');
        const activeCategory = categoryParam || selectedCategory;
        if (activeCategory && activeCategory !== 'all') {
            products = products.filter((product) => product.category === activeCategory);
        }

        // Sort products
        if (sortBy === 'price-low') {
            products.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            products.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            products.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'name') {
            products.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredProducts(products);
    }, [searchParams, selectedCategory, sortBy]);

    const categories = [
        { value: 'all', label: 'All Products' },
        { value: 'pre-workout', label: 'Pre-Workout' },
        { value: 'post-workout', label: 'Post-Workout' },
        { value: 'supplements', label: 'Supplements' },
    ];

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-white">Our </span>
                        <span className="text-cyan-400">Products</span>
                    </h1>
                    <p className="text-gray-400">
                        Discover premium supplements for your fitness goals
                    </p>
                </motion.div>

                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-900 p-4 rounded-xl border border-gray-800">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 text-cyan-400 font-semibold"
                    >
                        <CiFilter className="text-xl" />
                        Filters
                    </button>

                    {/* Categories */}
                    <div className={`flex-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <label className="text-gray-400 text-sm mb-2 block">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => setSelectedCategory(category.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${(searchParams.get('category') || selectedCategory) === category.value
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort */}
                    <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
                        <label className="text-gray-400 text-sm mb-2 block">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="name">Name: A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 mb-6"
                >
                    Showing {filteredProducts.length} products
                </motion.p>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-400 text-xl">No products found</p>
                        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Products;

