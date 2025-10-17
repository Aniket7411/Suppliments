import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiMail, CiLock, CiUser, CiPhone } from 'react-icons/ci';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'buyer',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Create new user object
            const newUser = {
                _id: `user${Date.now()}`,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                addresses: [],
            };

            // Generate a fake token
            const token = 'demo_token_' + newUser._id;
            login(newUser, token);

            // Navigate based on user role
            if (newUser.role === 'seller') {
                navigate('/seller/dashboard');
            } else {
                navigate('/');
            }

            setLoading(false);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
            {loading && <Loader fullScreen />}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">
                        <span className="text-cyan-400">GYM</span>
                        <span className="text-white">SUPPS</span>
                    </h1>
                    <p className="text-gray-400 mt-2">Create your account</p>
                </div>

                {/* Register Form */}
                <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 p-3 rounded-lg mb-6 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Full Name</label>
                            <div className="relative">
                                <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Email Address</label>
                            <div className="relative">
                                <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Phone Number</label>
                            <div className="relative">
                                <CiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Account Type</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                            >
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Password</label>
                            <div className="relative">
                                <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Confirm Password</label>
                            <div className="relative">
                                <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </motion.button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-400 mt-6 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;

