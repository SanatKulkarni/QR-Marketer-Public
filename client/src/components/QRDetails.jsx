import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const QRDetails = () => {
  const { id } = useParams();
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQrDetails();
  }, [id]);

  const fetchQrDetails = async () => {
    try {
      const response = await fetch(`https://qr-marketer.onrender.com/api/qr/${id}`);
      const data = await response.json();
      setQrCode(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching QR details:', error);
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    try {
      const response = await fetch(`https://qr-marketer.onrender.com/api/qr/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !qrCode.isActive }),
      });
      const data = await response.json();
      setQrCode(data.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131313] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-lg p-8 border border-gray-800"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Event Details</h2>
            <div className="space-y-4">
              {/* Updated Description Section */}
              <div className="bg-[#252525] p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-300 mb-3">Full Event Description</h3>
                <div className="text-gray-100 whitespace-pre-wrap space-y-3">
                  {qrCode.eventDetails.split('\n').map((line, index) => (
                    <p key={index} className="flex items-start text-base">
                      <span className="mr-2">•</span>
                      {line.split(':').map((part, i) => (
                        <span key={i} className={i === 0 ? "font-semibold text-blue-200" : "text-gray-100"}>
                          {part}{i === 0 ? ':' : ''}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Updated Timeline Section */}
              <div className="bg-[#252525] p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Event Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-300">Start Time</p>
                    <p className="text-white text-lg">
                      {new Date(qrCode.eventStartTime).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-300">End Time</p>
                    <p className="text-white text-lg">
                      {new Date(qrCode.eventEndTime).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={toggleStatus}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  qrCode.isActive
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {qrCode.isActive ? 'Deactivate QR Code' : 'Activate QR Code'}
              </button>
            </div>
          </div>
          
          {/* QR Code Section remains unchanged */}
          <div>
            <div className="sticky top-4">
              <h3 className="text-2xl font-bold text-white mb-4">QR Code</h3>
              <div className="bg-white p-4 rounded-lg">
                <img
                  src={qrCode.qrCodeUrl}
                  alt="QR Code"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
              <div className="mt-4 text-center">
                <a
                  href={qrCode.qrCodeUrl}
                  download="qr-code.png"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
                >
                  Download QR Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRDetails;