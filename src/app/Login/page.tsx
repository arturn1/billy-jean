'use client'

import React, { useState } from 'react';

export default function Auth() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      // Registro
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find((user: any) => user.email === email);
      if (userExists) {
        setError('User already exists. Please log in.');
      } else {
        const newUser = { id: '1', username, email, password };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        setError('Account created successfully. Please log in.');
        setIsRegister(false); // Move para a tela de login
      }
    } else {
      // Login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user: any) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.reload(); // Recarrega para simular o login
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          {isRegister ? 'Criar conta' : 'Logar'}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Nome
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            >
              {isRegister ? 'Registrar' : 'Logar'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-white">
          {isRegister ? (
            <p>
              Já possui conta?{' '}
              <button onClick={() => setIsRegister(false)} className="text-blue-500 hover:underline">
                Logar
              </button>
            </p>
          ) : (
            <p>
              Não possui conta?{' '}
              <button onClick={() => setIsRegister(true)} className="text-blue-500 hover:underline">
                Registrar
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
