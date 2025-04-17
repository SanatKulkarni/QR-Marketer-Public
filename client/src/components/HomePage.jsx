import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#131313]">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
            <h3 className="text-2xl font-bold text-white mb-6">
            PLEASE DONT OVERUSE MY RESOURCES WILL DIE
          </h3>
          <h1 className="text-5xl font-bold text-white mb-6">
            QR-Marketer
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Generate smart QR codes for your events and boost social media engagement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a] rounded-lg p-8 shadow-lg border border-gray-800"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Create Event QR Codes
            </h2>
            <p className="text-gray-400 mb-6">
              Generate unique QR codes for your events that automatically create engaging social media posts.
            </p>
            <Link
              to="/create"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a1a1a] rounded-lg p-8 shadow-lg border border-gray-800"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Manage Your QR Codes
            </h2>
            <p className="text-gray-400 mb-6">
              Track, update, and manage all your event QR codes from a single dashboard.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              View Dashboard
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl text-white mb-4">
            Why Choose QR-Marketer?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-gray-800">
              <h4 className="text-xl text-white mb-2">Smart Generation</h4>
              <p className="text-gray-400">AI-powered tweet generation based on event timing</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-gray-800">
              <h4 className="text-xl text-white mb-2">Easy Management</h4>
              <p className="text-gray-400">Control and update your QR codes anytime</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-gray-800">
              <h4 className="text-xl text-white mb-2">Boost Engagement</h4>
              <p className="text-gray-400">Increase social media presence effortlessly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;