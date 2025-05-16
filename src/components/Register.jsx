import { useState } from 'react';
import { registerUser } from '../api/auth';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png';

export default function Register() {
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await registerUser(form);
      if (response.status === 201) setSuccess(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Цей email вже зареєстровано');
      } else {
        setError(err.response?.data?.message || 'Сталася помилка');
      }
    }
  };

  if (success) {
    return (
      <div className="register">
      <Link to="/" className="register__logo">
        <img src={logo} alt="EcoPulse Logo" className="logo-icon" />
        <span className="logo-text">EcoPulse</span>
      </Link>
        <h2>Реєстрація успішна!</h2>
      </div>
    );
  }

  return (
    <div className="register">
      {/* Логотип і назва */}
      <Link to="/" className="register__logo">
        <img src={logo} alt="EcoPulse Logo" className="logo-icon" />
        <span className="logo-text">EcoPulse</span>
      </Link>

      <form className="register__form" onSubmit={handleSubmit}>
        <h2>Створити акаунт</h2>
        {error && <p className="register__error">{error}</p>}
        <label>
          Ім’я
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </label>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}
