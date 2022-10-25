import { Footer } from 'flowbite-react'
import { navLinks } from './utils'

export default function SiteFooter(){
  return (
    <Footer>
      <div className="w-full gap-8 py-5 px-6 bg-secondary-dark/90 text-white">
        <Footer.LinkGroup col={false} className="!text-white justify-end align-center">
          {navLinks.map((navLink, idx) => {
            return (
              <Footer.Link href={navLink["href"]} key={idx} className="mr-4 flex items-center">
                {navLink["text"]}
              </Footer.Link>
            )
          })}
          <Footer.Link href="https://www.instagram.com/open.outdoors/" target="_blank" aria-label="Instagram">
            <span className='text-primary-light md:text-primary-dark'><i aria-hidden="true" className="fab fa-instagram fa-2x pr-5 !text-white" title="Instagram"></i></span>
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </Footer>
  )
}
