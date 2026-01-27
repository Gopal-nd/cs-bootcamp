'use client'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ResponsivePage = () => {
    const links = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'Contact', href: '#' },
    ]
    const [open, setOpen] = useState(false);
    return (
        <div className="">
            <div className="relative h-screen w-full bg-neutral-200 md:pt-8 ">
                <div className='flex items-center justify-between max-w-4xl mx-auto px-2 py-2 md:rounded-full  bg-white border border-neutral-200 shadow-nd'>
                    <Image src={'https://ui.aceternity.com/logo.png'}
                        alt='logo'
                        width={50}
                        height={30}
                        className='rounded-full' />
                    <div className=" hidden md:flex items-center text-neutral-500">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className=' hover:text-neutral-800 mr-4 font-medium'
                            >{link.name}</Link>
                        ))}
                    </div>
                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        <Menu className='w-8 h-8' />
                    </button>
                {open && (<div className=" flex md:hidden absolute flex-col max-w-[98%] mx-auto inset-0-x top-20 w-full bg-white items-start gap-4 p-4 text-neutral-500 shadow-nd  rounded-lg">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className=' hover:text-neutral-800 mr-4 font-medium'
                        >{link.name}</Link>
                    ))}
                </div>)}
                </div>
            </div>
        </div>
    )
}

export default ResponsivePage   