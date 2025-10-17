import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiHeart, CiShoppingCart, CiStar } from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { isAuthenticated, isSeller } = useAuth();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <Link to={`/product/${product._id}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500 transition-all group"
            >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56 bg-gray-800">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Stock Badge */}
                    <div className="absolute top-3 left-3">
                        {product.stock > 0 ? (
                            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                                In Stock
                            </span>
                        ) : (
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    {/* Wishlist Button - Only for buyers */}
                    {isAuthenticated && !isSeller && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleWishlistToggle}
                            className="absolute top-3 right-3 bg-black bg-opacity-50 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-70 transition-all"
                        >
                            <CiHeart
                                className={`text-2xl ${isInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-white'
                                    }`}
                            />
                        </motion.button>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Category Badge */}
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                        {product.category.replace('-', ' ')}
                    </span>

                    {/* Product Name */}
                    <h3 className="text-white font-semibold text-lg mt-2 line-clamp-1">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <CiStar
                                    key={i}
                                    className={`text-lg ${i < Math.floor(product.rating)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <span className="text-cyan-400 font-bold text-2xl">
                                ₹{product.price}
                            </span>
                            <p className="text-gray-500 text-xs">{product.weight}</p>
                        </div>

                        {/* Add to Cart Button - Only for buyers */}
                        {isAuthenticated && !isSeller && product.stock > 0 && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="bg-cyan-500 text-white p-3 rounded-lg hover:bg-cyan-600 transition-colors"
                            >
                                <CiShoppingCart className="text-xl" />
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;

