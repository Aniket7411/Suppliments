import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CiShoppingCart,
    CiHeart,
    CiUser,
    CiMenuBurger,
    CiSearch,
    CiLogout
} from 'react-icons/ci';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
    const { user, isAuthenticated, isSeller, logout } = useAuth();
    const { getCartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-black border-b border-gray-800 sticky top-0 z-40 backdrop-blur-lg bg-opacity-95"
        >
            <div className="container mx-auto px-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="text-3xl font-bold"
                        >
                            <span className="text-cyan-400">GYM</span>
                            <span className="text-white">SUPPS</span>
                        </motion.div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search supplements..."
                                className="w-full bg-gray-900 text-white px-4 py-2 pl-10 rounded-full border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                            />
                            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                    </form>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-6">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {isAuthenticated ? (
                                <>
                                    {isSeller ? (
                                        <>
                                            <Link
                                                to="/seller/dashboard"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/seller/products"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                                            >
                                                Products
                                            </Link>
                                            <Link
                                                to="/seller/orders"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                                            >
                                                Orders
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/products"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                                            >
                                                Products
                                            </Link>
                                            <Link to="/wishlist" className="relative group">
                                                <CiHeart className="text-2xl text-gray-300 group-hover:text-cyan-400 transition-colors" />
                                                {wishlistCount > 0 && (
                                                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                        {wishlistCount}
                                                    </span>
                                                )}
                                            </Link>
                                            <Link to="/cart" className="relative group">
                                                <CiShoppingCart className="text-2xl text-gray-300 group-hover:text-cyan-400 transition-colors" />
                                                {getCartCount() > 0 && (
                                                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                        {getCartCount()}
                                                    </span>
                                                )}
                                            </Link>
                                        </>
                                    )}
                                    <Link
                                        to="/chat"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                        Chat
                                    </Link>
                                    <Link to="/profile" className="group">
                                        <CiUser className="text-2xl text-gray-300 group-hover:text-cyan-400 transition-colors" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-300 hover:text-red-400 transition-colors"
                                    >
                                        <CiLogout className="text-2xl" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/products"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-2xl text-gray-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <CiMenuBurger />
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search supplements..."
                            className="w-full bg-gray-900 text-white px-4 py-2 pl-10 rounded-full border border-gray-700 focus:border-cyan-500 focus:outline-none"
                        />
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>
                </form>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-800 py-4"
                    >
                        <nav className="flex flex-col gap-4">
                            {isAuthenticated ? (
                                <>
                                    {isSeller ? (
                                        <>
                                            <Link
                                                to="/seller/dashboard"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/seller/products"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Products
                                            </Link>
                                            <Link
                                                to="/seller/orders"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Orders
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/products"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Products
                                            </Link>
                                            <Link
                                                to="/wishlist"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors py-2 flex items-center gap-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                                            </Link>
                                            <Link
                                                to="/cart"
                                                className="text-gray-300 hover:text-cyan-400 transition-colors py-2 flex items-center gap-2"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Cart {getCartCount() > 0 && `(${getCartCount()})`}
                                            </Link>
                                        </>
                                    )}
                                    <Link
                                        to="/chat"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Chat
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-red-400 hover:text-red-500 transition-colors py-2 text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/products"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="text-gray-300 hover:text-cyan-400 transition-colors py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-colors text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </nav>
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
};

export default Header;

