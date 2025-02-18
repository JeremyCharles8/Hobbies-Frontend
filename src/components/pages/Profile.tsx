import { useState } from 'react';
import { useUserData } from '../../hooks/useUser.hook';

export default function Profile() {
  console.log('Page profil');

  const [section, setSection] = useState('');
  const { data, isError, error } = useUserData();

  return (
    <section className="container">
      <h1 className="title">Profile Page</h1>
      <nav className="menu">
        <ul className="menu__list"></ul>
      </nav>
      <section className="main"></section>
    </section>
  );
}
