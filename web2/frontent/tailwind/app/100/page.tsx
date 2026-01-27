import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CourseLandingpage = () => {
  return (
    <div className='h-screen w-screen'>
        <nav className='flex items-center  max-w-6xl mx-auto justify-between  bg-white p-2'>
            <div className='flex items-center gap-4'>
                <h1 className='font-bold text-xl'>100<span className='text-red-600'>X</span>devs</h1>
                <Link href="#">Home</Link>
                <Link href='#'>Courses</Link>
                <Link href='#'>About</Link>
            </div>
            <div className='flex items-center gap-4'>
                <div  className='flex items-center border border-neutral-400 p-2 rounded-lg'>
                <Search className='w-4 h-4'/>
                <input type="text" className='ml-2' placeholder='Enter Something' />
                </div>
                <div className='bg-blue-500 text-white font-bold h-10 w-10 rounded-full flex items-center justify-center'>
                    G
                </div>
            </div>
        </nav>
        <div className='bg-[#fafafa] h-full'>
        <div className="grid grid-cols-2 h-full max-w-6xl mx-auto">
            <div className='flex flex-col items-start space-y-4 justify-center gap-4 '>
                <p className='flex items-center p-2 rounded-full border border-dotted gap-1'>
                    <p className='w-4 h-4 bg-blue-500 rounded-full'></p>
                    Join 100,000+ enrolled students today
                </p>
                <h1 className='text-6xl font-bold text-blue-800 '>
                    Master Full Stack Development
                </h1>
                <p className='text-lg text-neutral-700 '>Master Full Stack Development through hands-on open source projects. Join a community of developers transforming their careers with practical, real-world programming skills.</p>
                <div className='flex gap-4 items-center'>
                    <button className='bg-blue-500 text-white font-bold px-6 py-3 rounded-lg'>Learn More
                    </button>
                    <button className=' bg-white text-blue-500 font-bold px-6 py-3 rounded-lg border border-neutral-400'>Explore Courses</button>
                </div>
            </div>
        <div className='flex items-center justify-between p-10'>
            <img src="https://harkirat.classx.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-img.3fed4f92.png&w=1080&q=75&dpl=dpl_Ce1Dfs4UqcnXf8pGjhjpt6v1iu9T" alt="" />

        </div>
        </div>
<div className='
  w-full h-40 grid grid-cols-3 
  max-w-6xl mx-auto 
  bg-blue-600 
  items-center justify-center 
  gap-4 px-10
  
  rounded-tr-[300px]
  rounded-tl-lg
  rounded-bl-lg
  rounded-br-lg
  text-white
  font-bold
  text-2xl
'>
    <div className="">
        27
    </div>
    <div className=" flex items-center gap-4 mr-4">
        <div className='h-16 w-px  rounded-2xl bg-white'></div>
        $150k+
    </div>
     <div className=" flex items-center gap-4 mr-4">
        <div className='h-16 w-px  rounded-2xl bg-white'></div>
        200+
    </div>
</div>





  
        </div>

    </div>
  )
}

export default CourseLandingpage