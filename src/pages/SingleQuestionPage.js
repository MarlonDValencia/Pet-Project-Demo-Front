import React, { useEffect, useState } from 'react'
import { fetchQuestion } from '../actions/questionActions'
import { useDispatch } from 'react-redux'
import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { OwnAnswerDiv } from '../components/OwnAnswerDiv'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { deleteAnswer } from '../actions/questionActions'

const SingleQuestionPage = ({
  match,
  question,
  hasErrors,
  loading,
  userId
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id])

  const dispatch = useDispatch();
  const [clickDelete, setClickDelete] = useState(false)

  
  useEffect(() => {
    dispatch(fetchQuestion(id))
    setClickDelete(false);
  }, [dispatch, id, clickDelete])
  const onDelete = (id) => {

    Swal.fire({
      title: 'Seguro que quieres eliminar esta respuesta',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        dispatch(deleteAnswer(id));
        setClickDelete(true);
        Swal.fire({
          icon: "info",
          title: "Respuesta eliminada!",
          text: `La respuesta ha sido eliminada exitosamente.`,
        })
      }
    })
  }

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      (answer.userId === userId) ? (
        <OwnAnswerDiv key={answer.id} answer={answer} excerpt onDelete={onDelete} />
      ) : (<Answer key={answer.id} answer={answer} />)

    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid
})

export default connect(mapStateToProps)(SingleQuestionPage)
