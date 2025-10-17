import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiMail, CiLock } from 'react-icons/ci';
import { useAuth } from '../context/AuthContext';
import { demoUsers } from '../data/demoData';
import Loader from '../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const user = demoUsers.find((u) => u.email === email && u.password === password);

            if (user) {
                // Generate a fake token
                const token = 'demo_token_' + user._id;
                login(user, token);

                // Navigate based on user role
                if (user.role === 'seller') {
                    navigate('/seller/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 1000);
    };

    const handleDemoLogin = (role) => {
        const demoUser = demoUsers.find((u) => u.role === role);
        if (demoUser) {
            setEmail(demoUser.email);
            setPassword(demoUser.password);
        }
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
                    <p className="text-gray-400 mt-2">Sign in to your account</p>
                </div>

                {/* Demo Credentials */}
                <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-cyan-500">
                    <p className="text-cyan-400 font-semibold mb-3 text-sm">Demo Credentials:</p>
                    <div className="space-y-2 text-sm">
                        <div>
                            <button
                                onClick={() => handleDemoLogin('buyer')}
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                                <strong>Buyer:</strong> rahul@example.com / demo123
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => handleDemoLogin('seller')}
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                                <strong>Seller:</strong> seller@example.com / demo123
                            </button>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Email Address</label>
                            <div className="relative">
                                <CiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-gray-400 text-sm block mb-2">Password</label>
                            <div className="relative">
                                <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-400 mt-6 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                            Sign Up
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

export default Login;

