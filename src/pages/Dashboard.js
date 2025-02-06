import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion'; // For animations

const Dashboard = () => {
  const [userName, setUserName] = useState(null); // State to store the user's name

  // Helper function to safely retrieve the user ID from localStorage
  const getUserIdFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    try {
      const parsedUser = JSON.parse(user); // Try parsing as JSON
      return parsedUser._id || user; // Return _id if parsed, else return raw value
    } catch (error) {
      return user; // If parsing fails, assume it's already a string
    }
  };

  const userId = getUserIdFromLocalStorage();

  // Fetch user details (name) from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }
        // Fetch user details from the backend
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserName(response.data.name); // Store the user's name in state
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      {/* Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back!{' '}
          <span style={{ color: '#FF5722', fontWeight: 'bold' }}>
            {userName || 'Guest'}
          </span>
        </Typography>
      </motion.div>

      {/* Subtitle Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <Typography variant="body1" gutterBottom>
          Ready to shop? Click below to get started.
        </Typography>
      </motion.div>

      {/* Button Animation */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Link to="/products">
          <Button
            variant="contained"
            style={{
              marginTop: '20px',
              backgroundColor: '#54473F',
              color: '#fff',
              padding: '10px 20px',
              fontSize: '1rem',
            }}
          >
            Start Shopping
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
};

export default Dashboard;