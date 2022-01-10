import React from 'react'
import { Link } from 'react-router-dom'
import "../index.css";

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    {}
    <img src=""></img>
    <h2>{question.question}</h2>
    <p>{question.category}  - <small>{question.type}</small></p>
   
    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>DELETE</button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
  </article>
)