import React, { useContext } from 'react'
import './Result.css'
import { QuizContext } from '../../context'
import { Link } from 'react-router-dom'
const Result = () => {
    const {score} = useContext(QuizContext);
  return (
    <div className="title">
      <h1>Result</h1>
      <h2>Score: {score}</h2>
      <Link to="/" className='btn btn-primary btn-lg'>Go to Home</Link>
    </div>
  )
}

export default Result