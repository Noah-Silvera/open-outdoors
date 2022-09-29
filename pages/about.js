import DefaultHead from '../components/DefaultHead'
import Nav from '../components/Nav'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function BioCard({name, className, imgSrc, imgAlt, ...props}) {
  return (
    <div className={['flex items-center justify-center flex-wrap flex-col px-8 sm:px-[20%] pb-12', className].filter(String).join(" ")}>
        <img
            src={imgSrc}
            className="max-h-96 py-8"
            alt={imgAlt}
        />
        <div className='grow align-middle text-center space-y-4'>
          <h2 className='header-font text-3xl'>{name}</h2>
          <div className="text-xl body-font space-y-4">{props.children}</div>
        </div>
      </div>
  )
}

export default function About({ content }) {
  return (
    <>
      <DefaultHead/>
      <div className='navbar-padding'>
        <Nav/>
      </div>
      <main className="min-h-screen">
        <header>
          <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light'>About Us</h1>
        </header>
        {content.map((bio, idx) => {
          return <section key={bio.name}>
            <BioCard
              className={`md:flex-row-reverse ${idx % 2 == 1 && "bg-tertiary-light"}`}
              name={bio.name}
              imgSrc={`https://${bio.photo.fields.file.url}`}
              imgAlt={bio.photo.fields.description}
              >
                {documentToReactComponents(bio.body)}
            </BioCard>
          </section>
        })}
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
    content_type: "bio",
    order: "sys.createdAt"
  })

  return {
    props: {
      content: response.items.map((item) => item.fields)
    }
  }
}
