import contentfulClient from '../src/server/contentful_client'
import BookedDates from '../src/models/BookedDates'
import { markAsReturned } from '../src/client/mark_as_returned'
import Script from 'next/script'
import { useState } from 'react'
import { sendGearRequestReceivedEmail, sendReadyForPickupEmail, sendRequestToReturnEmail } from '../src/client/email'

const LoadingSpinner = () => {
  return <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
}

const Booking = ({ startDate, endDate, bookedBy, requestedGear, returned, markAsReturned, markAsReadyForPickup, markAsReceived, markAsStillOut, sendRequestToReturnEmail }) => {
  let [isReturned, setIsReturned] = useState(returned)
  let [loading, setLoading] = useState(false)

  const handleChangeReturnStatus = async () => {
    setLoading(true)
    if(isReturned) {
      await markAsStillOut()
      setIsReturned(false)
    } else {
      await markAsReturned()
      setIsReturned(true)
    }
    setLoading(false)
  }

  const handleSendRequestReceivedEmail = async () => {
    setLoading(true)
    await markAsReceived()
    setLoading(false)
  }

  const handleSendMarkAsReadyForPickupEmail = async () => {
    setLoading(true)
    await markAsReadyForPickup()
    setLoading(false)
  }

  const handleSendRequestToReturnEmail = async () => {
    setLoading(true)
    await sendRequestToReturnEmail()
    setLoading(false)
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
        {loading
          ? <LoadingSpinner/>
          : <><div className='flex flex-row items-center'>
              <label className="mr-2" htmlFor="returned">returned?</label>
              <input type="checkbox"
                checked={isReturned}
                name="returned"
                onChange={handleChangeReturnStatus}
              ></input>
            </div>
            <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={handleSendRequestReceivedEmail}>Send Request Received Email</button>
            <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={handleSendMarkAsReadyForPickupEmail}>Send Pickup Ready Email</button>
            <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={handleSendRequestToReturnEmail}>Send Request To Return Email</button></>
        }
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
