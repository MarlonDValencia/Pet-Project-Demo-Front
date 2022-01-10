import "../index.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const RegisterPage = () => {
  const auth = firebase.auth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");

  const registrarUsuario = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => alert("Usuario Registrado"))
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("La contraseña debe tener almenos seis caracteres");
        }else {
          alert(errorMessage);
        }
      });
  };
  return (
    <>
      <form onSubmit={registrarUsuario} className="form-group mt-3">
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="firstName"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Last Name
          </label>
          <input
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            type="lastName"
            className="form-control"
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
          />
        </div>
        <button className="btn button">Register</button>
      </form>
      <br />
      <br />
    </>
  );
};

export default RegisterPage;
