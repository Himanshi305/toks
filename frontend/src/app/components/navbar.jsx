import React from 'react'
import Link from 'next/link'

const navbar = () => {
  return (
    <div className='border border-purple-400 p-2 m-2 rounded-3xl flex items-center'>
      <div className="mr-4 font-bold text-purple-500">TOKS</div>
      <div className="gap-50 flex text-white justify-center w-full">
      <Link href="/login" className="font-mono">Login</Link>
      <Link href="/register" className="font-mono">Register</Link>
      <Link href="/" className="font-mono">Home</Link>
      </div>
    </div>
  )
}

export default navbar
