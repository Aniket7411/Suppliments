import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiTrash, CiShoppingCart } from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <CiShoppingCart className="text-6xl text-cyan-400 mx-auto mb-4" />
                    <p className="text-white text-2xl mb-4">Please login to view your cart</p>
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

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <CiShoppingCart className="text-6xl text-gray-600 mx-auto mb-4" />
                    <p className="text-white text-2xl mb-4">Your cart is empty</p>
                    <Link
                        to="/products"
                        className="bg-cyan-500 text-white px-6 py-3 rounded-full inline-block hover:bg-cyan-600 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const handleCheckout = () => {
        // In a real app, this would navigate to checkout page
        alert('Checkout functionality will be connected to backend!');
    };

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
                        <span className="text-white">Shopping </span>
                        <span className="text-cyan-400">Cart</span>
                    </h1>
                    <p className="text-gray-400">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                                >
                                    <div className="flex flex-wrap gap-4 md:gap-6">
                                        {/* Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                                        />

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/product/${item._id}`}>
                                                <h3 className="text-white font-semibold text-base sm:text-lg mb-1 hover:text-cyan-400 transition-colors truncate">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                                            <p className="text-cyan-400 font-bold text-lg sm:text-xl">₹{item.price}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto gap-3">
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-400 hover:text-red-300 transition-colors self-end sm:self-auto"
                                            >
                                                <CiTrash className="text-2xl" />
                                            </button>

                                            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="text-white px-3 py-1 hover:text-cyan-400 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-white font-semibold w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="text-white px-3 py-1 hover:text-cyan-400 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="text-gray-400 text-sm">
                                                Total: ₹{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Clear Cart Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={clearCart}
                            className="mt-4 text-red-400 hover:text-red-300 transition-colors"
                        >
                            Clear Cart
                        </motion.button>
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-24">
                            <h2 className="text-white text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>{getCartTotal() > 999 ? 'FREE' : '₹50'}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax (18%)</span>
                                    <span>₹{(getCartTotal() * 0.18).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-800 pt-4">
                                    <div className="flex justify-between text-white text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-cyan-400">
                                            ₹
                                            {(
                                                getCartTotal() +
                                                (getCartTotal() > 999 ? 0 : 50) +
                                                getCartTotal() * 0.18
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                className="w-full bg-cyan-500 text-white py-4 rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
                            >
                                Proceed to Checkout
                            </motion.button>

                            <Link
                                to="/products"
                                className="block text-center text-cyan-400 hover:text-cyan-300 mt-4 transition-colors"
                            >
                                Continue Shopping
                            </Link>

                            {/* Free Shipping Notice */}
                            {getCartTotal() < 999 && (
                                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                                    <p className="text-gray-400 text-sm">
                                        Add ₹{(999 - getCartTotal()).toFixed(2)} more to get{' '}
                                        <span className="text-green-400 font-semibold">FREE shipping</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

