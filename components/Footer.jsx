import { Footer } from 'flowbite-react'
import { navLinks } from '../src/utils'

function sliceIntoChunks(array, chunkSize) {
  const result = [];
  let leftover_amount = array.length % chunkSize;
  let idx = 0
  let firstChunk = array.slice(idx, leftover_amount)
  result.push(firstChunk)
  console.log(result)
  idx += leftover_amount;
  while (idx < array.length) {
    const chunk = array.slice(idx, (idx+chunkSize));
    result.push(chunk);
    idx += chunkSize
  }
  return result;
}

export default function SiteFooter(){
  return (
    <Footer className='justify-self-end grow flex flex-col !justify-end'>
      <div className="w-full gap-4 py-5 px-6 bg-secondary-dark/90 text-white flex justify-end">
        {sliceIntoChunks(navLinks, 2).map((navLinkChunk) =>{
          return (
            <Footer.LinkGroup col={true} className="!text-white justify-start align-right space-y-2">
            {navLinkChunk.map((navLink, idx) => {
              return (
                  <Footer.Link href={navLink["href"]} key={idx} className="text-center">
                    {navLink["text"]}
                  </Footer.Link>
              )
            })}
            </Footer.LinkGroup>
          )
        })}
        <Footer.LinkGroup col={true} className="!text-white justify-center align-center ml-4">
          <Footer.Link href="https://www.instagram.com/open.outdoors/" target="_blank" aria-label="Instagram">
            <span className='text-primary-light md:text-primary-dark'><i aria-hidden="true" className="fab fa-instagram fa-2x pr-5 !text-white" title="Instagram"></i></span>
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </Footer>
  )
}
