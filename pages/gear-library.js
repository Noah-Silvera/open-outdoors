import { createClient } from 'contentful'
import styles from '../styles/GearLibrary.module.scss'
import { useState } from 'react'
import GearItem from '../components/gear_library/GearItem';
import FilterPanel from "../components/gear_library/FilterPanel"
import TypeRadioButtons from '../components/gear_library/TypeRadioButtons';

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
  const [selectedGearType, setSelectedGearType] = useState(null);

  let gearTypes = new Set(gearItems.map((gearForLoan) => {
    if (gearForLoan.types) {
      return gearForLoan.types.map((type) => type.fields['type'])
    } else {
      return []
    }
  }).flat())

  const filteredGearItems = gearItems.filter((item) => selectedGearType == null || item.types.some((typeObj) => typeObj.fields['type'] == selectedGearType))

  return (
    <main styles={styles["main-container"]}>
      <header>
        <h1 className='header-font text-center mx-auto pb-5 md:pb-10 pt-5 md:pt-10 bg-tertiary-light'>Gear Library</h1>
        <div className='bg-tertiary-light/70'>
          <p className='text-center text-xl px-4 py-5 max-w-4xl mx-auto'>Aquiring outdoor gear can be a significant barrier for like camping, cycling, hiking, and more. We maintain a library of gear that can be taken out for trips to help make them possible!</p>
        </div>
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
