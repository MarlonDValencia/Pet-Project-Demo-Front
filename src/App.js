import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login, logout } from './actions/authActions';

import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import RegisterPage from "./pages/RegisterPage";
import Profile from './components/Profile';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import LoginPage from './components/LoginPage';
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDDL2Nqv6d57r5Nf3R3w5aATs_Gq7vE2fE",
  authDomain: "petproject-bbf92.firebaseapp.com",
  projectId: "petproject-bbf92",
  storageBucket: "petproject-bbf92.appspot.com",
  messagingSenderId: "936712801976",
  appId: "1:936712801976:web:dd1d6c2743ba289c13ee4d",
  measurementId: "G-0L8F2W26W3"
});

const auth = firebase.auth();
const user = auth.currentUser;


const App = ({ dispatch }) => {

  const [user] = useAuthState(auth);
  if (user) {
    dispatch(login(user.email, user.uid))
  }
  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignOut dispatch={dispatch} /></HomePage>
            }} />
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage>
                <LoginPage />
                <SignIn dispatch={dispatch} />
              </HomePage>
            }} />
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Redirect to="/" />
          </Switch>
        </>
      }
      <Footer />
    </Router>
  )
}


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
    <button
      className="btn button"
      onClick={signInWithGoogle}>
      Sign in with google
    </button>
    </>
  );
}

function SignOut({ dispatch }) {
  return (
    auth.currentUser && (
      <button
        className="button right"
        onClick={() => {
          dispatch(logout())
          auth.signOut();
        }}
      >
        Sign out
      </button>
    )
  );
}


export default App
