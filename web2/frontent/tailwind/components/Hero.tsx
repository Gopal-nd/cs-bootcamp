import React from 'react'

const Hero = () => {
  return (
    <div className='px-4 py-2 flex items-center flex-col w-full my-20'>
      <div className="border px-4 py-1 rounded-full border-gray-200 font-medium hover:bg-gray-200 transition cursor-pointer duration-200 bg-gray-100 text-gray-900">
        Form 1099s are due by January 31 {' ->'}
      </div>
      < h1 className="font-medium mt-10 text-7xl text-black tracking-tight text-center">Magically simplify <br /> accounting and taxes</h1>
      <p className="max-w-2xl max-auto text-lg text-neutral-700 text-center mt-4 ">Automated bookkeeping. Effortless tax filing. Financial clarity. Set up in 10 mins. Back to building by 4:59pm.</p>
      <div className="flex items-center">
        <button className="bg-[#2579F4] px-6 py-3 rounded-lg text-white font-bold shadow-lg text-shadow-md  tracking-wide mt-8">Get Started</button>
        <button className="ml-4 px-6 py-3 rounded-lg text-neutral-700 font-bold hover:border-neutral-300 hover:bg-neutral-300 transition mt-8">Pricing {'->'}</button>
      </div>
      <h3 className="text-7xl" >
      </h3>
    </div >
  )
}
export default Hero
