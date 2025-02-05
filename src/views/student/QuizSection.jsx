import React, { useState } from "react";
import { quizData } from "./quizData"; // adjust the path as needed

const QuizSection = () => {
  // Array to hold the user's selected option for each question (by index)
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    quizData.forEach((question, i) => {
      // Find the index of the correct option
      const correctIndex = question.options.findIndex(
        (opt) => opt.isCorrect === true
      );
      if (selectedAnswers[i] === correctIndex) {
        count++;
      }
    });
    setScore(count);
    setSubmitted(true);
  };

  return (
    <div className="p-4">
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        {quizData.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <p className="fw-bold">
              {qIndex + 1}. {question.question}
            </p>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    className="form-check-input"
                    value={oIndex}
                    checked={selectedAnswers[qIndex] === oIndex}
                    onChange={() => handleAnswerChange(qIndex, oIndex)}
                  />
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit Quiz
        </button>
      </form>
      {submitted && (
        <div className="mt-4 alert alert-success">
          <h3>
            You got {score} out of {quizData.length} correct!
          </h3>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
