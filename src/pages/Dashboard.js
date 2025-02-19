import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion'; // For animations

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
        const response = await axios.get(`${backendUrl}/api/users/${userId}`);
        setUserName(response.data.name); // Store the user's name in state
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  // Step data with icons (emojis or SVGs)
  const steps = [
    {
      title: 'Sign Up or Log In',
      description: 'Create an account or log in to start shopping.',
      icon: '🚀',
    },
    {
      title: 'Browse Products',
      description: 'Explore our wide range of products and add them to your cart.',
      icon: '🛒',
    },
    {
      title: 'Download Cart as PDF',
      description: 'Download your cart details as a PDF file.',
      icon: '📄',
    },
    {
      title: 'Send via WhatsApp',
      description: 'Share the PDF with us through WhatsApp.',
      icon: '📲',
    },
    {
      title: 'Confirm Your Order',
      description: 'Give us a quick call to confirm your order.',
      icon: '📞',
    },
    {
      title: 'Pick Up Your Order',
      description:
        'We’ll notify you when your order is ready—just drop by and pick it up!',
      icon: '📢',
    },
  ];

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
            {userName}
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

      {/* Steps Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            marginTop: '50px',
            marginBottom: '30px',
            color: '#4C7B8B',
            fontWeight: 'bold',
          }}
        >
          Effortless Shopping with Our Smart Cart!
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Card
                  sx={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '15px',
                    padding: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', padding: '10px' }}>
                    {/* Step Number */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#3E7B27',
                        marginBottom: '10px',
                      }}
                    >
                      Step {index + 1}
                    </Typography>

                    {/* Icon */}
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.5rem',
                        color: '#3E7B27',
                        marginBottom: '10px',
                      }}
                    >
                      {step.icon}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold',
                        color: '#555',
                        marginBottom: '5px',
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" sx={{ color: '#777' }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Additional Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={styles.additionalContent}
      >
        <Typography variant="h5" sx={styles.contentTitle}>
          For Better Experience
        </Typography>
        <ul style={styles.list}>
          <li>Click on the three dots in the top-right corner.</li>
          <li>Select and mark the option "Desktop Site" by ticking it.</li>
        </ul>
        <Typography variant="body1" sx={styles.contentDescription}>
          At KVH General Store, we offer high-quality products at unbeatable prices. Our mission is to provide you with a seamless shopping experience.
        </Typography>
      </motion.div>
    </Container>
  );
};

// Styles
const styles = {
  additionalContent: {
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'left',
  },
  contentTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#B82132', // Blue color
    marginBottom: '10px',
  },
  list: {
    paddingLeft: '20px',
    fontSize: '1rem',
    color: '#555',
  },
  contentDescription: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
};

export default Dashboard;