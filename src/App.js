import { useState } from "react";
import "./styles.css";

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which language is used for web development?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    id: 3,
    question: "Who developed React.js?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const handleChange = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = option;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === quizData[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  return showResult ? (
    <div>
      <h3>Your quiz completed!</h3>
      <p>
        The score is {score}/{quizData.length}
      </p>
    </div>
  ) : (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <h3>{quizData[currentQuestion].question}</h3>
        {quizData[currentQuestion].options.map((option) => (
          <label>
            <input
              type="radio"
              name="question-option"
              value={option}
              checked={answers[currentQuestion] === option}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
        {currentQuestion > 0 && <button onClick={handlePrev}>Prev</button>}

        <button onClick={handleNext} disabled={!answers[currentQuestion]}>
          {currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
