import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'
import { useEffect, useRef } from 'react'
import { shiftUpOnScroll } from '../components/utils';
import { Splide, SplideSlide } from '@splidejs/react-splide';

function GearItem({gearForLoan, ...props}) {
  let bookedDates = gearForLoan.bookedDates?.filter((bookedDate) => !!bookedDate.fields?.length > 0) || []
  return (
  <section className={[styles['gear-item'], "border shadow-sm rounded-md bg-white-alt/10 flex flex-col"].join(" ")} key={props.index}>
    <Splide>
      {gearForLoan.images.map((contentfulImage, idx) => {
        return (
          <SplideSlide key={idx}>
            <img
              src={contentfulImage.fields.file.url}
              alt={contentfulImage.fields.description}
              className=' mb-2 md:mb-3 rounded-tl-md rounded-tr-md'/>
          </SplideSlide>
        )
      })}
    </Splide>
    <h2 className='text-center'>{gearForLoan.title}</h2>
    <div className={`px-5 py-2 md:py-3 text-center text-lg ${styles['gear-description']}`}>
      {documentToReactComponents(gearForLoan.description)}
    </div>
    <div className='mx-5 mb-2 grow flex flex-col justify-end'>
      <h3 className='text-lg md:text-xl font-medium'>Bookings:</h3>
      {bookedDates.length == 0 ?
        <p className='text-lg md:text-xl my-2'>No Bookings</p> :
        bookedDates.map((bookedDate, idx) => {
          return (
            <div className='flex flex-row text-lg md:text-xl my-2' key={idx}>
              <p className='underline'>{new Date(bookedDate.fields.startDate).toDateString()}</p>
              <p className='mx-2 font-semibold'>to</p>
              <p className='underline'>{new Date(bookedDate.fields.endDate).toDateString()}</p>
            </div>
          )
        })
      }
    </div>
  </section>
  )
}

function TypeRadioButtons({types}) {
  return (
    <div className='flex flex-row'>
      {types.map((type, index) => {
        let idAndVal = type.replace(/ /g,"_").toLowerCase();
        return (
          <div key={index}>
            <label htmlFor={idAndVal}>{type}</label>
            <input type="radio" id={idAndVal} name="gear_types" value={idAndVal}/>
          </div>
        )
      })}
    </div>
  )
}

export default function GearLibrary({ content }) {
  let types = new Set(content.map((gearForLoan) => {
    if (gearForLoan.types) {
      return gearForLoan.types.map((type) => type.fields['type'])
    } else {
      return []
    }
  }).flat())

  const gearLibraryBanner = useRef();

  useEffect(() => {
    if(gearLibraryBanner.current != null) {
      shiftUpOnScroll(gearLibraryBanner.current)
    }
  }, [])

  return (
    <main styles={styles["main-container"]}>
      <header>
        <h1 className='header-font text-center mx-auto pb-5 md:pb-10 pt-20 sm:pt-16 md:pt-20 bg-tertiary-light'>Gear Library</h1>
        <div className='bg-tertiary-light/70'>
          <p className='text-center text-lg md:text-xl px-4 py-5 max-w-4xl mx-auto'>Aquiring outdoor gear can be a significant barrier for like camping, cycling, hiking, and more. We maintain a library of gear that can be taken out for trips to help make them possible!</p>
        </div>
        <p ref={gearLibraryBanner} className={['text-center py-2 px-3 bg-secondary-dark/80 text-md sm:text-lg md:text-2xl text-white z-10', styles["contact-banner"]].join(" ")}>Contact us at <a className='underline' href="mailto:openoutdoors.victoria@gmail.com">openoutdoors.victoria@gmail.com</a> to borrow gear!</p>
      </header>
      <div className='bg-white-alt/40 h-full'>
        {/* <TypeRadioButtons types={Array.from(types)}/> */}
        <div className={[styles['gear-library-grid'], "mx-auto p-4 md:p-10"].join(" ")}>
          {content.map((gearForLoan, idx) => {
            return <GearItem gearForLoan={gearForLoan} key={idx}/>
          })}
        </div>
      </div>
    </main>
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
      pageTitle: "Gear Library",
      content: response.items.map((item) => item.fields)
    }
  }
}
