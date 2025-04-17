const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    eventDetails: {
        type: String,
        required: true
    },
    eventStartTime: {
        type: Date,
        required: true,
        get: v => v ? new Date(v.getTime() + (5.5 * 60 * 60 * 1000)) : v, // Convert to IST
        set: v => v ? new Date(new Date(v).getTime() - (5.5 * 60 * 60 * 1000)) : v // Store in UTC
    },
    eventEndTime: {
        type: Date,
        required: true,
        get: v => v ? new Date(v.getTime() + (5.5 * 60 * 60 * 1000)) : v, // Convert to IST
        set: v => v ? new Date(new Date(v).getTime() - (5.5 * 60 * 60 * 1000)) : v // Store in UTC
    },
    isActive: {
        type: Boolean,
        default: true
    },
    qrCodeUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: v => v ? new Date(v.getTime() + (5.5 * 60 * 60 * 1000)) : v // Convert to IST
    }
});

qrCodeSchema.set('toJSON', { getters: true });
qrCodeSchema.set('toObject', { getters: true });

module.exports = mongoose.model('QrCode', qrCodeSchema);