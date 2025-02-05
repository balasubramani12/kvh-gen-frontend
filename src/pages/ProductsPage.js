import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Success tick icon
import { CartContext } from '../context/CartContext';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = React.useContext(CartContext); // Use CartContext
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State for login prompt

    // Array of funny messages
    const funnyMessages = [
        "Woohoo! That's in your cart now!",
        "You just made this product happy!",
        "Great choice! This one's a keeper!",
        "Added to cart like a pro!",
        "This product is officially yours (almost)!",
        "Boom! Cart just got better!",
        "Your cart is growing... like a boss!",
        "Who needs a wishlist? You’ve got a cart!",
        "That’s one step closer to checkout!",
        "Shopping therapy at its finest!",
    ];

    const loginPromptMessages = [
        "Oops! Looks like you need to log in first!",
        "Hey there! Log in to add this gem to your cart!",
        "Hold on! You need to log in before shopping!",
        "Log in to make this product yours!",
        "Almost there! Just log in to continue!",
    ];
    const categories = [
        'Pooja & Religious',
        'Essentials',
        'Spices & Masala',
        'Personal & Beauty Care',
        'Kids & Baby Care',
        'Household & Kitchen Essentials',
        'Snacks',
        'Miscellaneous',
    ];

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/all');
                setProducts(response.data);
                setFilteredProducts(response.data); // Initially show all products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Filter products by selected category (case-insensitive)
    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter((product) =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Show all products if no category is selected
        }
    }, [selectedCategory, products]);

    // Handle search input dynamically
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.brand.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };

    // Open dialog to add product to cart
    const handleAddToCart = (product) => {
        const userId = localStorage.getItem('user'); // Check if user is logged in
        if (!userId) {
            setShowLoginPrompt(true); // Show login prompt
            setTimeout(() => {
                setShowLoginPrompt(false);
            }, 2000); // Hide prompt after 2 seconds
            return;
        }

        setSelectedProduct(product);
        setQuantity(1); // Reset quantity to 1 when the dialog opens
        setOpenDialog(true);
    };

    // Add product to cart with quantity
    const handleConfirmAddToCart = async () => {
        try {
            await addToCart(selectedProduct._id, quantity);
            setOpenDialog(false);
            setQuantity(1);
            setShowSuccessAnimation(true);
            setTimeout(() => {
                setShowSuccessAnimation(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', position: 'relative' }}>
            {/* Login Prompt Animation */}
            {showLoginPrompt && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: getRandomColor(),
                        color: '#fff',
                        padding: '15px 30px',
                        borderRadius: '10px',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        animation: 'popIn 0.5s ease-in-out, slideOut 0.5s ease-in-out 2s forwards',
                    }}
                >
                    <span role="img" aria-label="login-emoji">
                        😊
                    </span>
                    <Typography variant="body1">
                        {loginPromptMessages[Math.floor(Math.random() * loginPromptMessages.length)]}
                    </Typography>
                </div>
            )}

            {/* Success Animation */}
            {showSuccessAnimation && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: getRandomColor(),
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
                    <Typography variant="body1">
                        {funnyMessages[Math.floor(Math.random() * funnyMessages.length)]}
                    </Typography>
                </div>
            )}

            {/* Search Bar with Search Icon */}
            <TextField
                label="Search Products"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                fullWidth
                margin="normal"
            />

            {/* Category Buttons */}
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginBottom: '20px',
                    justifyContent: 'center',
                }}
            >
                {/* "All" Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedCategory(null)}
                    style={{
                        backgroundColor: '#54473F',
                        color: '#ffff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            backgroundColor: '#e65100',
                        },
                    }}
                >
                    All
                </Button>

                {/* Category Buttons */}
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        variant={selectedCategory === category ? 'contained' : 'outlined'}
                        color={selectedCategory === category ? 'secondary' : 'primary'}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                            backgroundColor:
                                selectedCategory === category ? '#526E48' : 'transparent',
                            color: selectedCategory === category ? '#ffff' : '#54473F',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: '1px solid #526E48',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                backgroundColor: selectedCategory === category ? '#e65100' : '#ffe0b2',
                            },
                        }}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Product Cards */}
            <Grid container spacing={3}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                            {/* Product Card */}
                            <Card
                                style={{
                                    backgroundColor: '#F2EED7',
                                    color: '#000',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {/* Product Image */}
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.img || 'https://via.placeholder.com/500'}
                                    alt={product.name || 'Product'}
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '140px',
                                    }}
                                />

                                {/* Product Details */}
                                <CardContent style={{ flexGrow: 1, padding: '10px' }}>
                                    <Typography variant="h6" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        {product.name || 'N/A'}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontSize: '0.875rem' }}>
                                        Brand: {product.brand || 'N/A'}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontSize: '0.875rem' }}>
                                        Qty: {product.qty}
                                    </Typography>
                                </CardContent>

                                {/* Add to Cart Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                    style={{ margin: '10px', backgroundColor: '#54473F' }}
                                >
                                    Add to Cart
                                </Button>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
                        No products found.
                    </Typography>
                )}
            </Grid>

            {/* Dialog for Adding Quantity */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add to Cart</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setQuantity(isNaN(value) ? '' : value);
                        }}
                        onBlur={() => setQuantity((prev) => (prev === '' ? 1 : prev))}
                        fullWidth
                        margin="normal"
                        inputProps={{ step: '0.01', min: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmAddToCart} color="primary" variant="contained">
                        Add to Cart
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
        transform: translate(-50%, -50%) scale(0.8) rotate(-30deg);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
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

export default ProductsPage;