import styles from './Nav.module.css'
import { Navbar } from 'flowbite-react'
import { useEffect, useRef } from 'react';
import { shiftUpOnScroll } from './utils';

export default function Nav() {
  const navBarContainer = useRef();

  useEffect(() => {
    if(navBarContainer.current != null) {
      shiftUpOnScroll(navBarContainer.current)
    }
  }, [])

  return (
    <div ref={navBarContainer}>
      <Navbar
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
        <div className={styles.toggle}>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse >
          <Navbar.Link
            href="/gear-library"

          >
            <p className="text-primary-light md:text-primary-dark text-2xl pr-5 py-0 sm:pt-1">Gear Library</p>
          </Navbar.Link>
          <Navbar.Link
            href="/about"

          >
            <p className="text-primary-light md:text-primary-dark text-2xl pr-5 py-0 sm:pt-1">About Us</p>
          </Navbar.Link>
          <Navbar.Link
            href="/contact"

          >
            <p className="text-primary-light md:text-primary-dark text-2xl pr-5 py-0 sm:pt-1">Contact</p>
          </Navbar.Link>

          {/* <Navbar.Link href="/gear-swap">
            <p className="text-primary-light md:text-primary-dark text-2xl pb-2 md:pb-0 pr-5">Gear Swap</p>
          </Navbar.Link> */}
                  <Navbar.Link
            href="https://www.instagram.com/open.outdoors/"
            target="_blank"
            aria-label="Instagram"
          >
            <span className="sm:sr-only text-primary-light md:text-primary-dark text-2xl pr-5 py-0 sm:pt-2">Instagram</span>
            <span className='text-primary-light md:text-primary-dark'><i aria-hidden="true" className="fab fa-instagram fa-3x pr-5" title="Instagram"></i></span>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
