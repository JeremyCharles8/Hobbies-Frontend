import { NavLink } from "react-router-dom";

export default function Footer() {
  return(
    <footer className="footer">
      <ul className="footer__list">
        <li className="footer__item">
          <NavLink className="footer__link" to="/about">
            About
          </NavLink>
        </li>
        <li className="footer__item">
          <NavLink className="footer__link" to="/privacy">
            Privacy
          </NavLink>
        </li>
        <li className="footer__item">
          <NavLink className="footer__link" to="/terms">
            Terms
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};
