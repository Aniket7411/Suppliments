import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiEdit, CiTrash, CiCirclePlus, CiSearch } from 'react-icons/ci';
import { useAuth } from '../../context/AuthContext';
import { demoProducts } from '../../data/demoData';

const ProductsManagement = () => {
    const { isAuthenticated, isSeller } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState(demoProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(searchParams.get('action') === 'add');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'supplements',
        stock: '',
        image: '',
        brand: '',
        rating: 0,
        reviews: 0,
        flavors: [],
        weight: '',
    });

    if (!isAuthenticated || !isSeller) {
        navigate('/');
        return null;
    }

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            // Update existing product
            setProducts(
                products.map((p) =>
                    p._id === editingProduct._id ? { ...formData, _id: editingProduct._id } : p
                )
            );
        } else {
            // Add new product
            const newProduct = {
                ...formData,
                _id: `${Date.now()}`,
                price: Number(formData.price),
                stock: Number(formData.stock),
                rating: Number(formData.rating) || 0,
                reviews: Number(formData.reviews) || 0,
            };
            setProducts([newProduct, ...products]);
        }
        resetForm();
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter((p) => p._id !== productId));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'supplements',
            stock: '',
            image: '',
            brand: '',
            rating: 0,
            reviews: 0,
            flavors: [],
            weight: '',
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            <span className="text-white">Products </span>
                            <span className="text-cyan-400">Management</span>
                        </h1>
                        <p className="text-gray-400">Manage your product inventory</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        >
                            <CiCirclePlus className="text-2xl" />
                            Add Product
                        </button>
                    )}
                </motion.div>

                {/* Add/Edit Form */}
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8"
                    >
                        <h2 className="text-white text-2xl font-bold mb-6">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Brand</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm block mb-2">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Stock</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Weight/Quantity</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        placeholder="e.g., 1kg, 500g"
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    >
                                        <option value="pre-workout">Pre-Workout</option>
                                        <option value="post-workout">Post-Workout</option>
                                        <option value="supplements">Supplements</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                                >
                                    {editingProduct ? 'Update Product' : 'Add Product'}
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

                {/* Search Bar */}
                {!showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="relative">
                            <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-gray-900 text-white px-4 py-3 pl-12 rounded-xl border border-gray-800 focus:border-cyan-500 focus:outline-none transition-all"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Products Table */}
                {!showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-800">
                                        <th className="text-left text-gray-400 px-6 py-4 font-semibold">Product</th>
                                        <th className="text-left text-gray-400 px-6 py-4 font-semibold">Category</th>
                                        <th className="text-left text-gray-400 px-6 py-4 font-semibold">Price</th>
                                        <th className="text-left text-gray-400 px-6 py-4 font-semibold">Stock</th>
                                        <th className="text-left text-gray-400 px-6 py-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product._id} className="border-t border-gray-800 hover:bg-gray-800/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <p className="text-white font-semibold">{product.name}</p>
                                                        <p className="text-gray-400 text-sm">{product.brand}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-cyan-400 text-sm">
                                                    {product.category.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white font-semibold">₹{product.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock > 20
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : product.stock > 0
                                                                ? 'bg-orange-500/20 text-orange-400'
                                                                : 'bg-red-500/20 text-red-400'
                                                        }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-cyan-400 hover:text-cyan-300 transition-colors p-2"
                                                    >
                                                        <CiEdit className="text-xl" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                                                    >
                                                        <CiTrash className="text-xl" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProductsManagement;

