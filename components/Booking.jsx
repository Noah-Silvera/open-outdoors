import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default ({ startDate, endDate, bookedBy, requestedGear, returned, markAsReturned, markAsReadyForPickup, markAsReceived, markAsStillOut, sendRequestToReturnEmail }) => {
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
