
    import React from 'react'

    const LandingPage = () => {
    return (
        <div className=' bg-black h-screen text-white '>
            <div className="flex max-w-7xl mx-auto px-4 py-2 items-center justify-center flex-col pt-10">

            <h1 className='text-6xl font-bold text-center max-w-xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 '>Unleash the power of intutive finance</h1>
            <p className="mx-auto mt-10 max-w-3xl text-center text-xl text-neutral-400 selection:bg-white selection:text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, magni, soluta culpa sunt molestiae autem nemo nisi dicta nulla possimus sed repellat modi recusandae reiciendis <span className='text-blue-500'>lorem</span> numquam similique voluptatem enim et.</p>
            </div>
            <div className="flex justify-center mt-10">
                <input type="text" placeholder='Enter Email' 
                className='mr-4 rounded-xl border border-neutral-700 px-4 text-white placeholder:text-neutral-500 outline-none focus:ring-1 focus:ring-sky-600 transition-all duration-500 '/>
                <button className="px-4 py-2 border border-neutral-700 relative text-white rounded-xl font-semibold cursor-pointer transition-colors ">
                    <span className="absolute inset-x-0 -bottom-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px  "></span>
                    Join Waitlist
                </button>
            </div>
        </div>
    )
    }

    export default LandingPage