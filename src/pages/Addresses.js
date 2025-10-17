import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CiLocationOn, CiEdit, CiTrash, CiCirclePlus } from 'react-icons/ci';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Addresses = () => {
    const { user, updateUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState(user?.addresses || []);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        pincode: '',
        isPrimary: false,
    });

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            // Edit existing address
            const updatedAddresses = addresses.map((addr) =>
                addr._id === editingId ? { ...formData, _id: editingId } : addr
            );
            setAddresses(updatedAddresses);
            updateUser({ addresses: updatedAddresses });
            setEditingId(null);
        } else {
            // Add new address
            const newAddress = {
                ...formData,
                _id: `addr${Date.now()}`,
            };
            const updatedAddresses = [...addresses, newAddress];
            setAddresses(updatedAddresses);
            updateUser({ addresses: updatedAddresses });
            setShowAddForm(false);
        }
        resetForm();
    };

    const handleEdit = (address) => {
        setFormData(address);
        setEditingId(address._id);
        setShowAddForm(true);
    };

    const handleDelete = (addressId) => {
        const updatedAddresses = addresses.filter((addr) => addr._id !== addressId);
        setAddresses(updatedAddresses);
        updateUser({ addresses: updatedAddresses });
    };

    const handleSetPrimary = (addressId) => {
        const updatedAddresses = addresses.map((addr) => ({
            ...addr,
            isPrimary: addr._id === addressId,
        }));
        setAddresses(updatedAddresses);
        updateUser({ addresses: updatedAddresses });
    };

    const resetForm = () => {
        setFormData({
            street: '',
            city: '',
            state: '',
            pincode: '',
            isPrimary: false,
        });
        setShowAddForm(false);
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            <span className="text-white">My </span>
                            <span className="text-cyan-400">Addresses</span>
                        </h1>
                        <p className="text-gray-400">Manage your delivery addresses</p>
                    </div>
                    {!showAddForm && (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        >
                            <CiCirclePlus className="text-2xl" />
                            Add Address
                        </button>
                    )}
                </motion.div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8"
                    >
                        <h2 className="text-white text-2xl font-bold mb-6">
                            {editingId ? 'Edit Address' : 'Add New Address'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-sm block mb-2">Street Address</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    placeholder="e.g., 123, MG Road"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                        placeholder="e.g., Mumbai"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">State</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                        placeholder="e.g., Maharashtra"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm block mb-2">Pincode</label>
                                <input
                                    type="text"
                                    required
                                    pattern="[0-9]{6}"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    placeholder="e.g., 400001"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isPrimary"
                                    checked={formData.isPrimary}
                                    onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                    className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500"
                                />
                                <label htmlFor="isPrimary" className="text-gray-400 text-sm">
                                    Set as primary address
                                </label>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                                >
                                    {editingId ? 'Update Address' : 'Add Address'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Addresses List */}
                {addresses.length > 0 ? (
                    <div className="space-y-4">
                        {addresses.map((address, index) => (
                            <motion.div
                                key={address._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-gray-900 rounded-xl p-6 border-2 ${address.isPrimary ? 'border-cyan-500' : 'border-gray-800'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <CiLocationOn className="text-cyan-400 text-2xl" />
                                            {address.isPrimary && (
                                                <span className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                    PRIMARY
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white text-lg mb-2">{address.street}</p>
                                        <p className="text-gray-400">
                                            {address.city}, {address.state} - {address.pincode}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {!address.isPrimary && (
                                            <button
                                                onClick={() => handleSetPrimary(address._id)}
                                                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                            >
                                                Set as Primary
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="text-gray-400 hover:text-white transition-colors p-2"
                                        >
                                            <CiEdit className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(address._id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-2"
                                        >
                                            <CiTrash className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    !showAddForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <CiLocationOn className="text-6xl text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-xl mb-4">No addresses saved</p>
                            <p className="text-gray-500 mb-6">Add an address to get started</p>
                        </motion.div>
                    )
                )}
            </div>
        </div>
    );
};

export default Addresses;

