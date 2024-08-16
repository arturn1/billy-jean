'use client'

import { fakeUsers } from '@/data/fakeDatabase';
import React, { useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      const users = fakeUsers;
      const user = users.find((user: any) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.reload();
      } else {
        setError('Invalid credentials. Please try again.');
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">
          Feitosa Sistemas
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none">
              Logar
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-white">
        </div>
      </div>
    </div>
  );
}
