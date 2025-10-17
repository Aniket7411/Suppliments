import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CiHeart,
    CiShoppingCart,
    CiStar,
    CiDeliveryTruck,
    CiCircleCheck
} from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { demoProducts } from '../data/demoData';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { isAuthenticated, isSeller } = useAuth();

    const product = demoProducts.find((p) => p._id === id);
    const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0] || '');
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-2xl mb-4">Product not found</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-cyan-500 text-white px-6 py-2 rounded-full"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        addToCart(product, quantity);
    };

    const handleWishlistToggle = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    const relatedProducts = demoProducts
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-400 text-sm mb-6"
                >
                    <span className="cursor-pointer hover:text-cyan-400" onClick={() => navigate('/')}>
                        Home
                    </span>
                    {' / '}
                    <span className="cursor-pointer hover:text-cyan-400" onClick={() => navigate('/products')}>
                        Products
                    </span>
                    {' / '}
                    <span className="text-white">{product.name}</span>
                </motion.div>

                {/* Product Detail */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 p-8"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-xl"
                        />
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {/* Category Badge */}
                        <span className="inline-block bg-cyan-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                            {product.category.replace('-', ' ').toUpperCase()}
                        </span>

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

                        {/* Brand */}
                        <p className="text-gray-400 text-lg mb-4">by {product.brand}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <CiStar
                                        key={i}
                                        className={`text-2xl ${i < Math.floor(product.rating)
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-400">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-cyan-400 font-bold text-5xl">₹{product.price}</span>
                            <span className="text-gray-400 text-lg ml-3">{product.weight}</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-6">
                            {product.stock > 0 ? (
                                <>
                                    <CiCircleCheck className="text-green-500 text-2xl" />
                                    <span className="text-green-500 font-semibold">
                                        In Stock ({product.stock} available)
                                    </span>
                                </>
                            ) : (
                                <span className="text-red-500 font-semibold">Out of Stock</span>
                            )}
                        </div>

                        {/* Flavor Selection */}
                        {product.flavors && product.flavors.length > 1 && (
                            <div className="mb-6">
                                <label className="text-white font-semibold mb-3 block">
                                    Select Flavor
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.flavors.map((flavor) => (
                                        <button
                                            key={flavor}
                                            onClick={() => setSelectedFlavor(flavor)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${selectedFlavor === flavor
                                                    ? 'bg-cyan-500 text-white border-cyan-500'
                                                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-cyan-500'
                                                }`}
                                        >
                                            {flavor}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector - Only for buyers */}
                        {!isSeller && (
                            <div className="mb-6">
                                <label className="text-white font-semibold mb-3 block">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="bg-gray-800 text-white w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-white text-xl font-semibold w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="bg-gray-800 text-white w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons - Only for buyers */}
                        {!isSeller && (
                            <div className="flex flex-wrap gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 min-w-[200px] bg-cyan-500 text-white py-4 rounded-xl font-semibold hover:bg-cyan-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <CiShoppingCart className="text-2xl" />
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWishlistToggle}
                                    className={`p-4 rounded-xl border transition-all flex-shrink-0 ${isInWishlist(product._id)
                                            ? 'bg-red-500 border-red-500 text-white'
                                            : 'bg-gray-800 border-gray-700 text-white hover:border-cyan-500'
                                        }`}
                                >
                                    <CiHeart className="text-2xl" />
                                </motion.button>
                            </div>
                        )}

                        {/* Delivery Info */}
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <div className="flex items-start gap-3">
                                <CiDeliveryTruck className="text-cyan-400 text-3xl flex-shrink-0" />
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Fast Delivery</h3>
                                    <p className="text-gray-400 text-sm">
                                        Free delivery on orders above ₹999. Standard delivery in 3-5 business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-8"
                        >
                            <span className="text-white">Related </span>
                            <span className="text-cyan-400">Products</span>
                        </motion.h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;

