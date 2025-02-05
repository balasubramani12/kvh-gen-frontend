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
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                zIndex: 1000,
            }}
        >
            {/* Left Section: Social Media Links */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: '10px' }}>
                    Follow us:
                </Typography>
                <IconButton
                    component={MuiLink}
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: '#fff' }}
                >
                    <FacebookIcon />
                </IconButton>
                <IconButton
                    component={MuiLink}
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: '#fff' }}
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    component={MuiLink}
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: '#fff' }}
                >
                    <TwitterIcon />
                </IconButton>
            </Box>

            {/* Center Section: Copyright Text */}
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                © {new Date().getFullYear()} KVH General Store. All rights reserved.
            </Typography>

            {/* Right Section: Contact Info */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    component={MuiLink}
                    href="mailto:contact.kvhgenstore@gmail.com"
                    sx={{ color: '#fff' }}
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