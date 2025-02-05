import React from 'react';
import {
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    CardMedia,
} from '@mui/material';
import FeedbackQRCode from '../assets/feedback.svg'; // Adjust the path to your SVG file

const ContactPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            {/* Store Details Section */}
            <Card style={{ marginBottom: '20px', padding: '15px' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        🏪 KVH General Store
                    </Typography>
                    <Typography variant="body1">
                        📞 <strong>Phone:</strong> 9441451185, 9949922505, 7981892081
                    </Typography>
                    <Typography variant="body1">
                        ✉️ <strong>Email:</strong>{' '}
                        <a href="mailto:contact.kvhgenstore@gmail.com" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            contact.kvhgenstore@gmail.com
                        </a>
                    </Typography>
                    <Typography variant="body1">
                        📸 <strong>Instagram:</strong>{' '}
                        <a href="https://www.instagram.com/kvhgenstore" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            @kvhgenstore
                        </a>
                    </Typography>
                    <Typography variant="body1">
                        📍 <strong>Address:</strong> RS Kras, KGF Main Road, Gudupalle, Ontipalle, Andhra Pradesh 517426
                    </Typography>
                </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        🗳️ Share Your Feedback
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We value your feedback! 😊 Please take a moment to share your thoughts with us using the link below or by scanning the QR code.
                    </Typography>

                    {/* Google Form Link */}
                    <Button
                        variant="contained"
                        color="primary"
                        href="https://forms.gle/1LLEectX2p36uE11A"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginBottom: '15px' }}
                    >
                        Open Feedback Form 📝
                    </Button>

                    {/* QR Code Image */}
                    <CardMedia
                        component="img"
                        alt="Feedback QR Code"
                        src={FeedbackQRCode} // Path to your SVG file
                        title="Scan to open feedback form"
                        style={{
                            width: '100%', // Ensure the image fits within the container
                            height: 'auto', // Maintain aspect ratio
                            maxWidth: '300px', // Limit the maximum width for better visibility
                            margin: '0 auto', // Center the image horizontally
                            display: 'block', // Remove any extra space below the image
                            cursor: 'pointer',
                        }}
                        onClick={() => window.open('https://forms.gle/1LLEectX2p36uE11A', '_blank')}
                    />
                </CardContent>
            </Card>
        </Container>
    );
};

export default ContactPage;