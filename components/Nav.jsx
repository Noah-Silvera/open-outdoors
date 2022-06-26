import styles from './Nav.module.css'
import Link from 'next/link'
import { Navbar } from 'flowbite-react'

export default function Nav() {
  return (
    <Navbar
      fluid={true}
      className={"!py-0 !pl-0 header-font " + styles["nav-background"]}
    >
      <Navbar.Brand href="/">
        <img
          src="/logo.png"
          className="mr-3 h-24"
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
          href="#"

        >
          <p className="text-primary-light md:text-primary-dark text-2xl">About</p>
        </Navbar.Link>
        <Navbar.Link href="#">
          <p className="text-primary-light md:text-primary-dark text-2xl pb-2 md:pb-0">Gear Swap</p>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
