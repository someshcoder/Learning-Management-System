// src/pages/student/ExamDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux'; // To get the user from Redux state

function ExamDashboard() {
  const { user } = useSelector((state) => state.auth); // Get the user from Redux state
  const [examRecords, setExamRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Fetch exam records for the current user
    const userId = user ? user._id : 'defaultUser'; // Use user._id from Redux state
    const records = JSON.parse(localStorage.getItem(`examRecords_${userId}`)) || [];
    setExamRecords(records);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Exam Dashboard</h2>

        {examRecords.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md dark:bg-gray-800/20 rounded-lg p-6 text-white text-center">
            <p className="text-lg">You haven't taken any exams yet.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate('/home')}
                className="mt-4 bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Take an Exam
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-6">
            {examRecords.map((record, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md dark:bg-gray-800/20 rounded-lg p-6 text-white"
              >
                <h3 className="text-xl font-semibold mb-2">{record.examName}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Date: {new Date(record.date).toLocaleString()}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p>Correct Answers: {record.correct}</p>
                    <p>Incorrect Answers: {record.incorrect}</p>
                    <p>Overall Accuracy: {record.accuracy}%</p>
                    <p>Score: {record.score}/100</p>
                    <p>Time Taken: {record.timeTaken}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Section-wise Analysis</h4>
                    {record.sectionResults.map((section, idx) => (
                      <div key={idx} className="mb-2">
                        <p>
                          {section.section}: {section.accuracy}% Accuracy
                        </p>
                        <p className="text-sm text-gray-300">{section.improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
            >
              <Button
                onClick={() => navigate('/home')}
                className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Take Another Exam
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamDashboard;