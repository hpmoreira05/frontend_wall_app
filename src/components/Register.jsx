import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const verifyName = () => {
    if (name === '') {
      setError('Name is required');
    }
  };

  const verifyEmail = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    if (email === '') {
      setError('Email is required');
      return;
    }
    if (!reg) {
      setError('Invalid email format');
    }
  };

  return (
    <section>
      <div>
        <div>
          <h2>Register</h2>
          <label htmlFor="name">
            Nome completo
            <input
              id="name"
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirmar senha
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmar senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="btnLogin">
            Create account
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
