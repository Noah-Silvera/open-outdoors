import contentfulClient from '../src/server/contentful_client'

const Booking = ({ startDate, endDate, bookedBy}) => {
  return (
    <div className="flex gap-x-8 my-4 mx-auto w-fit text-xl">
      <p>{bookedBy}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p> - </p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
    </div>
  )
}

export default function Bookings({ content }) {
  return (
    <main className="min-h-screen">
        <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Active Bookings</h1>
        {
          content.map((booking) => {
            return <Booking startDate={booking.fields.startDate} endDate={booking.fields.endDate} bookedBy={booking.fields.bookedBy}></Booking>
          })
        }
    </main>
  )
}

export async function getStaticProps() {
  let response = await contentfulClient.getEntries({
    content_type: "dateRange",
    order: "-fields.startDate",
    'fields.endDate[gte]': new Date().toISOString()
  })

  return {
    props: {
      pageTitle: "Active Bookings",
      content: response.items
    }
  }
}
