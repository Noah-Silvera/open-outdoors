import styles from '../styles/GearLibrary.module.scss'
import { useState } from 'react'
import GearItem from '../components/gear_library/GearItem';
import FilterPanel from "../components/gear_library/FilterPanel"
import TypeRadioButtons from '../components/gear_library/TypeRadioButtons';
import contentfulClient from '../src/contentful_client';
import { BasicHeader } from '../components/BasicHeader';

function GearItemGrid({gearItems}){
  return (
    <div className={[styles['gear-library-grid'], "mx-auto p-4 md:p-10"].join(" ")}>
    {gearItems.map((gearForLoan, idx) => {
      return <GearItem gearForLoan={gearForLoan} key={idx}/>
    })}
  </div>
  )
}

export default function GearLibrary({ gearItems, pageTitle }) {
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
        <BasicHeader>{pageTitle}</BasicHeader>
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
  console.log(contentfulClient)
  let response = await contentfulClient.getEntries({
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
