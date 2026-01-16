import React from 'react'
import Link from 'next/link'

const nav = () => {
  return (
    <div className='border border-purple-400 p-2 m-2 rounded-3xl flex items-center'>
      <div className="mr-4 font-bold text-white">TOKS</div>
      <div className="gap-50 flex text-white justify-center w-full">
      <Link href="/dashboard" className="font-mono">Dashboard</Link>
      <Link href="/home" className="font-mono">Home</Link>
      <Link href="/logout" className="font-mono text-red-500">Logout</Link>
      </div>
    </div>
  )
}

export default nav
