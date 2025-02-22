import React, { useContext, useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    IconButton,
    Button,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CartPage = () => {
    const { cartItems, updateCartItem, removeFromCart, clearCart, fetchCart } = useContext(CartContext);
    const [userDetails, setUserDetails] = useState(null);
    const [showDownloadAnimation, setShowDownloadAnimation] = useState(false);
    const [localQuantities, setLocalQuantities] = useState({});
    const [showRemoveAllAnimation, setShowRemoveAllAnimation] = useState(false);
    const [showRemoveItemMessage, setShowRemoveItemMessage] = useState(null);
    const [confirmRemoveAllDialogOpen, setConfirmRemoveAllDialogOpen] = useState(false);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = localStorage.getItem('user');
                if (!userId) {
                    console.error('User ID not found in localStorage');
                    return;
                }
                const response = await axios.get(`${backendUrl}/api/users/${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    // Calculate approximate total
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.product?.price || 0; // Default to 0 if price is unavailable
            const quantity = item.quantity || 0; // Default to 0 if quantity is unavailable
            return total + price * quantity;
        }, 0);
    };

    // Refresh cart manually
    const handleRefreshCart = async () => {
        try {
            await fetchCart();
        } catch (error) {
            console.error('Error refreshing cart:', error);
            alert('Kindly Login First. If issue continues contact us.');
        }
    };

    // Download cart as PDF
    const downloadCartAsPDF = () => {
        try {
            const doc = new jsPDF();
            // Add header with user details
            doc.setFontSize(16);
            doc.setTextColor(62, 123, 39); // Greenish color (#3E7B27) for header
            doc.text('KVH General Store', 90, 10);
            doc.setFontSize(10);
            doc.setTextColor(75, 22, 76); // #
            doc.setFont('helvetica', 'bold');
            doc.text(`Name: ${userDetails?.name || 'N/A'}`, 10, 15);
            doc.text(`Mobile no: ${userDetails?.mobile || 'N/A'}`, 10, 20);
            // Add table headers
            doc.setFontSize(10);
            doc.setTextColor(255, 0, 0); // Red color for headers
            doc.setFont('helvetica', 'bold');
            doc.text('SL.No.', 10, 30);
            doc.text('Brand', 30, 30);
            doc.text('Product Name', 65, 30);
            doc.text('Qty', 135, 30);
            doc.text('Category', 150, 30);
            // Add cart items
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0); // Black color for content
            cartItems.forEach((item, index) => {
                const yPosition = 40 + (index * 10);
                doc.text(`${index + 1}`, 10, yPosition);
                doc.text(item.product?.brand || 'N/A', 30, yPosition);
                doc.text(item.product?.name || 'N/A', 65, yPosition);
                doc.text(`${item.quantity}`, 135, yPosition);
                doc.text(item.product?.category || 'N/A', 150, yPosition);
            });
            // Add approx total
            const totalYPosition = 40 + (cartItems.length * 10) + 10;
            doc.setFontSize(12);
            doc.setTextColor(255, 0, 0); // Red color for total
            doc.text(`Approx Amount In Rs: ${calculateTotal().toFixed(2)}`, 10, totalYPosition);
            // Add timestamp at the bottom
            const date = new Date().toLocaleString();
            doc.setTextColor(0, 0, 255); // Blue color for timestamp
            doc.text(`Downloaded on: ${date}`, 10, totalYPosition + 10);
            // Save the PDF
            const filename = userDetails?.name ? `${userDetails.name}-cart.pdf` : 'cart-items.pdf';
            doc.save(filename);
            // Show download animation
            setShowDownloadAnimation(true);
            setTimeout(() => {
                setShowDownloadAnimation(false);
            }, 2000);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    // Remove all items from the cart
    const handleRemoveAll = () => {
        setConfirmRemoveAllDialogOpen(true);
    };

    // Confirm and remove all items
    const confirmAndRemoveAll = () => {
        clearCart();
        setConfirmRemoveAllDialogOpen(false);
        setShowRemoveAllAnimation(true);
        setTimeout(() => {
            setShowRemoveAllAnimation(false);
        }, 2000);
    };

    // Remove a single item from the cart
    const handleRemoveItem = (productId) => {
        setProductToDelete(productId);
        setConfirmDeleteDialogOpen(true);
    };

    // Confirm and remove a single item
    const confirmAndRemoveItem = () => {
        removeFromCart(productToDelete);
        setConfirmDeleteDialogOpen(false);
        setShowRemoveItemMessage(productToDelete);
        setTimeout(() => {
            setShowRemoveItemMessage(null);
        }, 2000);
    };

    return (
        <>
            {/* Approx Total */}
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#0A5EB0',
                    fontWeight: 'bold',
                }}
            >
                Approx Amount: ₹{calculateTotal().toFixed(2)}
            </Typography>

            
            {/* Refresh Cart Button */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <Typography variant="body1" style={{ color: 'black', fontWeight: 'bold' }}>
                Note: The total amount shown is an approximate estimate.
                The final billing price may be higher or lower based on actual product availability, discounts etc.
                </Typography>
                <br/>
                <Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>
                    Sorry for the inconvenience! If you are facing any issues in the cart, please press the button below or Clear Cart:
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleRefreshCart}
                    style={{ marginTop: '10px' }}
                >
                    Refresh Cart
                </Button>
            </div>

             {/* Download Animation */}
             {showDownloadAnimation && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        padding: '15px 30px',
                        borderRadius: '10px',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        animation: 'popIn 0.5s ease-in-out, slideOut 0.5s ease-in-out 1.5s forwards',
                    }}
                >
                    <CheckCircleIcon fontSize="small" />
                    <Typography variant="body1">Cart downloaded successfully!</Typography>
                </div>
            )}

           {/* Remove All Animation */}
            {showRemoveAllAnimation && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#FF5722',
                        color: '#fff',
                        padding: '15px 30px',
                        borderRadius: '10px',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        animation: 'popIn 0.5s ease-in-out, slideOut 0.5s ease-in-out 1.5s forwards',
                    }}
                >
                    <span role="img" aria-label="sad-emoji">
                        😢
                    </span>
                    <Typography variant="body1">All items have been removed!</Typography>
                </div>
            )}

            {/* Single Item Removal Message */}
            {showRemoveItemMessage && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#FFC107',
                        color: '#000',
                        padding: '15px 30px',
                        borderRadius: '10px',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        animation: 'popIn 0.5s ease-in-out, slideOut 0.5s ease-in-out 1.5s forwards',
                    }}
                >
                    <span role="img" aria-label="removed-emoji">
                        🗑️
                    </span>
                    <Typography variant="body1">This item has been removed!</Typography>
                </div>
            )}

            {/* Cart Title */}
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                Your Cart
            </Typography>

            {/* Cart Items */}
            {cartItems.length > 0 ? (
                <Grid container spacing={2}>
                    {cartItems.map((item, index) => {
                        const productId = item.product?._id;

                        // Handle local quantity changes
                        const handleQuantityChange = (e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && value > 0) {
                                setLocalQuantities((prev) => ({
                                    ...prev,
                                    [productId]: value,
                                }));
                            }
                        };

                        // Update quantity when the tick button is clicked
                        const handleUpdateQuantity = () => {
                            const newQuantity = localQuantities[productId] || item.quantity;
                            if (!isNaN(newQuantity) && newQuantity > 0) {
                                updateCartItem(productId, newQuantity);
                            } else {
                                alert('Please enter a valid quantity.');
                            }
                        };

                        return (
                            <Grid item xs={12} sm={6} md={4} key={productId}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardContent sx={{ flexGrow: 1, padding: '10px' }}>
                                        {/* Product Image */}
                                        <CardMedia
                                            component="img"
                                            height="80" // Reduced height for smaller cards
                                            image={item.product?.img || 'https://via.placeholder.com/150'}
                                            alt={item.product?.name || 'Product Image'}
                                            sx={{ marginBottom: '10px' }}
                                            style={{
                                                objectFit: 'contain',
                                                width: '100%',
                                                height: '140px',
                                            }}
                                        />
                                        {/* Product Details */}
                                        <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            {item.product?.name || 'Sales Closed on this Product'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                            Brand: {item.product?.brand || 'Unavailable'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                            Qty: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                    {/* Actions */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                        {/* Update Quantity Field */}
                                        <TextField
                                            type="number"
                                            defaultValue={item.quantity}
                                            onChange={handleQuantityChange}
                                            onBlur={() =>
                                                setLocalQuantities((prev) => ({
                                                    ...prev,
                                                    [productId]: prev[productId] || item.quantity,
                                                }))
                                            }
                                            inputProps={{ min: 1 }}
                                            size="small"
                                            sx={{
                                                flexGrow: 1,
                                                fontSize: '0.8rem',
                                                backgroundColor: '#9A7E6F',
                                                border: '2px solid rgb(106, 42, 7)',
                                                borderRadius: '5px',
                                                padding: '5px',
                                            }}
                                        />
                                        {/* Tick Button */}
                                        <IconButton onClick={handleUpdateQuantity} sx={{ marginLeft: '10px', color: 'green' }}>
                                            <CheckCircleIcon />
                                        </IconButton>
                                        {/* Remove Button */}
                                        <IconButton onClick={() => handleRemoveItem(productId)} sx={{ marginLeft: '10px', color: '#FF5722' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
                    Your cart is empty.
                </Typography>
            )}

            {/* Action Buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    flexWrap: 'wrap',
                    gap: '10px',
                }}
            >
                {/* Remove All Button */}
                <Button
                    variant="contained"
                    onClick={handleRemoveAll}
                    sx={{
                        backgroundColor: '#B82132',
                        '&:hover': { backgroundColor: '#E53935' },
                        flex: { xs: '1 1 100%', sm: '0 1 auto' },
                    }}
                >
                    Remove All
                </Button>
                {/* Continue Shopping Button */}
                <Button
                    variant="contained"
                    component={Link}
                    to="/products"
                    sx={{
                        backgroundColor: '#605678',
                        '&:hover': { backgroundColor: '#526E48' },
                        flex: { xs: '1 1 100%', sm: '0 1 auto' },
                    }}
                >
                    Continue Shopping
                </Button>
                {/* Download Cart as PDF Button */}
                <Button
                    variant="contained"
                    onClick={downloadCartAsPDF}
                    sx={{
                        backgroundColor: '#2A3335',
                        '&:hover': { backgroundColor: '#2E5B17' },
                        flex: { xs: '1 1 100%', sm: '0 1 auto' },
                    }}
                >
                    Download Cart as PDF
                </Button>
            </Box>

            {/* Confirmation Dialog for Remove All */}
            <Dialog open={confirmRemoveAllDialogOpen} onClose={() => setConfirmRemoveAllDialogOpen(false)}>
                <DialogTitle>Confirm Remove All</DialogTitle>
                <DialogContent>Are you sure you want to remove all items from your cart?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmRemoveAllDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmAndRemoveAll} color="secondary">
                        Remove All
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Single Item Deletion */}
            <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to remove this item from your cart?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmAndRemoveItem} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// CSS Animations
const styles = `
@keyframes popIn {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}
@keyframes slideOut {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -150%);
    }
}
`;
// Inject CSS into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default CartPage;