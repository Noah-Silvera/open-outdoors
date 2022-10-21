import { createClient } from 'contentful'
import styles from '../styles/GearLibrary.module.scss'
import { useEffect, useRef, useState } from 'react'
import { shiftUpOnScroll } from '../components/utils';
import { Radio } from 'flowbite-react';
import classNames from 'classnames';
import GearItem from '../components/GearItem';

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
        <p ref={gearLibraryBanner} className={['text-center py-2 px-3 bg-secondary-dark/80 text-md sm:text-lg md:text-2xl text-white z-10', styles["contact-banner"]].join(" ")}><a className='underline' href="/contact">Contact us to borrow gear!</a></p>
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
