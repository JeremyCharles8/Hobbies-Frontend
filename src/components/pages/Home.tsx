import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
//TODO define formData, formData type and make env variable for API_URL
const API_URL = '';

const signin = async (formData: SigninForm) => {
  try {
    const response = await fetch(`${API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    });
    //TODO data type as result or error
    const data = await response.json();
    console.log(data);
    if(!response.ok) {
      return { status: response.status, error: data.error, data: null };
    }

    return { status: response.status, error: null, data };
  } catch (error) {
    console.log('Error sending data', error);
  }
};

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Redirect to profile page if cookie exists
  useEffect(() => {
    //TODO
    const token = document.cookie;
    console.log(token);

    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  // Update formData with current field value
  const handleChange = async (e: {target: {name: string, value: string}}) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Call login fetch function with formData and redirect to profile page
  const handleSubmit = async (e: { preventDefault: () => void}) => {
    e.preventDefault();

    try {
      const response = await signin(formData);
      // TODO manage error
      navigate('/profile');
    } catch(error) {
      console.log('login error', error);
    }
  };

  return (
    <section className="home">
      <section className="home__left ">
        <article className="home__article">
          <title className="home__title">Lorem ipsum</title>
          <p className="home__presentation">Lorem ipsum</p>
        </article>
      </section>
      <section className="home__right">
        <article className="home__article">
          <header className="home__header">
            <h2 className="home__title">Sign in</h2>
          </header>
          <form className="home__form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password" 
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit" className="home__form__button">
              Log in
            </button>
          </form>
          <footer className="home__footer">
            <h3 className="home__title">OR</h3>
            <p>If you don't already have an acount</p>
            <NavLink className="home__signup" to="/signup">
              Sign up
            </NavLink>
          </footer>
        </article>
      </section>
    </section>
  );
};
