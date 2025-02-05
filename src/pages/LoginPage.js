import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [userCaptcha, setUserCaptcha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Generate a simple math-based captcha
    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        setCaptcha(`${num1} + ${num2}`);
        // Store the correct answer in localStorage for validation
        localStorage.setItem('captchaAnswer', num1 + num2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate captcha
        const captchaAnswer = parseInt(localStorage.getItem('captchaAnswer'), 10);
        if (parseInt(userCaptcha, 10) !== captchaAnswer) {
            setError('Invalid captcha');
            generateCaptcha(); // Regenerate captcha
            return;
        }

        try {
            // Call the backend login API
            const response = await axios.post('http://localhost:5000/api/users/login', {
                username,
                pwd: password,
            });

            // Save ONLY the user ID in localStorage
            localStorage.setItem('user', response.data.user._id);

            // Trigger a storage event to notify other tabs/components
            localStorage.setItem('loginEvent', Date.now());

            // Redirect to Dashboard page
            navigate('/dashboard');
            window.location.reload();
        } catch (error) {
            setError('Invalid username or password');
            generateCaptcha(); // Regenerate captcha
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                {error && <Typography color="error">{error}</Typography>}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {/* Username Field */}
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                    />

                    {/* Password Field */}
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            ),
                        }}
                    />

                    {/* Captcha Field */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                        <Typography variant="body1">{captcha} =</Typography>
                        <TextField
                            label="Enter Captcha"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            required
                            style={{ flex: 1 }}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{ marginTop: '20px', backgroundColor: '#526E48', color: '#fff' }}
                    >
                        Login
                    </Button>
                </form>

                {/* Signup Link */}
                <Typography variant="body2" style={{ marginTop: '15px' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#526E48', textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;