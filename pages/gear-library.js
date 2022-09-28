import DefaultHead from '../components/DefaultHead'
import Nav from '../components/Nav'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'

export default function GearLibrary({ content }) {
  return (
    <>
      <DefaultHead/>
      <div className='pb-24'>
        <Nav/>
      </div>
      <div className="min-h-screen" styles={styles["main-container"]}>
        <h1 className='header-font text-center mx-auto py-10 bg-tertiary-light'>Gear Library</h1>
        <div className='bg-white-alt/70'>
          <div className={[styles['gear-library-grid'], "mx-auto p-10"].join(" ")}>
            {content.map((gearForLoan, idx) => {
              return <div className={[styles['gear-item'], "shadow-xl rounded-lg bg-tertiary-light/20"].join(" ")} key={idx}>
                <img src={gearForLoan.images[0].fields.file.url} className='mb-5 rounded-tl-lg rounded-tr-lg'></img>
                <h2 className='text-center'>{gearForLoan.title}</h2>
                <div className='px-5 py-3 text-center'>
                  {documentToReactComponents(gearForLoan.description)}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
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
