import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Contact from './pages/ContactPage';
function App() {
    return (
        <CartProvider>
            <Router>
                <Header />
                {/* Flex container to push footer to the bottom */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh', // Ensure the container takes up full viewport height
                    }}
                >
                    {/* Main Content */}
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1, // Pushes the footer to the bottom
                            padding: '20px', // Add padding for spacing
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/contact" element={<Contact/>} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </Box>

                    {/* Footer */}
                    <Footer />
                </Box>
            </Router>
        </CartProvider>
    );
}

export default App;