import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Select, MenuItem } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({ product }) => {
    const [selectedQty, setSelectedQty] = useState('');

    // Split qty string into options
    const qtyOptions = product.qty.split(',').map(option => option.trim());

    const handleAddToCart = () => {
        if (!selectedQty) {
            alert('Please select a quantity!');
            return;
        }

        // Add to cart logic (you can integrate this with your backend API later)
        console.log('Added to cart:', { ...product, quantity: selectedQty });
    };

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Product Image */}
            <CardMedia
                component="img"
                height="140"
                image={product.img}
                alt={product.name}
                style={{ objectFit: 'cover' }}
            />

            {/* Product Details */}
            <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Brand: {product.brand}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Price: ₹{product.price}
                </Typography>

                {/* Quantity Selector */}
                <Select
                    value={selectedQty}
                    onChange={(e) => setSelectedQty(e.target.value)}
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: '10px' }}
                >
                    <MenuItem value="" disabled>Select Quantity</MenuItem>
                    {qtyOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </CardContent>

            {/* Add to Cart Button */}
            <Button
                variant="contained"
                color="success"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
                style={{ margin: '10px' }}
            >
                Add to Cart
            </Button>
        </Card>
    );
};

export default ProductCard;