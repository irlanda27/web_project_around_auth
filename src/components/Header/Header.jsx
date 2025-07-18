import react from "react";
import logo from "../../images/logo_around.png";

function Header() {
  return (
    <header className="header">
      <img className="header__vector" src={logo} alt="logo de Triple Ten" />
    </header>
  );
}

export default Header;
