import { NavLink } from "react-router-dom";

export default function Header() {

  return (
    <header className="header">
      <section className="header__logo">
        <img className="header__img" src="" alt="logo" />
      </section>
      {/* <section className="header__menu">
        <section className="header__signout">
          <NavLink className="header__signout__link" to="/profil">
            Sign out
          </NavLink>
        </section>
        <section className="header__profil">
          <img className="header__img" src="" alt="profil image" />
          <NavLink className="header__img__link" to="/">
          </NavLink>
        </section>
      </section> */}
    </header>
  );
};
