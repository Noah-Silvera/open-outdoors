import DefaultHead from '../components/DefaultHead'
import Nav from '../components/Nav'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'

export default function GearLibrary({ content }) {
  return (
    <>
      <DefaultHead/>
      <div className='navbar-padding'>
        <Nav/>
      </div>
      <main className="min-h-screen" styles={styles["main-container"]}>
        <header>
          <h1 className='header-font text-center mx-auto pb-10 pt-20 bg-tertiary-light'>Gear Library</h1>
          <p className={['text-center py-2 bg-secondary-dark/80 text-2xl text-white', styles["contact-banner"]].join(" ")}>Want to borrow a piece of gear? Contact us at <a className='underline' href="mailto:openoutdoors.victoria@gmail.com">openoutdoors.victoria@gmail.com</a></p>
        </header>
        <div className='bg-white-alt/70 h-screen'>
          <div className={[styles['gear-library-grid'], "mx-auto p-10"].join(" ")}>
            {content.map((gearForLoan, idx) => {
              return <section className={[styles['gear-item'], "shadow-xl rounded-lg bg-tertiary-light/20"].join(" ")} key={idx}>
                <img src={gearForLoan.images[0].fields.file.url} className='mb-5 rounded-tl-lg rounded-tr-lg' alt={gearForLoan.images[0].fields.description}></img>
                <h2 className='text-center'>{gearForLoan.title}</h2>
                <div className='px-5 py-3 text-center'>
                  {documentToReactComponents(gearForLoan.description)}
                </div>
              </section>
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
