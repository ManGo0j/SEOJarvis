import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomAuth } from '../../components/custom/useCustomAuth';
import { ENV_CONFIG } from '../../config/environment';
import { NAVIGATION_ROUTES } from '../../config/constants';
import '../../styles/managementPortal.css';

const CustomLoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useCustomAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(NAVIGATION_ROUTES.CUSTOM_AUTOMATION_DASHBOARD(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate(NAVIGATION_ROUTES.CUSTOM_AUTOMATION_DASHBOARD(), { replace: true });
    } catch (err) {
      setError(err.message || 'Неверный логин или пароль');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="management-page">
      <header className="management-header">
        <h1>{ENV_CONFIG.APP.NAME}</h1>
      </header>

      <main className="management-login-wrap">
        <div className="management-login-portal-shell">
          <div className="management-login-portal-header">
            <p className="management-login-portal-eyebrow">{ENV_CONFIG.APP.NAME}</p>
            <h2 className="management-login-portal-title">Вход в кабинет</h2>
            <p className="management-login-portal-subtitle">{ENV_CONFIG.APP.TAGLINE}</p>
          </div>

          <form className="management-login-card" onSubmit={handleSubmit}>
            <h2>Вход</h2>

            <label htmlFor="cabinet-login">Логин</label>
            <input
              id="cabinet-login"
              type="text"
              className="management-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              disabled={isSubmitting}
            />

            <label htmlFor="cabinet-password">Пароль</label>
            <input
              id="cabinet-password"
              type="password"
              className="management-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={isSubmitting}
            />

            {error ? <div className="management-error">{error}</div> : null}

            <button type="submit" className="btn btn-black management-login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Проверка...' : 'Войти'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CustomLoginPage;
