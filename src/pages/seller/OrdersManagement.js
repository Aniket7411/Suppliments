import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiSearch, CiLocationOn } from 'react-icons/ci';
import { useAuth } from '../../context/AuthContext';
import { demoOrders } from '../../data/demoData';

const OrdersManagement = () => {
    const { isAuthenticated, isSeller } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState(demoOrders);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    if (!isAuthenticated || !isSeller) {
        navigate('/');
        return null;
    }

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(
            orders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-500 text-white';
            case 'shipped':
                return 'bg-blue-500 text-white';
            case 'processing':
                return 'bg-yellow-500 text-black';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const statusOptions = [
        { value: 'all', label: 'All Orders' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
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
                        <span className="text-white">Orders </span>
                        <span className="text-cyan-400">Management</span>
                    </h1>
                    <p className="text-gray-400">Manage and track all orders</p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1"
                    >
                        <div className="relative">
                            <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by order ID..."
                                className="w-full bg-gray-900 text-white px-4 py-3 pl-12 rounded-xl border border-gray-800 focus:border-cyan-500 focus:outline-none transition-all"
                            />
                        </div>
                    </motion.div>

                    {/* Status Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex gap-2">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setFilterStatus(option.value)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${filterStatus === option.value
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-white text-xl font-bold mb-2">
                                                    Order #{order._id}
                                                </h3>
                                                <p className="text-gray-400 text-sm">
                                                    Placed on {new Date(order.orderDate).toLocaleString()}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Items */}
                                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                            <h4 className="text-white font-semibold mb-3">Order Items</h4>
                                            <div className="space-y-2">
                                                {order.items.map((item) => (
                                                    <div
                                                        key={item.productId}
                                                        className="flex justify-between items-center text-sm"
                                                    >
                                                        <span className="text-gray-300">
                                                            {item.name} x {item.quantity}
                                                        </span>
                                                        <span className="text-cyan-400 font-semibold">
                                                            ₹{item.price * item.quantity}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between items-center">
                                                <span className="text-white font-bold">Total Amount</span>
                                                <span className="text-cyan-400 font-bold text-lg">
                                                    ₹{order.totalAmount}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Shipping Address */}
                                        <div className="flex items-start gap-2">
                                            <CiLocationOn className="text-cyan-400 text-2xl flex-shrink-0" />
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">Shipping Address</h4>
                                                <p className="text-gray-400 text-sm">
                                                    {order.shippingAddress.street}
                                                    <br />
                                                    {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                                                    {order.shippingAddress.pincode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Update */}
                                    <div className="lg:w-64">
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-3">Update Status</h4>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none mb-3"
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>

                                            {order.status === 'shipped' && order.expectedDelivery && (
                                                <div className="text-sm">
                                                    <p className="text-gray-400 mb-1">Expected Delivery:</p>
                                                    <p className="text-white font-semibold">
                                                        {new Date(order.expectedDelivery).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            )}

                                            {order.status === 'delivered' && order.deliveryDate && (
                                                <div className="text-sm">
                                                    <p className="text-gray-400 mb-1">Delivered On:</p>
                                                    <p className="text-green-400 font-semibold">
                                                        {new Date(order.deliveryDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800"
                        >
                            <p className="text-gray-400 text-xl">No orders found</p>
                            <p className="text-gray-500 mt-2">
                                {searchQuery ? 'Try adjusting your search' : 'No orders yet'}
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                >
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                        <p className="text-gray-400 mb-2">Total Orders</p>
                        <p className="text-white text-3xl font-bold">{orders.length}</p>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                        <p className="text-gray-400 mb-2">Pending Orders</p>
                        <p className="text-yellow-400 text-3xl font-bold">
                            {orders.filter((o) => o.status === 'processing').length}
                        </p>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                        <p className="text-gray-400 mb-2">Delivered Orders</p>
                        <p className="text-green-400 text-3xl font-bold">
                            {orders.filter((o) => o.status === 'delivered').length}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrdersManagement;

