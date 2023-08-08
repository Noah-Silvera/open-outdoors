import contentfulClient from '../src/server/contentful_client'
import BookedDates from '../src/models/BookedDates'

const Booking = ({ startDate, endDate, bookedBy, requestedGear}) => {
  return (
    <tr className="border-4 border-primary-light">
      <td className="hidden sm:table-cell font-semibold">{bookedBy}</td>
      <td className="hidden sm:table-cell">{new Date(startDate).toLocaleDateString()} -&gt; {new Date(endDate).toLocaleDateString()}</td>
      <td className="break-words w-1/2 px-2 sm:hidden">
        <div className="font-semibold">{bookedBy}</div>
        <div>{new Date(startDate).toLocaleDateString()} -&gt; {new Date(endDate).toLocaleDateString()}</div>
      </td>
      <td className="w-1/3 px-2">{requestedGear.map((requestedGear, idx) => <a key={idx} href={`/gear-library/${requestedGear.id}`} className="underline text-blue-700 break-words" target="_blank">{requestedGear.title}</a>)}</td>
    </tr>
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
        <table className="gap-x-8 sm:mx-10 w-full text-sm sm:text-xl">
          {
            activeBookings.map((booking, idx) => {
              return <Booking startDate={booking.startDate} endDate={booking.endDate} bookedBy={booking.bookedBy} requestedGear={booking.requestedGear} key={idx}></Booking>
            })
          }
        </table>
      </section>
      <section>
        <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Past Bookings</h1>
        <table className="gap-x-8 sm:mx-10 w-full text-sm sm:text-xl">
          {
            pastBookings.map((booking, idx) => {
              return <Booking startDate={booking.startDate} endDate={booking.endDate} bookedBy={booking.bookedBy} requestedGear={booking.requestedGear} key={idx}></Booking>
            })
          }
        </table>
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
