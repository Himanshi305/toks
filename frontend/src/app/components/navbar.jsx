"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border border-purple-400 p-2 m-2 rounded-3xl flex items-center justify-between'>
      <div className="mr-4 font-bold text-purple-500">TOKS</div>
      <div className="hidden md:flex gap-8 text-white justify-center">
        <Link href="/login" className="font-mono">Login</Link>
        <Link href="/register" className="font-mono">Register</Link>
        <Link href="/" className="font-mono">Home</Link>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800/90 md:hidden flex flex-col items-center gap-4 p-4">
          <Link href="/login" className="font-mono text-white">Login</Link>
          <Link href="/register" className="font-mono text-white">Register</Link>
          <Link href="/" className="font-mono text-white">Home</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
