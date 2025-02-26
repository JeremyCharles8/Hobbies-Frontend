import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserData } from '../../hooks/useUser.hook';
import { UserProfile } from '../../types/user.type';
import { LibraryName } from '../../types/libraries.type';
import { ErrorData } from '../../types/error.type';

const getTitles = async (formData: { title: string }) => {
  try {
    //TODO complete url
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData: ErrorData = await response.json();
      return { status: response.status, error: errorData.error };
    }
    //TODO data type and validation
    const data = await response.json();

    return { status: response.status, error: null, data };
  } catch (error) {
    console.log('Error sending data', error);
  }
};

export default function Profile() {
  const navigate = useNavigate();
  const [library, setLibrary] = useState<LibraryName | ''>('');
  const [formData, setFormData] = useState({
    title: '',
  });
  const [inputTimeout, setInputTimeout] = useState<number | null>(null);
  //TODO type for getTitlesResults
  const [getTitlesResults, setGetTitlesResults] = useState(null);
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

  //Update formData with current input field value, call fetch function with formData after 0.3 seconds without new iput
  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setFormData({
      title: value,
    });
    console.log('formData value:', formData);
    console.log('input timeout state before update:', inputTimeout);
    //If new input, reset timer
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }

    setInputTimeout(
      setTimeout(async () => {
        if (!value.trim()) {
          return;
        }
        setGetTitlesResults(getTitles(formData));
      }, 300)
    );
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
          <input
            className="form__input"
            name="title"
            type="text"
            onChange={handleChange}
          />
        </form>
        {data && library ? listItems(library, data) : null}
      </section>
    </section>
  );
}
