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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

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
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

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

            // Add timestamp at the bottom
            const date = new Date().toLocaleString();
            doc.setTextColor(0, 0, 255); // Blue color for timestamp
            doc.text(`Downloaded on: ${date}`, 10, 40 + (cartItems.length * 10) + 10);

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
        <div style={{ padding: '20px', position: 'relative' }}>
            {/* Refresh Cart Button */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>
                    Sorry for the inconvenience! If you are facing any issues in the cart, please press the button below:
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

            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            {cartItems.length > 0 ? (
                <Grid container spacing={3}>
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
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                {/* Product Card */}
                                <Card
                                    style={{
                                        backgroundColor: '#E9EED9',
                                        color: '#000',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Product Image */}
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.product?.img || 'https://via.placeholder.com/500'}
                                        alt={item.product?.name || 'Product'}
                                        style={{
                                            objectFit: 'contain',
                                            width: '100%',
                                            height: '140px',
                                        }}
                                    />

                                    {/* Product Details */}
                                    <CardContent style={{ flexGrow: 1, padding: '10px' }}>
                                        <Typography variant="h6" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            {item.product?.name || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" style={{ fontSize: '0.875rem' }}>
                                            Brand: {item.product?.brand || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" style={{ fontSize: '0.875rem' }}>
                                            Qty: {item.quantity}
                                        </Typography>
                                    </CardContent>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                        {/* Update Quantity Field */}
                                        <TextField
                                            type="number"
                                            value={localQuantities[productId] || item.quantity}
                                            onChange={handleQuantityChange}
                                            onBlur={() =>
                                                setLocalQuantities((prev) => ({
                                                    ...prev,
                                                    [productId]: prev[productId] || item.quantity,
                                                }))
                                            }
                                            inputProps={{ min: 1 }}
                                            style={{
                                                flexGrow: 1,
                                                fontSize: '0.875rem',
                                                backgroundColor: '#9A7E6F',
                                                border: 'none none rgb(140, 107, 89)',
                                                borderRadius: '10px',
                                                padding: '5px',
                                            }}
                                        />
                                        {/* Tick Button */}
                                        <IconButton onClick={handleUpdateQuantity} style={{ marginLeft: '10px' }}>
                                            <CheckCircleIcon style={{ color: '#4CAF50' }} />
                                        </IconButton>
                                        {/* Remove Button */}
                                        <IconButton
                                            onClick={() => handleRemoveItem(productId)}
                                            style={{ marginLeft: '10px', color: '#FF5722' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
                    Your cart is empty.
                </Typography>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                {/* Remove All Button */}
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemoveAll}
                    disabled={cartItems.length === 0}
                >
                    Remove All
                </Button>
                {/* Continue Shopping Button */}
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/products"
                >
                    Continue Shopping
                </Button>
                {/* Download Cart as PDF Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadCartAsPDF}
                    disabled={cartItems.length === 0}
                >
                    Download Cart as PDF
                </Button>
            </div>

            {/* Confirmation Dialog for Remove All */}
            <Dialog open={confirmRemoveAllDialogOpen} onClose={() => setConfirmRemoveAllDialogOpen(false)}>
                <DialogTitle>Confirm Remove All</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to remove all items from your cart?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmRemoveAllDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmAndRemoveAll} color="error" variant="contained">
                        Remove All
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Single Item Deletion */}
            <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to remove this item from your cart?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmAndRemoveItem} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
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