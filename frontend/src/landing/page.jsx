import React from 'react'
import Navbar from '../app/components/navbar'

const landing = () => {
  return (
    <div className="fade-in">
      <Navbar />
      <div className="border border-white rounded-full h-5 w-5"></div>
      <div className="">
      <div className="relative top-50 justify-center items-center flex flex-col md:flex-row font-mono md:text-5xl text-4xl">
        <div>Welcome to</div>
        <div className="inline-block md:mx-6 font-bold md:text-6xl text-4xl text-purple-500 glow">Toks</div>
      </div>
      </div>
    </div>
  )
}

export default landing
