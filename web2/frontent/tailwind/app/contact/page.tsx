import { Building, Rocket, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { MdSecurity } from 'react-icons/md'

const Contact = () => {
    const statments = [
        {
            title: "Custom pricing and elevated concurrency",
            icon: <Rocket />
        },
        {
            title: "Enterprise-grade security including SOC II, GDPR and HIPAA compliance",
            icon: <MdSecurity />
        },
        {
            title: "Enterprise support and SLA",
            icon: <Building />
        }
    ]
    const url = 'https://elevenlabs.io/assets/contact-sales/nvidia-white.svg'

    return (
        <div className='h-screen w-full font-inter'>
            <div className='grid grid-cols-2 h-full'>
                <div className='flex items-start bg-[#1c1c1c] pt-12 pl-12 text-white flex-col '>
                    <h1 className='text-xl font-bold'>IIElevenLabs</h1>
                    <div className="text-3xl tracking-wide mt-8">
                        <h2>Contact our sales team</h2>
                    </div>
                    {
                        <div className='text-md font-light'>
                            {statments.map((item, index) => (
                                <div key={index} className='flex items-center gap-1 mt-2'>
                                    <div className='bg-transparent p-2 rounded-lg'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className=''>{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <p className='text-sec text-sm'>Trusted by 10,000+ leading businesses</p>
                    <div className='flex flex-row gap-4 p-2 overflow-hidden h-32'>

                        {
                            Array(9).fill(0).map((_, index) => (
                                <Image key={index} src={url} alt="company logo" width={100} height={100} className='h-8 mt-4 animate-me' />
                            ))
                        }
                    </div>

                    <div className="flex gap-2 text-sec items-center justify-center">
                        <div className='flex items-center'>
                            {

                                Array(5).fill(0).map((_, index) => (
                                    <Star key={index} className='fill-current  h-6 w-6' />
                                ))
                            }
                        </div>
                        <p className='text-sm'>
                            4.5 stars and 1,059+ reviews
                        </p>
                    </div>
                    <div className='relative w-full h-full mt-4'>
                        <Image src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fcontact-sales%2Fagents-platform.webp&w=1200&q=80" alt="g2 badge" width={1000} height={1000} className=' absolute top-0 left-0 w-[80%] h-[89%] object-cover rounded-xl 
           transition-all duration-500 ease-in-out
           group-hover:translate-x-12 group-hover:translate-y-12
           z-20 hover:z-30 shadow-3xl border-2 opacity-95' />
                        <Image src="https://elevenlabs.io/_next/image?url=%2Fassets%2Fcontact-sales%2Fcreative-platform.webp&w=1200&q=80" alt="g2 badge" width={1000} height={1000} className='absolute top-8 left-8 w-full h-[90%] object-cover rounded-xl 
           transition-all duration-500 ease-in-out
           group-hover:translate-x-12 group-hover:translate-y-12
           z-10  hover:z-30 hover:shadow-2xl hover:border-2 hover:transition-all hover:duration-500 hover:ease-in-out overflow-hidden opacity-80 hover:opacity-100 ' />


                    </div>
                </div>
                <div className='flex flex-col items-start justify-between p-32  w-full'>
                    <div className='space-y-4'>

                        <h2 className='text-4xl font-normal'>Contact sales form</h2>
                        <p className='text-lg text-neutral-600'>Please fill out the form below to get started</p>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <div className='flex gap-2 flex-col'>
                            <p>Company Website</p>
                            <input type="text" placeholder='11ElevenLabs.io' className='p-2 border border-gray-600 rounded-lg w-full' />
                        </div>
                        <div>
                            <p>Business Email</p>
                            <input type="email" placeholder='name@company.com' className='p-2 border border-gray-600 rounded-lg w-full' />
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full p-2">
                        <button className='px-4 py-2 rounded-full bg-black text-white'>Next</button>

                        <div className='flex items-start gap-4'>
                            <p className='h-2 w-16 bg-black rounded-full' ></p>
                            <p className='h-2 w-16 rounded-full bg-neutral-400' ></p>
                            <p className='h-2 w-16 rounded-full bg-neutral-400' ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact