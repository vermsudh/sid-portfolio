import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/navbar-logo.png'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[1000] w-full h-[70px] bg-[rgba(245,245,220,0.8)] backdrop-blur-[6px] border-b border-[rgba(26,26,26,0.08)] flex items-center max-[560px]:h-auto max-[560px]:py-[14px]">
      <div className="w-full max-w-[1264px] mx-auto px-8 flex items-center justify-between box-border max-[768px]:px-5 max-[560px]:flex-col max-[560px]:gap-3">
        <a href="/#hero" className="relative flex items-center justify-center w-[52px] h-[52px] shrink-0 overflow-hidden rounded-full no-underline leading-none group">
          <Image
            src={logo}
            alt="Sudhanshu logo"
            fill
            className="object-contain object-center scale-[1.18] transition-transform duration-[250ms] ease-out group-hover:scale-[2.2]"
          />
        </a>

        <div className="flex items-center gap-[30px] max-[768px]:gap-[18px] max-[560px]:flex-wrap max-[560px]:justify-center max-[560px]:gap-4">
          <a href="/#about" className="relative font-sans text-[15px] font-medium text-[#333] no-underline py-1 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-brand-dark after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 max-[768px]:text-[14px]">About</a>
          <a href="/#experience" className="relative font-sans text-[15px] font-medium text-[#333] no-underline py-1 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-brand-dark after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 max-[768px]:text-[14px]">Experience</a>
          <a href="/#skills" className="relative font-sans text-[15px] font-medium text-[#333] no-underline py-1 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-brand-dark after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 max-[768px]:text-[14px]">Skills</a>
          <Link href="/projects" className="relative font-sans text-[15px] font-medium text-[#333] no-underline py-1 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-brand-dark after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 max-[768px]:text-[14px]">Projects</Link>
          <a href="/#contact" className="relative font-sans text-[15px] font-medium text-[#333] no-underline py-1 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-brand-dark after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 max-[768px]:text-[14px]">Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
