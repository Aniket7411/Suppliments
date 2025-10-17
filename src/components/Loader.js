import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false }) => {
    const loaderContent = (
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
                className="flex gap-2"
                animate={{
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <motion.div
                    className="w-4 h-4 bg-cyan-400 rounded-full"
                    animate={{ y: [-10, 0, -10] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="w-4 h-4 bg-cyan-500 rounded-full"
                    animate={{ y: [-10, 0, -10] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.2,
                    }}
                />
                <motion.div
                    className="w-4 h-4 bg-cyan-600 rounded-full"
                    animate={{ y: [-10, 0, -10] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.4,
                    }}
                />
            </motion.div>
            <p className="text-cyan-400 text-sm font-medium">Loading...</p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
                {loaderContent}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            {loaderContent}
        </div>
    );
};

export default Loader;

