"use client"
import React, {useState} from 'react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from '../../config/axios'

const register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('/api/user/register', {email, password})
      .then(response => {
        console.log('Register successful:');
        navigate.push('/login');
      })
      .catch(error => {
        console.error('There was an error registering!', error);
      });
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className="relative grow flex justify-center ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center border-purple-400 border-3 p-10 m-10 rounded-lg shadow-lg bg-white/5 backdrop-blur-md">
        <h2 className="md:text-3xl text-2xl md:mb-1 text-white font-mono">Register Your</h2>
        <h1 className="md:text-4xl text-3xl mb-6 text-purple-500">Account !</h1>
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
        <button type="submit" className="bg-[#111111] font-mono border-white border text-white px-4 py-2 rounded hover:bg-gray-800 active:bg-gray-700">
          Register
        </button>
        <p className="mt-4 text-white">
          Already have an account{' '}
          <Link href="/login" className="text-blue-900 underline hover:text-blue-700 active:text-black">
            Login here
          </Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default register
