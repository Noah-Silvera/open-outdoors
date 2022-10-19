import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'
import { useEffect, useRef, useState } from 'react'
import { shiftUpOnScroll } from '../components/utils';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Radio } from 'flowbite-react';
import classNames from 'classnames';

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

function FilterPanel({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div
        className='text-2xl px-6 py-3 bg-tertiary-light/50 flex flex-row items-center border-y-2  border-y-tertiary-light/60'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Filter</p>
        <i className={classNames(
          "fas",
          "grow",
          "text-right",
          {"fa-arrow-up": isOpen},
          {"fa-arrow-down": !isOpen}
          )}></i>
      </div>
      {isOpen && children}
    </div>
  )
}

function TypeRadioButtons({types, onTypeSelect, selectedType}) {
  let typesWithAllOption = ["All", ...types]

  return (
    <div className='flex sm:justify-center px-4 py-5 sm:py-3 text-2xl sm:text-xl bg-tertiary-light/30 sm:px-5 sm:px-5 md:px-10'>
      <div className='flex flex-col sm:flex-row flex-wrap gap-y-4 gap-x-3 w-full'>
        {typesWithAllOption.map((type, index) => {
          let idAndVal = type.replace(/ /g,"_").toLowerCase();
          let isSelected = type == "All" ?
            selectedType == null :
            selectedType == type;

          return (
            <div key={index} className={classNames(
                "py-2",
                "px-3",
                "rounded-2xl",
                "flex",
                "items-center",
                styles["min-gear-item-width"],
                {"bg-secondary-dark/20": isSelected}
            )}>
              <Radio
                id={idAndVal}
                name="gear_types"
                value={idAndVal}
                checked={isSelected}
                onChange={() => onTypeSelect(type == "All" ? null : type)}
              />
              <label htmlFor={idAndVal} className="ml-2 grow">{type} </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GearItemGrid({gearItems}){
  return (
    <div className={[styles['gear-library-grid'], "mx-auto p-4 md:p-10"].join(" ")}>
    {gearItems.map((gearForLoan, idx) => {
      return <GearItem gearForLoan={gearForLoan} key={idx}/>
    })}
  </div>
  )
}

export default function GearLibrary({ gearItems }) {
  const gearLibraryBanner = useRef();
  const [selectedGearType, setSelectedGearType] = useState(null);

  let gearTypes = new Set(gearItems.map((gearForLoan) => {
    if (gearForLoan.types) {
      return gearForLoan.types.map((type) => type.fields['type'])
    } else {
      return []
    }
  }).flat())

  const filteredGearItems = gearItems.filter((item) => selectedGearType == null || item.types.some((typeObj) => typeObj.fields['type'] == selectedGearType))

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
          <p className='text-center text-xl px-4 py-5 max-w-4xl mx-auto'>Aquiring outdoor gear can be a significant barrier for like camping, cycling, hiking, and more. We maintain a library of gear that can be taken out for trips to help make them possible!</p>
        </div>
        <p ref={gearLibraryBanner} className={['text-center py-2 px-3 bg-secondary-dark/80 text-md sm:text-lg md:text-2xl text-white z-10', styles["contact-banner"]].join(" ")}>Contact us at <a className='underline' href="mailto:openoutdoors.victoria@gmail.com">openoutdoors.victoria@gmail.com</a> to borrow gear!</p>
      </header>
      <div className='bg-white-alt/40 h-full'>
        <FilterPanel>
          <TypeRadioButtons
            types={Array.from(gearTypes)}
            onTypeSelect={(type) => setSelectedGearType(type)}
            selectedType={selectedGearType}/>
        </FilterPanel>
        <GearItemGrid gearItems={filteredGearItems}></GearItemGrid>
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
      gearItems: response.items.map((item) => item.fields)
    }
  }
}
