import "../index.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  BrowserRouter as Router,
  Redirect,
  Link
} from 'react-router-dom'
import "firebase/auth";

const LoginPage = () => {

  const auth = firebase.auth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const Login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => alert("Usuario logeado"))
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("dicha contraseña ya está registrada");
        }else if(errorCode === "auth/email-already-in-use"){
          alert("Dicho correo ya está registrado");
        }else if(errorCode === "auth/invalid-email"){
          alert("El correo ingresado es invalido");
        } else {
          alert(errorMessage);
        }
        alert(error);
      });
  };

  return (
    <>
      <form onSubmit={Login} className="form-group mt-3">
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <button className="btn button">Sign in</button>
        <br/>
        <br/>
      </form>
      <Link to='/register' ><button onClick={Redirect} className="btn button">Register</button></Link>
      <br/>
      <br />
    </>
  );
};

export default LoginPage;
