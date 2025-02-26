import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useUserData } from '../../hooks/useUser.hook';
import '../styles/home.scss';
import { SigninForm } from '../../types/user.type';
import { ErrorData } from '../../types/error.type';

const apiUrl: string = import.meta.env.VITE_API_URL;

const signin = async (formData: SigninForm) => {
  try {
    const response = await fetch(`${apiUrl}/auth/signin`, {
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
    const data: string = await response.json();

    return { status: response.status, error: null, data };
  } catch (error) {
    console.log('Error sending data', error);
  }
};

export default function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isServerError, setIsServerError] = useState(false);

  // Try to load cache with user's informations
  const { data, isError, error } = useUserData();

  // Redirect to profile page if user's already authenticated
  useEffect(() => {
    if (data) {
      navigate('/profile');
    }

    if (isError) {
      console.log(error.message);
    }
  }, [data, isError, error]);

  // Update formData with current field value
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setErrorMessage('');
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  // Call login fetch function with formData and redirect to profile page
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await signin(formData);
      if (response && response.status === 500) {
        setIsServerError(true);
        return;
      }

      if (response && response.status === 401) {
        setErrorMessage('Incorrect email or password');
        return;
      }

      if (response && response.status === 200) {
        setFormData({
          email: '',
          password: '',
        });
        queryClient.invalidateQueries({ queryKey: ['user'] });

        navigate('/profile');
      }
    } catch (error) {
      console.log('login error', error);
    }
  };

  return (
    <section className="home">
      <section className="home__left ">
        <article className="home__article home__article--left">
          <h1 className="home__title home__title--main">HOBBIES</h1>
          <p className="home__presentation">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero
            velit, pulvinar vitae mattis sit amet, volutpat cursus nunc.
            Suspendisse potenti. Quisque ut feugiat dolor.
          </p>
        </article>
      </section>
      <section className="home__right">
        <article className="home__article home__article--right">
          <header className="home__header">
            <h2 className="home__title home__title--section">Sign in</h2>
          </header>
          <form className="home__form" onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="home__inputError" role="alert">
                {errorMessage}
              </p>
            )}
            <input
              className="home__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              className="home__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit" className="home__button">
              Log in
            </button>
            <NavLink className="home__recover" to="/pwRecover">
              Forgot my password?
            </NavLink>
          </form>
          <footer className="home__footer">
            <h3 className="home__title home__title--alternative">OR</h3>
            <p>If you don't already have an acount</p>
            <NavLink className="home__signup" to="/signup">
              Sign up
            </NavLink>
          </footer>
        </article>
        {isServerError && (
          <aside className="home__toast" role="alert">
            <p className="home__servError">
              Internal server error, please try again later
            </p>
          </aside>
        )}
      </section>
    </section>
  );
}
