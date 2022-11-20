import { Navbar } from 'flowbite-react'
import { useEffect, useRef } from 'react';
import { hideOnScroll, navLinks } from '../src/utils';

function TextNavLink({ href, title, hiddenOnDesktop }){
  return (
    <div className={hiddenOnDesktop ? "md:hidden": ""}>
      <Navbar.Link
        className='hover:bg-secondary-light'
        href={href}>
        <p className="text-primary-light md:text-primary-dark text-xl lg:text-2xl md:pr-2 lg:pr-5 py-0 sm:pt-1 hover:text-secondary-dark">{title}</p>
      </Navbar.Link>
    </div>
  )
}

export default function Nav() {
  const navBarContainer = useRef();

  useEffect(() => {
    if(navBarContainer.current != null) {
      hideOnScroll(navBarContainer.current, "nav")
    }
  }, [])

  return (
    <div ref={navBarContainer}>
      <Navbar
        className="!py-0 !pl-0 header-font fixed w-screen md:hover:opacity-100 opacity-90 z-20 nav-background"
        fluid={true}
      >
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            width="96"
            height="96"
            className="mr-3 h-24 opacity-100"
            alt="Open (out)Doors"
          />
          <span className="self-center whitespace-nowrap text-2xl sm:text-3xl font-semibold text-primary-light">
            Open (out)Doors
          </span>
        </Navbar.Brand>
        <Navbar.Toggle className='text-primary-dark bg-secondary-light hover:bg-secondary-light focus:ring-primary-dark/60'/>
        <Navbar.Collapse>
          {navLinks.map((navLink, idx) => {
            return (
              <TextNavLink
                key={idx}
                href={navLink["href"]}
                title={navLink["text"]}
                hiddenOnDesktop={navLink["hiddenOnDesktop"]}/>
            )
          })}
          <Navbar.Link
            href="https://www.instagram.com/open.outdoors/"
            target="_blank"
            aria-label="Instagram"
          >
            <span className="md:sr-only text-primary-light md:text-primary-dark text-2xl pr-5 py-0 sm:pt-2">Instagram</span>
            <span className='text-primary-light md:text-primary-dark'><i aria-hidden="true" className="fab fa-instagram text-3xl md:text-4xl pr-5" title="Instagram"></i></span>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
