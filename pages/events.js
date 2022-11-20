import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import contentfulClient from '../src/contentful_client'

function Event({ eventPost }) {
  return (
    <article className="pb-5 mb-8 border-b-4 last:border-b-0">
      <h2 className='text-3xl mb-5 text-center md:text-left'>{eventPost.title}</h2>
      <img src={eventPost.bannerPhoto.fields.file.url} alt={eventPost.bannerPhoto.fields.description} className="h-full sm:h-96"></img>
      <div className='flex flex-row text-xl my-3 font-medium mx-3 md:mx-0'>
        <p>{new Date(eventPost.time).toDateString()}</p>
        <p className='mx-1'>at</p>
        <p>{eventPost.location}</p>
      </div>
      <div className='text-lg mx-3 md:mx-0'>{documentToReactComponents(eventPost.description)}</div>
    </article>
  )
}

export default function Events({ content }) {
  let upcomingEvents = content.filter((eventPost) => new Date(eventPost.time) >= Date.now())
  let pastEvents = content.filter((eventPost) => new Date(eventPost.time) < Date.now())
  if(upcomingEvents.length == 0 && pastEvents.length == 0){
    return (
      <main className="min-h-screen flex flex-col">
        <h1 className='text-4xl font-medium text-center md:px-0 py-8 md:py-10 my-auto'>Coming Soon!</h1>
      </main>
    )
  } else {
    return (
      <main className="min-h-screen">
        <section>
          <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Upcoming Events</h1>
          <div className='max-w-2xl mx-auto'>
            {upcomingEvents.map((eventPost, idx) => {
              return <Event eventPost={eventPost} key={idx}/>
            })}
          </div>
        </section>
        <section className='pt-8 pb-12'>
          <h1 className='text-4xl pb-10 font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Past Events</h1>
          <div className='max-w-2xl mx-auto'>
            {pastEvents.map((eventPost, idx) => {
              return <Event eventPost={eventPost} key={idx}/>
            })}
          </div>
        </section>
      </main>
    )
  }
}

export async function getStaticProps() {
  let response = await contentfulClient.getEntries({
    content_type: "eventPost",
    order: "-fields.time"
  })

  return {
    props: {
      pageTitle: "Events",
      content: response.items.map((item) => item.fields)
    }
  }
}
