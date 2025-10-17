import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CiShoppingCart,
    CiDollar,
    CiBoxes,
    CiUser,
    
} from 'react-icons/ci';
import { useAuth } from '../../context/AuthContext';
import { demoProducts, demoOrders } from '../../data/demoData';

const Dashboard = () => {
    const { user, isAuthenticated, isSeller } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated || !isSeller) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-2xl mb-4">Access Denied</p>
                    <p className="text-gray-400 mb-6">This page is only accessible to sellers</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-cyan-500 text-white px-6 py-2 rounded-full"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const totalProducts = demoProducts.length;
    const totalOrders = demoOrders.length;
    const totalRevenue = demoOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const lowStockProducts = demoProducts.filter((p) => p.stock < 20);
    const pendingOrders = demoOrders.filter((o) => o.status === 'processing');
    const recentOrders = demoOrders.slice(0, 5);

    const stats = [
        {
            icon: CiBoxes,
            label: 'Total Products',
            value: totalProducts,
            color: 'from-blue-500 to-cyan-500',
            link: '/seller/products',
        },
        {
            icon: CiShoppingCart,
            label: 'Total Orders',
            value: totalOrders,
            color: 'from-green-500 to-emerald-500',
            link: '/seller/orders',
        },
        {
            icon: CiDollar,
            label: 'Total Revenue',
            value: `₹${totalRevenue.toLocaleString()}`,
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: CiUser,
            label: 'Pending Orders',
            value: pendingOrders.length,
            color: 'from-purple-500 to-pink-500',
            link: '/seller/orders',
        },
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
                        <span className="text-white">Seller </span>
                        <span className="text-cyan-400">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Welcome back, {user.name}!</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {stat.link ? (
                                <Link to={stat.link}>
                                    <div
                                        className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-white`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <stat.icon className="text-4xl" />
                                            <span className="text-3xl font-bold">{stat.value}</span>
                                        </div>
                                        <p className="text-white/90 font-semibold">{stat.label}</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-white`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <stat.icon className="text-4xl" />
                                        <span className="text-3xl font-bold">{stat.value}</span>
                                    </div>
                                    <p className="text-white/90 font-semibold">{stat.label}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-white text-2xl font-bold">Recent Orders</h2>
                            <Link
                                to="/seller/orders"
                                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-white font-semibold">Order #{order._id}</p>
                                            <p className="text-gray-400 text-sm">
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'delivered'
                                                ? 'bg-green-500 text-white'
                                                : order.status === 'shipped'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-yellow-500 text-black'
                                                }`}
                                        >
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                                        <span className="text-gray-400 text-sm">
                                            {order.items.length} item(s)
                                        </span>
                                        <span className="text-cyan-400 font-bold">₹{order.totalAmount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Low Stock Alert */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-white text-2xl font-bold">Low Stock Alert</h2>
                            <Link
                                to="/seller/products"
                                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                            >
                                Manage →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {lowStockProducts.length > 0 ? (
                                lowStockProducts.slice(0, 5).map((product) => (
                                    <div
                                        key={product._id}
                                        className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center gap-4"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className="text-white font-semibold">{product.name}</p>
                                            <p className="text-gray-400 text-sm">{product.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-orange-400 font-bold">{product.stock}</p>
                                            <p className="text-gray-500 text-xs">in stock</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-8">All products have sufficient stock</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                >
                    <h2 className="text-white text-2xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/seller/products?action=add">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-500 transition-all"
                            >
                                <CiBoxes className="text-4xl text-cyan-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">Add New Product</h3>
                                <p className="text-gray-400 text-sm">
                                    Add a new product to your inventory
                                </p>
                            </motion.div>
                        </Link>
                        <Link to="/seller/orders">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-500 transition-all"
                            >
                                <CiShoppingCart className="text-4xl text-cyan-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">Manage Orders</h3>
                                <p className="text-gray-400 text-sm">
                                    View and update order statuses
                                </p>
                            </motion.div>
                        </Link>
                        <Link to="/chat">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-500 transition-all"
                            >
                                <CiUser className="text-4xl text-cyan-400 mb-3" />
                                <h3 className="text-white font-semibold mb-2">Customer Feedback</h3>
                                <p className="text-gray-400 text-sm">
                                    Respond to customer queries
                                </p>
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;

