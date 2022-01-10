import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";

const Profile = () => {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  const [state, setState] = useState({
    nombre: "",
  });

  const completeEdit = () => {
    user.updateProfile({
      displayName: state.nombre,
    }).then(alert("Nombre actualizado"));
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form action={completeEdit}>
        <div className="mt-5 container">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                className="form-control-plaintext"
                id="staticEmail"
                value={user.email}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">
              Nombre
            </label>
            <div class="col-sm-10">
              <input
                name="nombre"
                type="text"
                placeholder={user.displayName}
                className="form-control"
                onChange={onChange}
              />
            </div>
          </div>
          <button onClick={completeEdit} className="button">
            Editar
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
