import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Simulating login state and instructor
const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};
const getInstructorName = () => localStorage.getItem('instructorName') || 'Unknown Instructor'; // Simulated instructor name

// Sample course data
const coursesData = [
  "React for Beginners",
  "Advanced JavaScript",
  "Node.js Mastery",
  "Full Stack Development",
  "Data Structures & Algorithms",
];

// Sample exams data
const exams = [
  'Scholarship Test',
  'Mock Test',
  'Replica',
  'Certification Test',
];

// Questions for each exam (now 10 questions per exam)
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

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showExams, setShowExams] = useState(false);
  const [showQuestionPaper, setShowQuestionPaper] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [instructorName, setInstructorName] = useState(getInstructorName());

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    setLoggedIn(isLoggedIn());

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timer;
    if (showQuestionPaper && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [showQuestionPaper, timeLeft]);

  useEffect(() => {
    if (showQuestionPaper) {
      setStartTime(Date.now());
      setTimeLeft(300);
      setAnswers({});
    }
  }, [showQuestionPaper]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = coursesData.filter(course =>
      course.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  const handleSelectCourse = (course) => {
    setSearchQuery(course);
    setFilteredCourses([]);
  };

  const handleExamSelect = (exam) => {
    if (!loggedIn) {
      navigate('/signup');
      return;
    }
    setSelectedExam(exam);
    setShowExams(false);
    setShowQuestionPaper(true);
  };

  const closeQuestionPaper = () => {
    setShowQuestionPaper(false);
    setSelectedExam(null);
  };

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
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // in seconds

    setShowResult({
      correct,
      total,
      accuracy,
      timeTaken,
    });
    setShowQuestionPaper(false);
  };

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
    tap: { scale: 0.95, rotate: -5, transition: { duration: 0.2 } },
    submit: { scale: [1, 1.2, 1], rotate: [0, 10, 0], backgroundColor: "#4CAF50", color: "#fff", transition: { duration: 0.5 } },
  };

  return (
    <div className="relative overflow-hidden py-24 px-4 text-center min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300/30 dark:bg-pink-700/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/30 animate-float"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div 
        className={`max-w-3xl mx-auto relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}
      >
        <motion.div
          key="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 
            className="text-white text-5xl font-bold mb-6 leading-tight transition-all duration-700 animate-fadeIn"
            style={{ animationDelay: '300ms' }}
          >
            Find the Best Courses for You
          </h1>
          
          <p 
            className="text-gray-200 dark:text-gray-300 text-lg mb-10 max-w-2xl mx-auto transition-all duration-700 animate-fadeIn"
            style={{ animationDelay: '600ms' }}
          >
            Discover, Learn, and Upskill with our wide range of courses
          </p>

          <form 
            className="flex items-center bg-white/10 backdrop-blur-md dark:bg-gray-800/20 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-8 border border-white/20 transition-all hover:shadow-xl animate-fadeIn"
            style={{ animationDelay: '900ms' }}
          >
            <Input
              type="text"
              placeholder="Search Courses"
              value={searchQuery}
              onChange={handleSearch}
              className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-white dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-400 bg-transparent"
            />
            <Button 
              type="button" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-r-full hover:bg-gray-100 transition-colors animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              Search
            </Button>
          </form>

          {searchQuery && filteredCourses.length > 0 && (
            <div className="bg-white/10 rounded-lg p-4 max-w-xl mx-auto text-white">
              {filteredCourses.map((course, index) => (
                <div 
                  key={index} 
                  className="p-2 border-b border-gray-500 cursor-pointer hover:bg-white/20 transition"
                  onClick={() => handleSelectCourse(course)}
                >
                  {course}
                </div>
              ))}
            </div>
          )}

          {loggedIn && (
            <>
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={() => setShowExams(!showExams)}
                  className="bg-red-500 border-2 border-red-500 text-white rounded-full px-8 py-3 font-medium hover:bg-red-600 transition-all animate-fadeIn"
                  style={{ animationDelay: '1200ms' }}
                >
                  Give Exams
                </Button>
              </motion.div>

              {showExams && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 bg-white/10 backdrop-blur-md dark:bg-gray-800/20 rounded-lg p-4 max-w-xl mx-auto text-white"
                >
                  <h2 className="text-xl font-bold mb-4">Available Exams</h2>
                  <ul>
                    {exams.map((exam, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-2 border-b border-gray-500 last:border-b-0 hover:bg-white/20 transition duration-300 cursor-pointer"
                        onClick={() => handleExamSelect(exam)}
                      >
                        {exam}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Question Paper Modal */}
      <AnimatePresence>
        {showQuestionPaper && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeQuestionPaper}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedExam} Questions</h2>
              <div className="text-right text-gray-600 mb-4">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</div>
              <button
                onClick={closeQuestionPaper}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
              <div className="space-y-4">
                {examQuestions[selectedExam].map((question) => (
                  <div key={question.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white">{question.question}</p>
                    <ul className="mt-2 space-y-2">
                      {question.options.map((option, index) => (
                        <li key={index} className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            className="mr-2"
                            onChange={() => handleAnswerChange(question.id, option)}
                          />
                          <span className="text-gray-800 dark:text-gray-200">{option}</span>
                        </li>
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
                animate={showResult ? "submit" : "initial"}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exam Result</h2>
              <button
                onClick={() => setShowResult(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
              <p className="text-gray-700 dark:text-gray-300">Correct Answers: {showResult.correct} / {showResult.total}</p>
              <p className="text-gray-700 dark:text-gray-300">Wrong Answers: {showResult.total - showResult.correct}</p>
              <p className="text-gray-700 dark:text-gray-300">Accuracy: {showResult.accuracy}%</p>
              <p className="text-gray-700 dark:text-gray-300">Time Taken: {showResult.timeTaken} seconds</p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">Result made by: {instructorName}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection;