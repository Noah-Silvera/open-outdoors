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
      {requestedGear.map((requestedGear, idx) => <a key={idx} href={`/gear-library/${requestedGear.id}`} className="underline text-blue-700" target="_blank">{requestedGear.title}</a>)}
    </div>
  )
}

export default function Bookings({ content }) {
  let bookedDates = content.map((bookedDatesJSON) => BookedDates.fromJSON(bookedDatesJSON))

  let activeBookings = bookedDates.filter((bookedDate) => new Date(bookedDate.endDate) >= new Date())
  let pastBookings = bookedDates.filter((bookedDate) => new Date(bookedDate.endDate) < new Date())

  return (
    <main className="min-h-screen">
      <section>
        <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Active Bookings</h1>
        {
          activeBookings.map((booking, idx) => {
            return <Booking startDate={booking.startDate} endDate={booking.endDate} bookedBy={booking.bookedBy} requestedGear={booking.requestedGear} key={idx}></Booking>
          })
        }
      </section>
      <section>
        <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Past Bookings</h1>
        {
          pastBookings.map((booking, idx) => {
            return <Booking startDate={booking.startDate} endDate={booking.endDate} bookedBy={booking.bookedBy} requestedGear={booking.requestedGear} key={idx}></Booking>
          })
        }
      </section>
    </main>
  )
}

export async function getStaticProps() {
  let response = await contentfulClient.getEntries({
    content_type: "dateRange",
    order: "-fields.startDate"
  })

  return {
    props: {
      pageTitle: "Active Bookings",
      content: response.items.map((bookedDate) => BookedDates.fromContentfulObject(bookedDate).toJSON())
    }
  }
}
