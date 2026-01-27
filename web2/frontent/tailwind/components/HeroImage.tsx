import Image from 'next/image'
import React from 'react'

const HeroImage = () => {
    return (
        <div className='  w-full'>
            <div className="h-px w-full absolute inset-x-0 bg-gradient-to-r from-neutral-300/50 via-neutral-200 to-transparent pointer-events-none z-0">
                <div className='max-w-7xl mx-auto w-full p-4'>

                    <Image src="/hero-image.webp" alt="Hero Image" width={1000} height={1000} className='rounded-xl object-cover w-full object-left-top border border-neutral-200 shadow-md mask-b-from-0% to-10%' />
                </div>
            </div>
        </div>
    )
}

export default HeroImage