"use client"
import React, {useState, useContext} from 'react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from '../../config/axios'
import { UserContext } from '../../context/user_context'

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);

  const navigate = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('/api/user/login', {email, password})
      .then(response => {
        console.log('Login successful:');

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);

        navigate.push('/home');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className="relative grow flex justify-center ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center border-purple-400 border-3 p-10 m-10 rounded-lg shadow-lg bg-white/5 backdrop-blur-md">
        <h2 className="text-3xl mb-1 text-white font-mono">Login to Your</h2>
        <h1 className="text-4xl mb-6 text-purple-500">Account !</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-[#111111] font-mono border-white border text-white px-4 py-2 rounded">
          Login
        </button>
        <p className="mt-4 text-white">
          Don't have an account?{' '}
          <Link href="/register" className="text-gray-500 underline">
            Register here
          </Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default login
