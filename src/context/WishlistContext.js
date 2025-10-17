import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // Load wishlist from localStorage
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist));
        }
    }, []);

    useEffect(() => {
        // Save wishlist to localStorage whenever it changes
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        setWishlistItems((prevItems) => {
            const exists = prevItems.find((item) => item._id === product._id);
            if (exists) {
                return prevItems;
            }
            return [...prevItems, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prevItems) =>
            prevItems.filter((item) => item._id !== productId)
        );
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item._id === productId);
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlistItems.length,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

