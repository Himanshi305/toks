import React from 'react'
import Navbar from '../app/components/navbar'

const landing = () => {
  return (
    <div className="fade-in">
      <Navbar />
      <div className="border border-white rounded-full h-5 w-5"></div>
      <div className="relative top-50 justify-center items-center flex font-mono text-5xl">Welcome to <div className="inline-block mx-6 font-bold text-6xl text-purple-500">Toks</div></div>
    </div>
  )
}

export default landing
