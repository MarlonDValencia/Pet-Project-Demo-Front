import React from 'react'

export const OwnAnswer = ({ answer, excerpt, onDelete }) => (
  <>
  <div className="answer">
    <p>{answer.answer}</p>
        <button className='btn btn-danger'>Delete</button>
  </div>
  </>
)
