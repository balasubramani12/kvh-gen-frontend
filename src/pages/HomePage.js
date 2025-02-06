import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

const HomePage = () => {
  // Check if the user is logged in (you can use local storage or context API)
  const isLoggedIn = localStorage.getItem('user') ? true : false;

  return (
    <div style={styles.container}>
      {/* Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={styles.title}
      >
        {isLoggedIn ? 'Welcome Back!' : 'Welcome to KVH General Store!'}
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={styles.subtitle}
      >
        {isLoggedIn
          ? 'Ready to shop? Explore our amazing products.'
          : 'Start shopping now and discover the best deals.'}
      </motion.p>

      {/* Button Animation */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Link to="/products">
          <button style={styles.button}>Start Shopping</button>
        </Link>
      </motion.div>

      {/* Additional Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={styles.additionalContent}
      >
        <h2 style={styles.contentTitle}>Why Choose Us?</h2>
        <p style={styles.contentDescription}>
          At KVH General Store, we offer high-quality products at unbeatable prices. Our mission is to provide you with a seamless shopping experience.
        </p>
        <ul style={styles.list}>
          <li>Wide range of products</li>
          <li>Fast and reliable delivery</li>
          <li>24/7 customer support</li>
          <li>Exclusive discounts and offers</li>
        </ul>
      </motion.div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    minHeight: '80vh',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#3E7B27', // Greenish color
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#555',
    marginBottom: '40px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1rem',
    backgroundColor: '#3E7B27', // Greenish color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2ECC71', // Lighter green on hover
    },
  },
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
    color: '#3498DB', // Blue color
    marginBottom: '10px',
  },
  contentDescription: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  list: {
    paddingLeft: '20px',
    fontSize: '1rem',
    color: '#555',
  },
};

export default HomePage;