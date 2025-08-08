import React from "react";
import logo from "../../images/logo_around.png";

function Header({ email, onSignOut, loggedIn }) {
  return (
    <header className="header">
      <img className="header__vector" src={logo} alt="logo de Triple Ten" />

      {loggedIn && (
        <div className="header__user-info">
          <p className="header__email">{email}</p>
          <button className="header__logout" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
