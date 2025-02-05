import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import Cookies from 'js-cookie';


const LoginPage: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    setError('');

    try {
      const response = await fetch('http://185.170.198.166:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      Cookies.set('token', data.data, { expires: 7, path: '/' });


      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log(data)

      alert('Login successful!');
      window.location.href = '/user/home';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600">Welcome Back to HealthHub!</h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-10 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-10 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button 
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-500 py-2 text-white font-semibold transition hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
