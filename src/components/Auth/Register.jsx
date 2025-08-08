import { useState } from "react";
import {register} from "../../utils/auth.js";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password );
  }

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Registrarse</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth-form__input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-form__input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-form__button" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;