import { Navbar } from 'flowbite-react'
import { useEffect, useRef } from 'react';
import { hideOnScroll, navLinks } from '../src/utils';
import { Dropdown } from 'flowbite-react';
import classNames from 'classnames';

function StyledLinkText({children, className}) {
  return (
    <p className={classNames("text-primary-light md:text-primary-dark text-xl lg:text-2xl py-0 hover:text-secondary-dark wider-spacing", className)}>{children}</p>
  )
}

function WrappedNavbarLink({ href, title, hiddenOnDesktop, className }){
  return (
    <div className={classNames(className, {"md:hidden": hiddenOnDesktop})}>
      <Navbar.Link
        className='hover:bg-secondary-light'
        href={href}>
        <StyledLinkText className="md:pr-2 lg:pr-5 sm:pt-1">{title}</StyledLinkText>
      </Navbar.Link>
    </div>
  )
}

function DropdownNavbarLink({ href, title, hiddenOnDesktop }){
  return (
    <div className={classNames("py-3", {"md:hidden": hiddenOnDesktop})}>
      <a
        className='hover:bg-secondary-light'
        href={href}>
        <StyledLinkText className="md:pr-2 lg:pr-5 sm:pt-1">{title}</StyledLinkText>
      </a>
    </div>
  )
}

function NavbarDropdown({navLinks, label}) {
  return (
    <Dropdown
      label={<StyledLinkText className="sm:pt-1">{label}</StyledLinkText>}
      inline={true}
      placement="bottom"
    >
      {navLinks.map((navLink, idx) => {
        return (
          <>
            <Dropdown.Item className='!py-0 hover:bg-tertiary-light/60'>
                <DropdownNavbarLink
                  key={idx}
                  href={navLink["href"]}
                  title={navLink["text"]}
                  hiddenOnDesktop={navLink["hiddenOnDesktop"]}/>
            </Dropdown.Item>
          </>
        )
      })}
    </Dropdown>
  )
}

function NavbarLinks({ navLinks, maxLinksDisplayed }) {
  return (
    <>
      {navLinks.slice(0,maxLinksDisplayed).map((navLink, idx) => {
        return (
          <WrappedNavbarLink
            key={idx}
            href={navLink["href"]}
            title={navLink["text"]}
            hiddenOnDesktop={navLink["hiddenOnDesktop"]}/>
        )
      })}
      {navLinks.slice(maxLinksDisplayed).map((navLink, idx) => {
        return (
          <WrappedNavbarLink
            className="md:hidden"
            key={idx}
            href={navLink["href"]}
            title={navLink["text"]}
            hiddenOnDesktop={navLink["hiddenOnDesktop"]}/>
        )
      })}
      <NavbarDropdown label="More" navLinks={navLinks.slice(3)}/>
    </>
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
        <Navbar.Toggle className='!text-primary-dark !bg-secondary-light hover:!bg-secondary-light focus:!ring-0'/>
        <Navbar.Collapse>
          <NavbarLinks navLinks={navLinks} maxLinksDisplayed={3}/>
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
