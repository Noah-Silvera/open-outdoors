import DefaultHead from '../components/DefaultHead'
import Nav from '../components/Nav'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'
import { useEffect, useRef } from 'react'
import { shiftUpOnScroll } from '../components/utils';

function GearItem({gearForLoan, ...props}) {
  return (
    <section className={[styles['gear-item'], "border shadow-sm rounded-md"].join(" ")} key={props.index}>
      <img src={gearForLoan.images[0].fields.file.url} className=' mb-2 md:mb-3 rounded-tl-md rounded-tr-md' alt={gearForLoan.images[0].fields.description}></img>
      <h2 className='text-center'>{gearForLoan.title}</h2>
      <div className='px-5 py-2 md:py-3 text-center'>
        {documentToReactComponents(gearForLoan.description)}
      </div>
    </section>
  )
}

export default function GearLibrary({ content }) {
  const gearLibraryBanner = useRef();

  useEffect(() => {
    if(gearLibraryBanner.current != null) {
      shiftUpOnScroll(gearLibraryBanner.current)
    }
  }, [])

  return (
    <>
      <DefaultHead/>
      <div className='navbar-padding'>
        <Nav/>
      </div>
      <main className="min-h-screen" styles={styles["main-container"]}>
        <header>
          <h1 className='header-font text-center mx-auto pb-10 pt-24 sm:pt-22 md:pt-20 bg-tertiary-light'>Gear Library</h1>
          <div className='bg-tertiary-light/70'>
            <p className='text-center text-lg md:text-xl px-4 py-5 max-w-4xl mx-auto'>Aquiring outdoor gear can be a significant barrier for like camping, cycling, hiking, and more. We maintain a library of gear that can be taken out for trips to help make them possible!</p>
          </div>
          <p ref={gearLibraryBanner} className={['text-center py-2 px-3 bg-secondary-dark/80 text-md sm:text-lg md:text-2xl text-white', styles["contact-banner"]].join(" ")}>Contact us at <a className='underline' href="mailto:openoutdoors.victoria@gmail.com">openoutdoors.victoria@gmail.com</a> to borrow gear!</p>
        </header>
        <div className='bg-white-alt/70 h-screen'>
          <div className={[styles['gear-library-grid'], "mx-auto p-4 md:p-10"].join(" ")}>
            {content.map((gearForLoan, idx) => {
              return <GearItem gearForLoan={gearForLoan} key={idx}/>
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  let response = await client.getEntries({
    content_type: "gearForLoan",
    order: "sys.createdAt"
  })

  return {
    props: {
      content: response.items.map((item) => item.fields)
    }
  }
}
