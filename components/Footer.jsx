import { Footer } from 'flowbite-react'

export default function SiteFooter(){
  return (
    <Footer>
      <div className="w-full gap-8 py-5 px-6 bg-secondary-dark/90 text-white">
        <Footer.LinkGroup col={false}>
          <Footer.Link href="/gear-library">
            Gear Library
          </Footer.Link>
          <Footer.Link href="/about">
            About Us
          </Footer.Link>
          <Footer.Link href="/contact">
            Contact
          </Footer.Link>
          <Footer.Link href="https://www.instagram.com/open.outdoors/" target="_blank" aria-label="Instagram">
            <span className='text-primary-light md:text-primary-dark'><i aria-hidden="true" className="fab fa-instagram fa-2x pr-5 text-white" title="Instagram"></i></span>
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </Footer>
  )
}
