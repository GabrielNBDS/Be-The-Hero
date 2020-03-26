import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Login() {
  const [id, settId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (error) {
      alert("Falha no login. Tente novamente.");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => settId(e.target.value)}
          />
          <button type="submit" className="button">
            {" "}
            Entrar
          </button>

          <Link className="back-link" to="/register">
            {" "}
            <FiLogIn size={16} color="e02041" />
            Não tenho cadastro{" "}
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
