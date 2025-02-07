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
        <h2 style={styles.contentTitle2}>Effortless Shopping with Our Smart Cart!</h2>

        <ul style={styles.list}>
          <li>🚀 <strong>Step 1:</strong> Sign up or log in to our website.</li>
          <li>🛒 <strong>Step 2:</strong> Browse and add products to your cart.</li>
          <li>📄 <strong>Step 3:</strong> Download your cart as a PDF with one click.</li>
          <li>📲 <strong>Step 4:</strong> Send the PDF to us via WhatsApp.</li>
          <li>📞 <strong>Step 5:</strong> Give us a quick call to confirm your order.</li>
          <li>📢 <strong>Step 6:</strong> We’ll notify you when your order is ready—just drop by and pick it up. 
            No hassle, no wait!
          </li>
        </ul>

        <p style={styles.contentDescription}>
          💡 <strong>KVH General Store – Making Shopping Fast, Easy, and Hassle-Free!</strong>
        </p>

        <p>✨ "Want the <strong>Best</strong>? Skip the <strong>Rest!</strong>" ✨</p>
      </motion.div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={styles.additionalContent}
      >
        <h2 style={styles.contentTitle}>For Better Experience</h2>
        
        <ul style={styles.list}>
          <li>Click on the three dots in the top-right corner.</li>
          <li>Select and mark the option "Desktop Site" by ticking it.</li>
        </ul>
        <p style={styles.contentDescription}>
          At KVH General Store, we offer high-quality products at unbeatable prices. Our mission is to provide you with a seamless shopping experience.
        </p>
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
    color: '#B82132', // Blue color
    marginBottom: '10px',
  },
  contentTitle2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4C7B8B', // Blue color
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