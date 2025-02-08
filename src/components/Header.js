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
    useMediaQuery,
    useTheme,
} from '@mui/material';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [logoutNotification, setLogoutNotification] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getUserIdFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser._id || user;
        } catch (error) {
            return user;
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('loginEvent');
        setLogoutNotification(true);
        setTimeout(() => {
            setLogoutNotification(false);
        }, 3000);
        window.location.reload();
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('user');
    const userId = isLoggedIn ? getUserIdFromLocalStorage() : null;

    React.useEffect(() => {
        const handleStorageChange = () => {
            window.location.reload();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AppBar
            position="sticky"
            style={{
                background: '#526E48',
                top: 0,
                zIndex: 1000,
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    style={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}
                >
                    KVH General Store
                </Typography>

                {/* Desktop Navbar */}
                {!isMobile && (
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
                )}

                {/* Mobile Hamburger Menu */}
                {isMobile && (
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

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