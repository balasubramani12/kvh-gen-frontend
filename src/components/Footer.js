import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Link as MuiLink,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#62825D', // Deep purple color
                color: '#fff',
                padding: '10px 20px',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                zIndex: 1000,
            }}
        >
            {/* Left Section: Social Media Links */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: { xs: '10px', sm: 0 }, // Add margin for stacking on small screens
                }}
            >
                <Typography variant="body2" sx={{ marginRight: '10px' }}>
                    Follow us:
                </Typography>
                <IconButton
                    component={MuiLink}
                    href="https://www.facebook.com/hbalasubramani.shetty"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: '#fff',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    aria-label="Follow us on Facebook"
                >
                    <FacebookIcon />
                </IconButton>
                <IconButton
                    component={MuiLink}
                    href="https://www.instagram.com/kvhgenstore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: '#fff',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    aria-label="Follow us on Instagram"
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    component={MuiLink}
                    href="https://x.com/BaluHarishankar?t=Pis18Yllc9irnbqAhlgMxA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: '#fff',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    aria-label="Follow us on Twitter"
                >
                    <TwitterIcon />
                </IconButton>
            </Box>

            {/* Center Section: Copyright Text */}
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'center',
                    marginBottom: { xs: '10px', sm: 0 }, // Add margin for stacking on small screens
                }}
            >
                © {new Date().getFullYear()} KVH General Store. All rights reserved.
            </Typography>

            {/* Right Section: Contact Info */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-end' }, // Center align on small screens
                }}
            >
                <IconButton
                    component={MuiLink}
                    href="mailto:contact.kvhgenstore@gmail.com"
                    sx={{
                        color: '#fff',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}
                    aria-label="Send an email to KVH General Store"
                >
                    <EmailIcon />
                </IconButton>
                <Typography variant="body2">
                    contact.kvhgenstore@gmail.com
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;