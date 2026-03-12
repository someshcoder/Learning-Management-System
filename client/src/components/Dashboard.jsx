import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [examRecords, setExamRecords] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // Default sort by date
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exam records from localStorage
    const userId = localStorage.getItem('userId') || 'defaultUser';
    const records = JSON.parse(localStorage.getItem(`examRecords_${userId}`)) || [];
    setExamRecords(records);
  }, []);

  // Sort records based on the selected criteria
  const sortedRecords = [...examRecords].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date); // Newest first
    } else if (sortBy === 'score') {
      return b.score - a.score; // Highest score first
    } else if (sortBy === 'accuracy') {
      return parseFloat(b.accuracy) - parseFloat(a.accuracy); // Highest accuracy first
    }
    return 0;
  });

  // Clear all exam records
  const handleClearHistory = () => {
    const userId = localStorage.getItem('userId') || 'defaultUser';
    localStorage.removeItem(`examRecords_${userId}`);
    setExamRecords([]);
  };

  // Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Exam History</h1>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              Back to Home
            </motion.button>
            {examRecords.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearHistory}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
              >
                Clear History
              </motion.button>
            )}
          </div>
        </div>

        {/* Sorting Options */}
        <div className="mb-6 flex items-center space-x-4">
          <label className="text-lg font-medium text-gray-700">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date (Newest First)</option>
            <option value="score">Score (Highest First)</option>
            <option value="accuracy">Accuracy (Highest First)</option>
          </select>
        </div>

        {/* Exam Records */}
        {sortedRecords.length === 0 ? (
          <p className="text-lg text-gray-600">No exams taken yet.</p>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {sortedRecords.map((record, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{record.examName}</h2>
                  <p className="text-sm text-gray-500 mb-3">
                    Date: {new Date(record.date).toLocaleString()}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <p className="text-lg text-gray-700">
                      Correct Answers: <span className="font-medium">{record.correct}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Incorrect Answers: <span className="font-medium">{record.incorrect}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Accuracy: <span className="font-medium">{record.accuracy}%</span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Score: <span className="font-medium">{record.score}/100</span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Time Taken: <span className="font-medium">{record.timeTaken}</span>
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Section-wise Analysis</h3>
                  {record.sectionResults.map((section, idx) => (
                    <div key={idx} className="mb-3">
                      <p className="text-md text-gray-700">
                        {section.section}: <span className="font-medium">{section.accuracy}% Accuracy</span>
                      </p>
                      <p className="text-sm text-gray-600">{section.improvement}</p>
                    </div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;