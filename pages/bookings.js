import contentfulClient from '../src/server/contentful_client'
import BookedDates from '../src/models/BookedDates'

const Booking = ({ startDate, endDate, bookedBy, requestedGear}) => {
  return (
    <div className="flex gap-x-8 my-4 mx-auto w-fit text-xl">
      <p>{bookedBy}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p> -&gt; </p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
      <p> - </p>
      {requestedGear.map((requestedGear) => <p>{requestedGear}</p>)}
    </div>
  )
}

export default function Bookings({ content }) {
  let bookedDates = content.map((bookedDatesJSON) => BookedDates.fromJSON(bookedDatesJSON))
  return (
    <main className="min-h-screen">
        <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Active Bookings</h1>
        {
          bookedDates.map((booking) => {
            return <Booking startDate={booking.startDate} endDate={booking.endDate} bookedBy={booking.bookedBy} requestedGear={booking.requestedGear.map((gear) => gear.title)}></Booking>
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
      content: response.items.map((bookedDate) => BookedDates.fromContentfulObject(bookedDate).toJSON())
    }
  }
}
