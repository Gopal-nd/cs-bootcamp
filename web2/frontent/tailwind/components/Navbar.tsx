import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  const links = [
    {
      name:"Founders",
      href:'#'
    },
    {
      name:"Guide",
      href:'#'
    },
    {
      name:"Pricing",
      href:'#'
    },
    {
      name:"Login",
      href:'#'
    }
  ]
  return (
 <div className="flex items-center justify-between py-4 px-4">
  <Link href="/">
  <Image src="/logo.svg" draggable={false} loading="lazy" alt="Logo" width={100} height={100} />
  </Link>

<div className="flex items-center gap-8">
  {links.map((link)=>(
    <Link key={link.name} href={link.href} className="text-neutral-700 font-medium hover:text-neutral-500 transition-colors">
      {link.name}
    </Link>
  ))}
  <button className="bg-[#2579F4] px-4 py-2 rounded-lg text-white font-bold shadow-lg text-shadow-md  tracking-wide">Start Free Trail</button>
</div>

 </div>
  )
}

export default Navbar
