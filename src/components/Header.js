import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
} from '@mui/material';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [logoutNotification, setLogoutNotification] = React.useState(false); // State for logout notification
    const navigate = useNavigate();

    // Helper function to safely retrieve the user from localStorage
    const getUserIdFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        try {
            const parsedUser = JSON.parse(user); // Try parsing as JSON
            return parsedUser._id || user; // Return _id if parsed, else return raw value
        } catch (error) {
            return user; // If parsing fails, assume it's already a string
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user from localStorage
        localStorage.removeItem('loginEvent'); // Clear login event

        // Show logout notification
        setLogoutNotification(true);

        // Hide the notification after 3 seconds
        setTimeout(() => {
            setLogoutNotification(false);
        }, 3000); // Increased duration to 3 seconds

        window.location.reload(); // Refresh the page to reflect logout
        navigate('/login'); // Redirect to login page
    };

    const isLoggedIn = !!localStorage.getItem('user');
    const userId = isLoggedIn ? getUserIdFromLocalStorage() : null;

    // Detect login/logout changes via storage events
    React.useEffect(() => {
        const handleStorageChange = () => {
            // If the user logs in or out, refresh the page
            window.location.reload();
        };

        // Listen for storage events
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AppBar
            position="sticky" // Make the header sticky
            style={{
                background: '#526E48',
                top: 0, // Ensure it sticks to the top
                zIndex: 1000, // Ensure it stays above other content
            }}
        >
            <Toolbar>
                {/* Store Name */}
                <Typography
                    variant="h6"
                    style={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}
                >
                    KVH General Store
                </Typography>

                {/* Desktop Navbar */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                        Home
                    </Link>
                    <Link to="/products" style={{ textDecoration: 'none', color: '#fff' }}>
                        Products
                    </Link>
                    <Link to="/cart" style={{ textDecoration: 'none', color: '#fff' }}>
                        Cart
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>
                        Contact
                    </Link>
                    {isLoggedIn ? (
                        <button
                            style={{
                                color: '#fff',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger Menu */}
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <List>
                        <ListItem button onClick={() => { navigate('/'); toggleDrawer(false)(); }}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate('/products'); toggleDrawer(false)(); }}>
                            <ListItemText primary="Products" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate('/cart'); toggleDrawer(false)(); }}>
                            <ListItemText primary="Cart" />
                        </ListItem>
                        <ListItem button onClick={() => { navigate('/contact'); toggleDrawer(false)(); }}>
                            <ListItemText primary="Contact" />
                        </ListItem>
                        {isLoggedIn ? (
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        ) : (
                            <ListItem button onClick={() => { navigate('/login'); toggleDrawer(false)(); }}>
                                <ListItemText primary="Login" />
                            </ListItem>
                        )}
                    </List>
                </Drawer>
            </Toolbar>

            {/* Centered Logout Notification */}
            {logoutNotification && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'red',
                        color: '#fff',
                        padding: '20px 40px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        zIndex: 2000,
                        animation: 'fadeInOut 0.5s ease-in-out',
                    }}
                >
                    Logged out successfully!
                </Box>
            )}
        </AppBar>
    );
};

// CSS Animations
const styles = `
@keyframes fadeInOut {
    0% {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    10% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    90% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -40%);
    }
}
`;
// Inject CSS into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Header;