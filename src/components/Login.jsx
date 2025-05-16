import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import logo from '../images/Logo.png';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser(form);
      // зберігаємо токен і ім'я
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      // переходимо на головну
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка при вході');
    }
  };

  return (
    <div className="register">
      {/* Логотип і назва */}
      <Link to="/" className="register__logo">
        <img src={logo} alt="EcoPulse Logo" className="logo-icon" />
        <span className="sidebar-text">EcoPulse</span>
      </Link>

      <form className="register__form" onSubmit={handleSubmit}>
        <h2>Увійти в акаунт</h2>
        {error && <p className="register__error">{error}</p>}

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
            required
          />
        </label>

        <button type="submit">Увійти</button>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Ще немає акаунту? <Link to="/register">Зареєструватися</Link>
        </p>
      </form>
    </div>
  );
}
