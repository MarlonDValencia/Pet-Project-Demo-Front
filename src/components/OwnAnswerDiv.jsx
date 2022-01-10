import React from "react";

export const OwnAnswerDiv = ({ answer, onDelete }) => {
  return (
    <>
      <div className="answer">
        <p>{answer.answer}</p>
        <button onClick={() => onDelete(answer.id)} className="btn btn-danger">Delete</button>
      </div>
    </>
  );
};

