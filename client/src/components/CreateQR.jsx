import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateQR = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventDetails: '',
    eventStartTime: '',
    eventEndTime: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert local time to IST
      const convertToIST = (dateString) => {
        const date = new Date(dateString);
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      };

      const response = await fetch('https://qr-marketer.onrender.com/api/qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventStartTime: convertToIST(formData.eventStartTime),
          eventEndTime: convertToIST(formData.eventEndTime)
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('QR Code generated successfully!', {
          duration: 3000,
          position: 'top-center',
        });
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(data.error || 'Failed to generate QR code');
      }
    } catch (error) {
      toast.error('Error creating QR code');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Create QR Code</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Event Details</label>
            <textarea
              value={formData.eventDetails}
              onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
              className="w-full bg-[#252525] text-white rounded-lg p-4 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Start Time (IST)</label>
              <input
                type="datetime-local"
                value={formData.eventStartTime}
                onChange={(e) => setFormData({ ...formData, eventStartTime: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">End Time (IST)</label>
              <input
                type="datetime-local"
                value={formData.eventEndTime}
                onChange={(e) => setFormData({ ...formData, eventEndTime: e.target.value })}
                className="w-full bg-[#252525] text-white rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all font-semibold"
          >
            Generate QR Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQR;