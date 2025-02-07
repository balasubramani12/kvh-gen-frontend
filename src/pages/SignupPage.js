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
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const SignupPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState(''); // State for mobile number
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

        // Validate password and confirm password
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate mobile number (optional: basic validation)
        if (!/^\d{10}$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        try {
            // Call the backend signup API
            await axios.post(`${backendUrl}/api/users/signup`, {
                name,
                mobile, // Include mobile number in the request payload
                username,
                pwd: password,
                role: 'user',
            });

            // Redirect to Login page
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data.message === 'User already exists') {
                setError('Username already exists');
            } else {
                setError('An error occurred. Please try again.');
            }
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
                    Sign Up
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {/* Full Name Field */}
                    <TextField
                        fullWidth
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    {/* Mobile Number Field */}
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        margin="normal"
                        required
                        inputProps={{ maxLength: 10 }} // Limit input to 10 digits
                        helperText="Enter a 10-digit mobile number"
                    />
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
                    {/* Confirm Password Field */}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
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
                        Sign Up
                    </Button>
                </form>
                {/* Login Link */}
                <Typography variant="body2" style={{ marginTop: '15px' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#526E48', textDecoration: 'none' }}>
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignupPage;