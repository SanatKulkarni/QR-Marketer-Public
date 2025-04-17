import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQrCodes();
  }, []);

  const fetchQrCodes = async () => {
    try {
      const response = await fetch('https://qr-marketer.onrender.com/api/qr', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched QR codes:', data);
      
      if (data.success) {
        setQrCodes(data.data);
      } else {
        setError(`API Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      setError(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading QR Codes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Your QR Codes</h2>
          <p className="text-gray-400">No QR codes found. Create your first one!</p>
          <Link
            to="/create"
            className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
          >
            Create QR Code
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return "Invalid Date";
      
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Error formatting date";
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Your QR Codes</h2>
          <Link
            to="/create"
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
          >
            Create New
          </Link>
        </div>
        <div className="space-y-6">
          {qrCodes.map((qr) => (
            <div
              key={qr._id}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-white mb-4">Event</h3>
                  <div className="bg-[#252525] p-4 rounded-lg mb-4">
                    <p className="text-white text-lg whitespace-pre-wrap">
                      {qr.eventDetails || "No event details available"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#252525] p-4 rounded-lg">
                      <p className="text-sm font-semibold text-blue-300 mb-1">Starts</p>
                      <p className="text-white text-lg font-medium">
                        {formatDate(qr.eventStartTime)}
                      </p>
                    </div>
                    <div className="bg-[#252525] p-4 rounded-lg">
                      <p className="text-sm font-semibold text-blue-300 mb-1">Ends</p>
                      <p className="text-white text-lg font-medium">
                        {formatDate(qr.eventEndTime)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#252525] p-4 rounded-lg text-center">
                    <span className={`text-sm font-bold ${qr.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {qr.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <p className="text-sm text-gray-300 mt-2 font-medium">
                      Created: {formatDate(qr.createdAt)?.split(',')[0] || "N/A"}
                    </p>
                  </div>
                  <Link
                    to={`/qr/${qr._id}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-semibold"
                  >
                    Manage Event
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;