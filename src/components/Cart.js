import axios from 'axios';

// Add item to cart
export const addToCart = async (userId, productId, quantity) => {
    try {
        const response = await axios.post('http://localhost:5000/api/cart/add', {
            userId,
            productId,
            quantity,
        });
        return response.data; // Return updated cart items
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Failed to add item to cart.');
    }
};

// Update cart item quantity
export const updateCartItem = async (userId, productId, quantity) => {
    try {
        const response = await axios.put('http://localhost:5000/api/cart/update', {
            userId,
            productId,
            quantity,
        });
        return response.data; // Return updated cart items
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw new Error('Failed to update cart item.');
    }
};

// Remove item from cart
export const removeFromCart = async (userId, productId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
            data: { userId },
        });
        return response.data; // Return updated cart items
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw new Error('Failed to remove item from cart.');
    }
};

// Clear cart
export const clearCart = async (userId) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/cart/clear', {
            data: { userId },
        });
        return response.data; // Return cleared cart
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw new Error('Failed to clear cart.');
    }
};