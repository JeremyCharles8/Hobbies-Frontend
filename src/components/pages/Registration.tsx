import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignupForm } from '../../types/user.type';

const apiUrl = 'VITE_API_URL';

const signup = async (formData: SignupForm) => {
  try {
    const response = await fetch(`${apiUrl}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    //TODO data type as result or error
    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.error, data: null }
    }

    return { status: response.status, error: null, data };
  } catch (error) {
    console.log('Error sending data');
  }
};

export  default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname : '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  // Update formData with current field value
  const handleChange = async (e: {target: { name: string, value: string }}) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Call signup fetch fonction with formData and redirect to email confirmation page
  const handleSubmit = async (e: { preventDefault: () => void}) => {
    e.preventDefault();

    try {
      const response = await signup(formData);
      //TODO manage error
      navigate('/emailConfirmation');
    } catch (error) {
      console.log('Registration error', error);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input 
        className="form__input" 
        type="text" 
        name="nickname" 
        placeholder="Nickname" 
        required 
        onChange={handleChange}
      />
      <input 
        className="form__input" 
        type="email" name="email" 
        placeholder="Email" 
        required 
        onChange={handleChange}
      />
      <input 
        className="form__input" 
        type="password" 
        name="password" 
        placeholder="Password" 
        required 
        onChange={handleChange}
      />
      <input 
        className="form__input" 
        type="password" 
        name="repeatPassword" 
        placeholder="Repeat Password" 
        required 
        onChange={handleChange}
      />
    </form>
  )
}