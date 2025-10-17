import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiUser, CiMail, CiPhone, CiEdit, CiLogout, CiLocationOn } from 'react-icons/ci';
import { useAuth } from '../context/AuthContext';
import { demoOrders } from '../data/demoData';

const Profile = () => {
    const { user, logout, updateUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <CiUser className="text-6xl text-cyan-400 mx-auto mb-4" />
                    <p className="text-white text-2xl mb-4">Please login to view your profile</p>
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

    const userOrders = demoOrders.filter((order) => order.userId === user._id);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-white">My </span>
                        <span className="text-cyan-400">Profile</span>
                    </h1>
                    <p className="text-gray-400">Manage your account information</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                            {/* Profile Picture */}
                            <div className="flex justify-center mb-6">
                                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* User Info */}
                            {!isEditing ? (
                                <>
                                    <div className="text-center mb-6">
                                        <h2 className="text-white text-2xl font-bold mb-1">{user.name}</h2>
                                        <p className="text-cyan-400 text-sm">{user.role.toUpperCase()}</p>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <CiMail className="text-2xl text-cyan-400" />
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <CiPhone className="text-2xl text-cyan-400" />
                                            <span>{user.phone}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CiEdit className="text-xl" />
                                        Edit Profile
                                    </button>
                                </>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-gray-400 text-sm block mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-sm block mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-sm block mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="border-t border-gray-800 mt-6 pt-6 space-y-3">
                                <Link
                                    to="/addresses"
                                    className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
                                >
                                    <CiLocationOn className="text-2xl" />
                                    <span>Manage Addresses</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full"
                                >
                                    <CiLogout className="text-2xl" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Orders Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                            <h2 className="text-white text-2xl font-bold mb-6">Order History</h2>

                            {userOrders.length > 0 ? (
                                <div className="space-y-4">
                                    {userOrders.map((order) => (
                                        <div
                                            key={order._id}
                                            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="text-white font-semibold">Order #{order._id}</p>
                                                    <p className="text-gray-400 text-sm">
                                                        {new Date(order.orderDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'delivered'
                                                            ? 'bg-green-500 text-white'
                                                            : order.status === 'shipped'
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-yellow-500 text-black'
                                                        }`}
                                                >
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="space-y-2 mb-3">
                                                {order.items.map((item) => (
                                                    <div key={item.productId} className="flex justify-between text-gray-400 text-sm">
                                                        <span>
                                                            {item.name} x {item.quantity}
                                                        </span>
                                                        <span>₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
                                                <span className="text-white font-semibold">Total</span>
                                                <span className="text-cyan-400 font-bold text-lg">₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 mb-4">No orders yet</p>
                                    <Link
                                        to="/products"
                                        className="bg-cyan-500 text-white px-6 py-2 rounded-full inline-block hover:bg-cyan-600 transition-colors"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

