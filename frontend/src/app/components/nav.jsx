"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative z-10 border border-purple-400 p-2 m-2 rounded-3xl flex items-center justify-between'>
      <div className="mr-4 font-bold text-purple-500">TOKS</div>
      <div className="hidden md:flex gap-8 text-white justify-center">
        <Link href="/dashboard" className="font-mono">Dashboard</Link>
        <Link href="/home" className="font-mono">Home</Link>
        <Link href="/logout" className="font-mono text-red-500">Logout</Link>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800/90 md:hidden flex flex-col items-center gap-4 p-4">
          <Link href="/dashboard" className="font-mono text-white">Dashboard</Link>
          <Link href="/home" className="font-mono text-white">Home</Link>
          <Link href="/logout" className="font-mono text-red-500">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
