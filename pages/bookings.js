import contentfulClient from '../src/server/contentful_client'
import BookedDates from '../src/models/BookedDates'
import { markAsReturned } from '../src/client/mark_as_returned'
import Script from 'next/script'
import { useState } from 'react'
import { sendReadyForPickupEmail } from '../src/client/email'

const Booking = ({ startDate, endDate, bookedBy, requestedGear, returned, markAsReturned, markAsReadyForPickup }) => {
  let [isReturned, setIsReturned] = useState(returned)

  const handleMarkAsReturned = async () => {
    let result = await markAsReturned();
    if(result) {
      setIsReturned(true)
    } else {
      // TODO - throw error
    }
  }

  return (
    <tr className="border-4 border-primary-light">
      <td className="hidden sm:table-cell font-semibold">{bookedBy}</td>
      <td className="hidden sm:table-cell">{new Date(startDate).toLocaleDateString()} -&gt; {new Date(endDate).toLocaleDateString()}</td>
      <td className="break-words w-1/2 px-2 sm:hidden">
        <div className="font-semibold">{bookedBy}</div>
        <div>{new Date(startDate).toLocaleDateString()} -&gt; {new Date(endDate).toLocaleDateString()}</div>
      </td>
      <td className="w-1/3 px-2">{requestedGear.map((requestedGear, idx) => <a key={idx} href={`/gear-library/${requestedGear.id}`} className="underline text-blue-700 break-words" target="_blank">{requestedGear.title}</a>)}</td>
      <td className='flex flex-row'>
        <div className='flex flex-row items-center'>
          <label className="mr-2" htmlFor="returned">returned?</label>
          <input type="checkbox"
            checked={isReturned}
            disabled={isReturned}
            name="returned"
            onChange={handleMarkAsReturned}
          ></input>
        </div>
        <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={markAsReadyForPickup}>Send Pickup Ready Email</button>
      </td>
    </tr>
  )
}

export default function Bookings({ content, recaptchaSiteKey }) {
  let bookedDates = content.map((bookedDatesJSON) => BookedDates.fromJSON(bookedDatesJSON))

  let activeBookings = bookedDates.filter((bookedDate) => new Date(bookedDate.endDate) >= new Date())
  let pastBookings = bookedDates.filter((bookedDate) => new Date(bookedDate.endDate) < new Date())

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} />
      <main className="min-h-screen">
        <section>
          <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Active Bookings</h1>
          <table className="gap-x-8 w-full text-sm sm:text-xl sm:w-[64rem] sm:mx-auto">
            {
              activeBookings.map((booking, idx) => {
                return <Booking startDate={booking.startDate}
                  endDate={booking.endDate}
                  bookedBy={booking.bookedBy}
                  bookedByEmail={booking.bookedByEmail}
                  requestedGear={booking.requestedGear}
                  returned={booking.returned}
                  key={idx}
                  markAsReturned={async () => await markAsReturned(booking.contentfulId, recaptchaSiteKey)}
                  markAsReadyForPickup={async () => await sendReadyForPickupEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
                ></Booking>
              })
            }
          </table>
        </section>
        <section>
          <h1 className='text-4xl font-medium text-center md:px-0 bg-tertiary-light py-8 md:py-10 mb-6 md:mb-10'>Past Bookings</h1>
          <table className="gap-x-8 w-full text-sm sm:text-xl sm:w-[64rem] sm:mx-auto">
            {
              pastBookings.map((booking, idx) => {
                return <Booking startDate={booking.startDate}
                  endDate={booking.endDate}
                  bookedBy={booking.bookedBy}
                  requestedGear={booking.requestedGear}
                  returned={booking.returned}
                  key={idx}
                  markAsReturned={async () => await markAsReturned(booking.contentfulId, recaptchaSiteKey)}
                  markAsReadyForPickup={async () => await sendReadyForPickupEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
                ></Booking>
              })
            }
          </table>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // TODO - replace this with a client side rendered page as we need fresh up to date copies and not these stale copies
  // TODO - is this a problem when we use the contact form also? does it not update the date ranges seen by users?
  let response = await contentfulClient.getEntries({
    content_type: "dateRange",
    order: "-fields.startDate"
  })

  return {
    props: {
      pageTitle: "Active Bookings",
      content: response.items.map((bookedDate) => BookedDates.fromContentfulObject(bookedDate).toJSON()),
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  }
}
