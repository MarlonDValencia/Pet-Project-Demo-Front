import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import { Link, Redirect } from 'react-router-dom'
import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'
import SingleQuestionPage from './SingleQuestionPage'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {

    const [state, setstate] = useState({
        category: "All"
    })

    const [busqueda, setBusqueda] = useState({
        valor: null
    })

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const renderQuestions = (prop) => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>
        if (prop === "All") {
            return (questions.map(question => <Question key={question.id} question={question} excerpt />))
        }
        return (questions.filter(question => question.category === prop)).map(question => <Question key={question.id} question={question} excerpt />)
    }

    const renderSpecificQuestions = (prop) => {
        return questions.filter(question => question.question.startsWith(prop)).map(question => <ul>
            <li><Link to={`/question/${question.id}`} className="text-dark mx-1 mt-1">{question.question}</Link></li>
        </ul>)
    }

    const onClickAll = () => {
        state.category = setstate({
            category: "All"
        });
    }

    const onClickTech = () => {
        state.category = setstate({
            category: "TECHNOLOGY AND COMPUTER"
        });
    }
    const onClickSciences = () => {
        state.category = setstate({
            category: "SCIENCES"
        });
    }
    const onClickDev = () => {
        state.category = setstate({
            category: "SOFTWARE DEVELOPMENT"
        });
    }
    const onClickSocial = () => {
        state.category = setstate({
            category: "SOCIAL SCIENCES"
        });
    }
    const onClickLang = () => {
        state.category = setstate({
            category: "LANGUAGE"
        });
    }

    const onChange = (e) => {
        if (e.target.value.lenght == 0 || !e.target.value) {
            setBusqueda({
                valor: null
            })
        } else {
            setBusqueda({
                valor: e.target.value
            })
        }
        renderSpecificQuestions(busqueda.valor)
    }

    const onKeyPress = (e) => {

        if (e.key === "Enter") {
            console.log("Entro")
            return (
                <Switch>
                    <Route exact path="/question/61db2f1a9de572431b57c143" component={SingleQuestionPage} />
                </Switch>)
        }
    }

    const enviar = () => {
        return (
            <Switch>
                <Route exact path="/question/61db2f1a9de572431b57c143" component={SingleQuestionPage} />
            </Switch>)
    }

    return (

        <div className='container'>
            <div class="input-group rounded container">
                <input onChange={onChange} onKeyPress={onKeyPress} type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            </div>
            <div>
                {renderSpecificQuestions(busqueda.valor)}
                {enviar}
            </div>
            <section>
                <h3>Filters</h3>
                <div>
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <button onClick={onClickAll} className="btn mx-1 button" >All</button>
                        </li>
                        <li class="nav-item">
                            <button onClick={onClickTech} className="btn mx-1 button" >Tech</button>
                        </li>
                        <li class="nav-item">
                            <button onClick={onClickSciences} className="btn mx-1 button" >Sciences</button>
                        </li>
                        <li class="nav-item">
                            <button onClick={onClickDev} className="btn mx-1 button" >SoftwareDev</button>
                        </li>
                        <li class="nav-item">
                            <button onClick={onClickSocial} className="btn mx-1 button" >Social</button>
                        </li>
                        <li class="nav-item">
                            <button onClick={onClickLang} className="btn mx-1 button" >Language</button>
                        </li>
                    </ul>
                </div>
            </section>
            <h1>Questions</h1>
            {(state.category === "All") ? (
                renderQuestions(state.category)
            ) : (renderQuestions(state.category))}
        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)
