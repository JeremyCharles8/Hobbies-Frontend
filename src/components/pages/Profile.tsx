import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserData } from '../../hooks/useUser.hook';
import { UserProfile } from '../../types/user.type';
import { LibraryName } from '../../types/libraries.type';

export default function Profile() {
  const navigate = useNavigate();
  const [library, setLibrary] = useState<LibraryName | ''>('');
  const { data, isError, error, isLoading } = useUserData();

  //Try to load data in cache if failed redirect to login page
  useEffect(() => {
    if (isError) {
      console.log(error.message);
      if (error.message === 'Unauthorized, invalid token') {
        navigate('/');
      }

      if (error.message === 'Internal server error') {
        navigate('/serverError');
      }
    }
  }, [isError, error]);

  const handleSelectLibrary = (library: LibraryName) => {
    setLibrary(library);
  };

  //TODO change user profile data structure in backend to store all libraries in a dedicated objet and simplify the way to get their names
  //Create list containing each library's names
  const listLibraries = (data: UserProfile) => {
    //Take data object keys which are library's names
    const libraries = Object.keys(data).slice(4) as LibraryName[];

    return libraries.map((key) => (
      <li
        className="list__item"
        key={key}
        onClick={() => handleSelectLibrary(key)}
      >
        {key}
      </li>
    ));
  };

  //Create article for each item in selected library
  const listItems = (libraryName: LibraryName, data: UserProfile) => {
    if (libraryName === 'boardGame') {
      return data[libraryName].map((item) => (
        <article className="article" key={item.id}>
          <h3 className="article__title">{item.title}</h3>
          <img className="article__img" alt={item.title} />
        </article>
      ));
    }

    return data[libraryName].map((item) => (
      <article className="article" key={item.id}>
        <h3 className="article__title">{item.serie}</h3>
        <img className="article__img" alt={item.serie} />
        <p className="article__text">{item.type}</p>
      </article>
    ));
  };

  if (isLoading) {
    return <p>Loading page...</p>;
  }

  return (
    <section className="container">
      <h1 className="title">Profile Page</h1>
      <nav className="menu">
        <ul className="menu__list">{data ? listLibraries(data) : null}</ul>
      </nav>
      <section className="main">
        <form className="form">
          <input className="form__input" type="text" />
        </form>
        {data && library ? listItems(library, data) : null}
      </section>
    </section>
  );
}
