const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();
const setupQrRoutes = require('./qrMaker');
const QrCode = require('./models/QrCode');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/generate_tweet', async (req, res) => {
    try {
        const eventDetails = req.query.details;
        
        if (!eventDetails) {
            return res.status(400).json({ error: 'Missing event details' });
        }

        // Find the QR code in database
        const qrCode = await QrCode.findOne({ eventDetails });
        if (!qrCode) {
            return res.status(404).json({ error: 'QR code not found' });
        }

        if (!qrCode.isActive) {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('This event is no longer active.')}`;
            return res.redirect(twitterUrl);
        }

        // Get current time in IST
        const now = new Date();
        const eventStart = new Date(qrCode.eventStartTime);
        const eventEnd = new Date(qrCode.eventEndTime);

        // Calculate time remaining
        const minutesToEnd = Math.floor((eventEnd - now) / (1000 * 60));
        const minutesFromStart = Math.floor((now - eventStart) / (1000 * 60));

        // Prepare AI prompt based on timing
        let timeContext = "";
        if (now < eventStart) {
            timeContext = "Generate an excited tweet about looking forward to this upcoming event. ";
        } else if (now > eventEnd) {
            timeContext = "Generate a reflective tweet about how amazing this past event was. Include what was most valuable. ";
        } else {
            if (minutesToEnd <= 30) {
                timeContext = "Generate a tweet about the amazing ongoing event that's nearing its end. Mention key takeaways. ";
            } else {
                timeContext = "Generate an enthusiastic tweet about currently attending this exciting event. ";
            }
        }

        const prompt = `${timeContext}Use these event details for context:\n${eventDetails}\n\nMake it engaging and include relevant hashtags. IMPORTANT: Keep the tweet STRICTLY under 260 characters.\n\nTweet:`;
        
        const result = await model.generateContent(prompt);
        const tweet = result.response.text().trim();

        // Ensure tweet doesn't exceed 260 characters
        const finalTweet = tweet.length > 260 ? tweet.substring(0, 257) + "..." : tweet;

        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(finalTweet)}`;
        res.redirect(twitterUrl);

    } catch (error) {
        console.error('Error generating tweet:', error);
        res.status(500).json({ 
            error: 'Failed to generate tweet',
            details: error.message 
        });
    }
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        details: err.message 
    });
});

// Add QR routes
setupQrRoutes(app);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err);
    process.exit(1);
});