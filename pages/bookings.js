import contentfulClient from '../src/server/contentful_client'
import BookedDates from '../src/models/BookedDates'
import { markAsReturned } from '../src/client/mark_as_returned'
import Script from 'next/script'
import { sendGearRequestReceivedEmail, sendReadyForPickupEmail, sendRequestToReturnEmail } from '../src/client/email'
import Booking from '../components/Booking'

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
                  markAsReturned={async () => await markAsReturned(booking.contentfulId, true, recaptchaSiteKey)}
                  markAsStillOut={async () => await markAsReturned(booking.contentfulId, false, recaptchaSiteKey)}
                  markAsReadyForPickup={async () => await sendReadyForPickupEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
                  markAsReceived={async () => await sendGearRequestReceivedEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
                  sendRequestToReturnEmail={async () => await sendRequestToReturnEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
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
                  markAsReturned={async () => await markAsReturned(booking.contentfulId, true, recaptchaSiteKey)}
                  markAsStillOut={async () => await markAsReturned(booking.contentfulId, false, recaptchaSiteKey)}
                  markAsReadyForPickup={async () => await sendReadyForPickupEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
                  markAsReceived={async () => await sendGearRequestReceivedEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
                  sendRequestToReturnEmail={async () => await sendRequestToReturnEmail(booking.bookedByEmail, booking.bookedBy, recaptchaSiteKey)}
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
