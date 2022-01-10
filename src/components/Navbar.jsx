import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

export const PublicNavbar = () => (
  <nav>
    <section>
      <Link>
        <img
          style={{ maxHeight: 50 }}
          src="https://cdn-icons-png.flaticon.com/512/947/947496.png"
        />
      </Link>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
);

export const PrivateNavbar = () => (
  <nav>
    <section>
      <Link>
        <img
          style={{ maxHeight: 50 }}
          src="https://cdn-icons-png.flaticon.com/512/947/947496.png"
        />
      </Link>
      <Link to="/">Home</Link>
      <Link to="profile">My Profile</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
    </section>
  </nav>
);
