const QRCode = require('qrcode');
const QrCode = require('./models/QrCode');
const path = require('path');
const fs = require('fs').promises;

// QR code generation function
async function generateQrCode(eventDetails, apiBaseUrl = 'https://qr-marketer.onrender.com') {
    const encodedDetails = encodeURIComponent(eventDetails);
    const fullApiUrl = `${apiBaseUrl}/generate_tweet?details=${encodedDetails}`;
    
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(fullApiUrl, {
        errorCorrectionLevel: 'L',
        margin: 4,
        width: 400
    });

    return qrCodeDataUrl;
}

// Setup API routes
const setupQrRoutes = (app) => {
    // Create QR code
    app.post('/api/qr', async (req, res) => {
        try {
            const { eventDetails, eventStartTime, eventEndTime, isActive } = req.body;
            
            // Validate required fields
            if (!eventDetails || !eventStartTime || !eventEndTime) {
                return res.status(400).json({ 
                    error: 'Missing required fields',
                    required: ['eventDetails', 'eventStartTime', 'eventEndTime']
                });
            }

            // Generate QR code with explicit deployed URL
            const qrCodeDataUrl = await generateQrCode(eventDetails, 'https://qr-marketer.onrender.com');

            // Save to database with new fields
            const qrCode = new QrCode({
                eventDetails,
                eventStartTime: new Date(eventStartTime),
                eventEndTime: new Date(eventEndTime),
                isActive: isActive !== undefined ? isActive : true,
                qrCodeUrl: qrCodeDataUrl
            });
            await qrCode.save();

            res.json({
                success: true,
                data: {
                    qrCode: qrCodeDataUrl,
                    id: qrCode._id,
                    eventStartTime: qrCode.eventStartTime,
                    eventEndTime: qrCode.eventEndTime,
                    isActive: qrCode.isActive
                }
            });

        } catch (error) {
            console.error('Error generating QR code:', error);
            res.status(500).json({ 
                error: 'Failed to generate QR code',
                details: error.message 
            });
        }
    });

    // Add a new route to update QR code status
    app.patch('/api/qr/:id/status', async (req, res) => {
        try {
            const { isActive } = req.body;
            if (typeof isActive !== 'boolean') {
                return res.status(400).json({ error: 'isActive must be a boolean' });
            }

            const qrCode = await QrCode.findByIdAndUpdate(
                req.params.id,
                { isActive },
                { new: true }
            );

            if (!qrCode) {
                return res.status(404).json({ error: 'QR code not found' });
            }

            res.json({ success: true, data: qrCode });
        } catch (error) {
            res.status(500).json({ 
                error: 'Failed to update QR code status',
                details: error.message 
            });
        }
    });

    // Get all QR codes
    app.get('/api/qr', async (req, res) => {
        try {
            const qrCodes = await QrCode.find().sort({ createdAt: -1 });
            res.json({ success: true, data: qrCodes });
        } catch (error) {
            res.status(500).json({ 
                error: 'Failed to fetch QR codes',
                details: error.message 
            });
        }
    });

    // Get specific QR code by ID
    app.get('/api/qr/:id', async (req, res) => {
        try {
            const qrCode = await QrCode.findById(req.params.id);
            if (!qrCode) {
                return res.status(404).json({ error: 'QR code not found' });
            }
            res.json({ success: true, data: qrCode });
        } catch (error) {
            res.status(500).json({ 
                error: 'Failed to fetch QR code',
                details: error.message 
            });
        }
    });
};

module.exports = setupQrRoutes;