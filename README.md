# QR-Marketer

A modern web application for creating and managing event-based QR codes with automatic tweet generation capabilities.

## Features

- **Event QR Code Generation**: Create QR codes for events with detailed information
- **Smart Tweet Generation**: AI-powered tweet generation based on event context and timing
- **Dynamic QR Management**: Activate/deactivate QR codes as needed
- **Real-time Status**: Track active and inactive QR codes
- **Time-aware Tweets**: Different tweet styles based on event timing (upcoming, ongoing, or past events)
- **IST Time Zone Support**: All event times are handled in Indian Standard Time (Facing some issues in this cuz of default browser selectors)
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Google's Gemini AI
- QR Code Generation API

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/QR-Marketer.git
cd QR-Marketer
```

# Install backend dependencies
```bash
cd backend
npm install
```

# Install frontend dependencies
```bash
cd ../client
npm install
```

# In backend/.env
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

# Start backend server
```bash
cd backend
npm start
```

# Start frontend development server
```bash
cd ../client
npm start
```
