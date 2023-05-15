import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BasicHeader } from '../components/BasicHeader'
import contentfulClient from '../src/server/contentful_client'

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
    <main className="min-h-screen">
      <BasicHeader>About Us</BasicHeader>
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
  )
}


export async function getStaticProps() {
  let response = await contentfulClient.getEntries({
    content_type: "bio",
    order: "sys.createdAt"
  })

  return {
    props: {
      pageTitle: "About",
      content: response.items.map((item) => item.fields)
    }
  }
}
