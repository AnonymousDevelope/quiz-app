import React, { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../../context';
import './Quiz.css';
import { useNavigate } from 'react-router';
import Alert from '../../ui-components/Alert/Alert'; // Import react-html-parser
import parse from 'html-react-parser'
const Quiz = () => {
  const { questions, loading, name, setQuestions, setScore } = useContext(QuizContext);
  const [count, setCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [select, setSelect] = useState('');
  const [error, setError] = useState(false);
  const [score, setScoreQuiz] = useState(0); // Use state to manage the score
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && answers.length === 0 && questions.length > 0) {
      const currentQuestion = questions[count];
      const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
      allAnswers.sort(() => Math.random() - 0.5);
      setAnswers(allAnswers);
    }
  }, [loading, answers, count, questions]);

  const handleNextClick = () => {
    if (count === questions.length - 1) {
      navigate('/result');
      setScore(score);
      setQuestions([]);
    }
    if (select && count < questions.length - 1) {
      setError(false);
      setCount(count + 1);
      setSelect('');
      setAnswers([]);
    } else {
      setError(true);
    }
  };

  const handleQuit = () => {
    navigate('/');
  };

  const handleCheckAnswer = (answer) => {
    setSelect(answer); // First, set the selected answer
    if (answer === questions[count].correct_answer) {
      // Update the score if the answer is correct
      setScoreQuiz(score + 1);
    }
  };

  const handleSelect = (i) => {
    if (select === i && select === questions[count].correct_answer) {
      return 'correct';
    }
    if (select === i && select !== questions[count].correct_answer) {
      return 'incorrect';
    } else if (i === questions[count].correct_answer) {
      return 'correct';
    }
    return ''; // Return an empty string for options that aren't selected.
  };

  if (loading) {
    return (
      <div className="loading">
          
      </div>
    );
  }

  return (
    <>
      <div className="quiz_page">
        <h1 className="title">Welcome {name} to Quiz </h1>
        {error && <Alert> Please select an answer</Alert>}

        <div className="quiz_block">
          <div className="row m-0 gap-2">
            <div className="col-md-12">
              <div className="instruction title fs-4">
                <div className="count float-start"> Questions - {count + 1}</div>
                <div className="score float-end">Score : {score}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="quiz_questions shadow">
                {parse(questions[count]?.question)} {/* Parse HTML content */}
              </div>
            </div>
            <div className="col-md-12">
              <div className="row m-0 quiz_answer justify-content-between gap-2">
                {answers.map((answer, index) => (
                  <button
                    disabled={select}
                    onClick={() => handleCheckAnswer(answer)}
                    className={`col-md-5 btn my-1 answer shadow ${select && handleSelect(answer)}`}
                    key={index}
                  >
                    {parse(answer)}
                  </button>
                ))}
              </div>
            </div>
            <div className="row mx-auto">
              <div className="instructs p-0">
                <button className="btn col-md-4 shadow text-white my-2" datatype="quit" onClick={handleQuit}>
                  Quit
                </button>
                <button className="btn col-md-4 shadow text-white my-2" datatype="next" onClick={handleNextClick}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
