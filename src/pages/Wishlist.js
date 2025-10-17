import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiHeart } from 'react-icons/ci';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const { wishlistItems } = useWishlist();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <CiHeart className="text-6xl text-cyan-400 mx-auto mb-4" />
                    <p className="text-white text-2xl mb-4">Please login to view your wishlist</p>
                    <Link
                        to="/login"
                        className="bg-cyan-500 text-white px-6 py-2 rounded-full inline-block"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <CiHeart className="text-6xl text-gray-600 mx-auto mb-4" />
                    <p className="text-white text-2xl mb-4">Your wishlist is empty</p>
                    <p className="text-gray-400 mb-6">
                        Start adding products you love to your wishlist
                    </p>
                    <Link
                        to="/products"
                        className="bg-cyan-500 text-white px-6 py-3 rounded-full inline-block hover:bg-cyan-600 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

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
                        <span className="text-white">My </span>
                        <span className="text-cyan-400">Wishlist</span>
                    </h1>
                    <p className="text-gray-400">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                    </p>
                </motion.div>

                {/* Wishlist Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

