import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CiSearch, CiPaperplane, CiChat1 } from 'react-icons/ci';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { demoChats } from '../data/demoData';

const Chat = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [chats, setChats] = useState(demoChats);
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <CiChat1 className="text-6xl text-cyan-400 mx-auto mb-4" />
                    <p className="text-white text-2xl mb-4">Please login to access chat</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-cyan-500 text-white px-6 py-2 rounded-full"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    const filteredChats = chats.filter(
        (chat) =>
            chat.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.replies?.some((reply) =>
                reply.message.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newChat = {
            _id: `chat${Date.now()}`,
            userId: user._id,
            userName: user.name,
            message: newMessage,
            timestamp: new Date().toISOString(),
            replies: [],
        };

        setChats([newChat, ...chats]);
        setNewMessage('');
    };

    const handleSubmitReply = (e, chatId) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        const updatedChats = chats.map((chat) => {
            if (chat._id === chatId) {
                return {
                    ...chat,
                    replies: [
                        ...chat.replies,
                        {
                            _id: `reply${Date.now()}`,
                            userId: user._id,
                            userName: user.name,
                            message: replyMessage,
                            timestamp: new Date().toISOString(),
                        },
                    ],
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setReplyMessage('');
        setReplyTo(null);
    };

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-white">Chat & </span>
                        <span className="text-cyan-400">Feedback</span>
                    </h1>
                    <p className="text-gray-400">
                        Ask questions, share feedback, and connect with us
                    </p>
                </motion.div>

                {/* Search Box */}
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
                            placeholder="Search messages..."
                            className="w-full bg-gray-900 text-white px-4 py-3 pl-12 rounded-xl border border-gray-800 focus:border-cyan-500 focus:outline-none transition-all"
                        />
                    </div>
                </motion.div>

                {/* New Message Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8"
                >
                    <h2 className="text-white text-xl font-semibold mb-4">Post a Message</h2>
                    <form onSubmit={handleSubmitMessage} className="flex flex-wrap gap-3">

                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message or question..."
                            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none transition-all"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        >
                            <CiPaperplane className="text-xl" />
                            Send
                        </motion.button>
                    </form>
                </motion.div>

                {/* Chat Messages */}
                <div className="space-y-6">
                    {filteredChats.length > 0 ? (
                        filteredChats.map((chat, index) => (
                            <motion.div
                                key={chat._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                            >
                                {/* Main Message */}
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-lg">
                                            {chat.userName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-white font-semibold">{chat.userName}</h3>
                                            <span className="text-gray-500 text-sm">
                                                {new Date(chat.timestamp).toLocaleDateString()} at{' '}
                                                {new Date(chat.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed break-words">{chat.message}</p>
                                    </div>
                                </div>

                                {/* Replies */}
                                {chat.replies && chat.replies.length > 0 && (
                                    <div className="ml-16 space-y-4 border-l-2 border-cyan-500 pl-6">
                                        {chat.replies.map((reply) => (
                                            <div key={reply._id} className="flex gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white font-bold text-sm">
                                                        {reply.userName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="text-white font-semibold text-sm">
                                                            {reply.userName}
                                                        </h4>
                                                        <span className="text-gray-500 text-xs">
                                                            {new Date(reply.timestamp).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm">{reply.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Reply Form */}
                                {replyTo === chat._id ? (
                                    <form
                                        onSubmit={(e) => handleSubmitReply(e, chat._id)}
                                        className="ml-0 sm:ml-16 mt-4 flex flex-wrap gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            placeholder="Type your reply..."
                                            className="flex-1 min-w-[200px] bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-cyan-500 focus:outline-none text-sm"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-sm whitespace-nowrap"
                                        >
                                            Reply
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReplyTo(null);
                                                setReplyMessage('');
                                            }}
                                            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm whitespace-nowrap"
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setReplyTo(chat._id)}
                                        className="ml-0 sm:ml-16 mt-4 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-semibold"
                                    >
                                        Reply
                                    </button>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800"
                        >
                            <CiChat1 className="text-5xl text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">
                                {searchQuery ? 'No messages found' : 'No messages yet'}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;

