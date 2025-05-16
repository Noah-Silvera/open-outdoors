import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function Booking({ startDate, endDate, bookedBy, requestedGear, returned, markAsReturned, pickedUp, markAsPickedUp, markAsNotPickedUp, markAsReadyForPickup, markAsReceived, markAsStillOut, sendRequestToReturnEmail, updateGear, gearTypeMap }) {
  let [isReturned, setIsReturned] = useState(returned)
  let [isPickedUp, setIsPickedUp] = useState(pickedUp)
  let [loading, setLoading] = useState(false)
  let [currentGearArray, setCurrentGearArray] = useState(requestedGear)

  const handleChangeReturnStatus = async () => {
    setLoading(true)
    if (isReturned) {
      await markAsStillOut()
      setIsReturned(false)
    } else {
      await markAsReturned()
      setIsReturned(true)
    }
    setLoading(false)
  }

  const handleChangePickupStatus = async () => {
    setLoading(true)
    if (isPickedUp) {
      await markAsNotPickedUp()
      setIsPickedUp(false)
    } else {
      await markAsPickedUp()
      setIsPickedUp(true)
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

  const handleChangeGear = async (oldGear, newGear) => {
    setLoading(true)
    if (confirm("Are you sure you want to change the gear for this booking from " + oldGear.title + " to " + newGear.title + "?") == true) {
      let { error, newGearForLoan } = await updateGear(oldGear, newGear)
      if (error) {
        alert(error)
        setCurrentGearArray([...currentGearArray])
      } else {
        let newGearArray = currentGearArray.filter((gear) => gear.id !== oldGear.id)
        newGearArray.push(newGearForLoan)
        setCurrentGearArray(newGearArray)
      }
    } else {
      setCurrentGearArray([...currentGearArray])
    }
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
      <td className="w-1/3 px-2">
        {loading
          ? <LoadingSpinner />
          : <div>
            {currentGearArray.map((gear, idx) => {
              return (
                <div className='flex flex-row items-center' key={idx}>
                  <GearSelect gearTypeMap={gearTypeMap} selectedGear={gear} onChange={handleChangeGear} key={idx} />
                  <a href={`/gear-library/${gear.id}`} target="_blank">
                    <span className='underline text-blue-500 flex flex-row items-center'><i aria-hidden="true" className="fas fa-external-link-alt pl-3" title="View Gear">
                    </i></span>
                  </a>
                </div>
              )
            })}</div>
        }
      </td>
      <td className='flex flex-row'>
        {loading
          ? <LoadingSpinner />
          : <>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex flex-row items-center text-xs border-2 m-1 p-1'>
                <label className="mr-2" htmlFor="returned">picked up?</label>
                <input type="checkbox"
                  checked={isPickedUp}
                  name="returned"
                  onChange={handleChangePickupStatus}
                ></input>
              </div>
              <div className='flex flex-row items-center text-xs border-2 m-1 p-1'>
                <label className="mr-2" htmlFor="returned">returned?</label>
                <input type="checkbox"
                  checked={isReturned}
                  name="returned"
                  onChange={handleChangeReturnStatus}
                ></input>
              </div>
            </div>
            <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={handleSendRequestReceivedEmail}>Send Request Received Email</button>
            <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={handleSendMarkAsReadyForPickupEmail}>Send Pickup Ready Email</button>
            <button className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded text-sm ml-5' onClick={handleSendRequestToReturnEmail}>Send Request To Return Email</button></>
        }
      </td>
    </tr>
  )
}

function GearSelect({ gearTypeMap, selectedGear, key, onChange }) {
  let allGear = Object.values(gearTypeMap).flatMap((x) => x);
  let typeMapCopy = { ...gearTypeMap };
  let relatedGear = {}
  let unrelatedGear = {}
  selectedGear.types.forEach((type) => {
    relatedGear[type] = typeMapCopy[type]
    delete typeMapCopy[type]
  })

  Object.keys(typeMapCopy).forEach((type) => {
    unrelatedGear[type] = typeMapCopy[type]
  })

  return <select key={key} defaultValue={selectedGear.id} onChange={(e) => onChange(selectedGear, allGear.find((x) => x.id === e.target.value))}>
    <option value={selectedGear.id} key={`${key}-${selectedGear.id}`}>{selectedGear.title}</option>
    {Object.keys(relatedGear).map((type) => {
      return <optgroup label={`Other ${type}`} key={`${key}-${type}`}>
        {relatedGear[type].map((gear) => {
          return <option value={gear.id} key={`${key}-${gear.id}`}>{gear.title}</option>
        })}
      </optgroup>
    })}
    {Object.keys(unrelatedGear).map((type) => {
      return <optgroup label={type} key={`${key}-${type}`}>
        {unrelatedGear[type].map((gear) => {
          return <option value={gear.id} key={`${key}-${gear.id}`}>{gear.title}</option>
        })}
      </optgroup>
    })}
  </select>
}
