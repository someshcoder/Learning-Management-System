import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

// Exam questions data (imported or defined here)
const examQuestions = {
  'Scholarship Test': [
    { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: "Paris" },
    { id: 2, question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctAnswer: "William Shakespeare" },
    { id: 3, question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" },
    { id: 4, question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
    { id: 5, question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: "Leonardo da Vinci" },
    { id: 6, question: "What is 5 x 6?", options: ["25", "30", "35", "40"], correctAnswer: "30" },
    { id: 7, question: "Which country hosted the 2016 Summer Olympics?", options: ["Brazil", "USA", "China", "Russia"], correctAnswer: "Brazil" },
    { id: 8, question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Cu"], correctAnswer: "Au" },
    { id: 9, question: "Which planet is known for its rings?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: "Saturn" },
    { id: 10, question: "Who is the author of 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "F. Scott Fitzgerald"], correctAnswer: "Harper Lee" },
  ],
  'Mock Test': [
    { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
    { id: 2, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
    { id: 3, question: "What is the square root of 16?", options: ["2", "4", "8", "16"], correctAnswer: "4" },
    { id: 4, question: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], correctAnswer: "Hydrogen" },
    { id: 5, question: "Who discovered penicillin?", options: ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"], correctAnswer: "Alexander Fleming" },
    { id: 6, question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctic", "Arabian"], correctAnswer: "Antarctic" },
    { id: 7, question: "Which sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], correctAnswer: "Badminton" },
    { id: 8, question: "What year did World War II end?", options: ["1945", "1944", "1939", "1950"], correctAnswer: "1945" },
    { id: 9, question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: "Nile" },
    { id: 10, question: "Who painted 'Starry Night'?", options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Salvador Dali"], correctAnswer: "Vincent van Gogh" },
  ],
  'Replica': [
    { id: 1, question: "What is HTML used for?", options: ["Styling", "Structuring web pages", "Programming", "Database management"], correctAnswer: "Structuring web pages" },
    { id: 2, question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Style Syntax"], correctAnswer: "Cascading Style Sheets" },
    { id: 3, question: "Which tag is used to create a paragraph in HTML?", options: ["<p>", "<div>", "<span>", "<h1>"], correctAnswer: "<p>" },
    { id: 4, question: "What is the purpose of JavaScript?", options: ["Styling", "Adding interactivity", "Database storage", "Server management"], correctAnswer: "Adding interactivity" },
    { id: 5, question: "Which property is used to change the text color in CSS?", options: ["color", "background-color", "font-color", "text-color"], correctAnswer: "color" },
    { id: 6, question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Digital Object Management", "Dynamic Object Mapping"], correctAnswer: "Document Object Model" },
    { id: 7, question: "Which HTML tag is used for images?", options: ["<img>", "<image>", "<pic>", "<figure>"], correctAnswer: "<img>" },
    { id: 8, question: "What is a flexbox used for in CSS?", options: ["Layout design", "Animation", "Font styling", "Color schemes"], correctAnswer: "Layout design" },
    { id: 9, question: "Which event occurs when a user clicks on an element?", options: ["onchange", "onclick", "onload", "onsubmit"], correctAnswer: "onclick" },
    { id: 10, question: "What is the default port for HTTP?", options: ["80", "443", "8080", "21"], correctAnswer: "80" },
  ],
  'Certification Test': [
    { id: 1, question: "What is JavaScript primarily used for?", options: ["Database management", "Web development", "Graphic design", "Server hardware"], correctAnswer: "Web development" },
    { id: 2, question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Apple"], correctAnswer: "Netscape" },
    { id: 3, question: "What is a closure in JavaScript?", options: ["A loop", "A function with access to its outer scope", "A variable type", "An error handling mechanism"], correctAnswer: "A function with access to its outer scope" },
    { id: 4, question: "Which method is used to add an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()" },
    { id: 5, question: "What does AJAX stand for?", options: ["Asynchronous JavaScript and XML", "Advanced JavaScript and XML", "Asynchronous JSON and XML", "Advanced JSON and XML"], correctAnswer: "Asynchronous JavaScript and XML" },
    { id: 6, question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "let", "const", "all of the above"], correctAnswer: "all of the above" },
    { id: 7, question: "What is the purpose of the `this` keyword?", options: ["To refer to the current object", "To define a new function", "To loop through arrays", "To handle errors"], correctAnswer: "To refer to the current object" },
    { id: 8, question: "Which HTML attribute is used to specify an inline CSS style?", options: ["class", "id", "style", "src"], correctAnswer: "style" },
    { id: 9, question: "What is the difference between `let` and `var`?", options: ["Scope", "Type", "Value", "Functionality"], correctAnswer: "Scope" },
    { id: 10, question: "Which operator is used for strict equality in JavaScript?", options: ["==", "===", "!=", "!=="], correctAnswer: "===" },
  ],
};

function Exam() {
  const location = useLocation();
  const { selectedExam } = location.state || {};
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedExam) navigate('/');
    setStartTime(Date.now());
    setTimeLeft(300);
    setAnswers({});
  }, [selectedExam, navigate]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const questions = examQuestions[selectedExam];
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const total = questions.length;
    const accuracy = ((correct / total) * 100).toFixed(2);
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    navigate('/result', { state: { correct, total, accuracy, timeTaken } });
  };

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
    tap: { scale: 0.95, rotate: -5, transition: { duration: 0.2 } },
    submit: { scale: [1, 1.2, 1], rotate: [0, 10, 0], backgroundColor: "#4CAF50", color: "#fff", transition: { duration: 0.5 } },
  };

  const radioVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.1, opacity: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.9, opacity: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{selectedExam} Questions</h2>
        <div className="text-right text-gray-600 mb-4">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</div>
        <div className="space-y-6">
          {examQuestions[selectedExam].map((question) => (
            <div key={question.id} className="p-6 bg-white rounded-lg shadow-md">
              <p className="font-medium text-gray-800">{question.question}</p>
              <ul className="mt-4 space-y-3">
                {question.options.map((option, index) => (
                  <motion.li
                    key={index}
                    variants={radioVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center"
                  >
                    <motion.input
                      type="radio"
                      name={`question-${question.id}`}
                      className="mr-3"
                      onChange={() => handleAnswerChange(question.id, option)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <span className="text-gray-700">{option}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleSubmit}
          animate={false}
          className="mt-8 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
        >
          Submit
        </motion.div>
      </div>
    </div>
  );
}

export default Exam;