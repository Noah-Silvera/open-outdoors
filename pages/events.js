import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Events({ content }) {
  return (
    <main className="min-h-screen">
      <header>
        <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light'>Events</h1>
      </header>
      {content.map((eventPost, idx) => {
        return (
          <article key={idx} className="max-w-2xl mx-auto pt-12 pb-3 border-b-2 last:pb-12">
            <h2 className='text-3xl mb-5'>{eventPost.title}</h2>
            <img src={eventPost.bannerPhoto.fields.file.url} alt={eventPost.bannerPhoto.fields.description}></img>
            <div className='flex flex-row text-xl my-3 font-medium'>
              <p>{new Date(eventPost.time).toDateString()}</p>
              <p className='mx-1'>at</p>
              <p>{eventPost.location}</p>
            </div>
            <div className='text-lg'>{documentToReactComponents(eventPost.description)}</div>
          </article>
        )
      })}
    </main>
  )
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  let response = await client.getEntries({
    content_type: "eventPost",
    order: "-fields.time"
  })

  return {
    props: {
      content: response.items.map((item) => item.fields)
    }
  }
}
