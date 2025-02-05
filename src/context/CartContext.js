import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items from the backend when the user logs in
    const fetchCart = async () => {
        try {
            
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
                throw new Error('User not logged in');
            }
            const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
            setCartItems(response.data.items); // Update cart state
            
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCartItems([]);
        }
    };

    // Helper function to extract userId from localStorage
    const getUserIdFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser._id || user; // Return _id if parsed, else return raw value
        } catch (error) {
            return user; // If parsing fails, assume it's already a string
        }
    };

    // Add item to cart
    const handleAddToCart = async (productId, quantity) => {
        try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
                throw new Error('User not logged in');
            }
            const response = await axios.post('http://localhost:5000/api/cart/add', {
                userId,
                productId,
                quantity,
            });
            setCartItems(response.data.cart.items); // Update cart state
            refreshCart(); // Auto-refresh cart
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw new Error('Failed to add item to cart.');
        }
    };

    // Update item quantity in cart
    const handleUpdateCartItem = async (productId, quantity) => {
        try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
                throw new Error('User not logged in');
            }
            const response = await axios.put(`http://localhost:5000/api/cart/update/${userId}/${productId}`, {
                quantity,
            });
            setCartItems(response.data.cart.items); // Update cart state
            refreshCart(); // Auto-refresh cart
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw new Error('Failed to update cart item.');
        }
    };

    // Remove item from cart
    const handleRemoveFromCart = async (productId) => {
        try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
                throw new Error('User not logged in');
            }
            const response = await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}`);
            setCartItems(response.data.cart.items); // Update cart state
            refreshCart(); // Auto-refresh cart
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw new Error('Failed to remove item from cart.');
        }
    };

    // Clear the entire cart
    const handleClearCart = async () => {
        try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
                throw new Error('User not logged in');
            }
            const response = await axios.delete('http://localhost:5000/api/cart/clear', {
                data: { userId },
            });
            setCartItems([]); // Clear cart state
            refreshCart(); // Auto-refresh cart
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw new Error('Failed to clear cart.');
        }
    };

    // Auto-refresh cart after any operation
    const refreshCart = async () => {
        try {
            const userId = getUserIdFromLocalStorage();
            if (!userId) {
                throw new Error('User not logged in');
            }
            const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
            setCartItems(response.data.items); // Update cart state
        } catch (error) {
            console.error('Error refreshing cart:', error);
            alert('Failed to refresh cart. Please try again.');
        }
    };

    // Initialize cart on component mount
    useEffect(() => {
        
        fetchCart();
         // Fetch cart when the provider mounts
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart: handleAddToCart,
                updateCartItem: handleUpdateCartItem, // Expose updateCartItem
                removeFromCart: handleRemoveFromCart,
                clearCart: handleClearCart,
                fetchCart, // Expose fetchCart function
            }}
        >
            {children}
        </CartContext.Provider>
    );
};