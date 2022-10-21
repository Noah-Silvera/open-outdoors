import { Splide, SplideSlide } from '@splidejs/react-splide';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'
import { Button } from 'flowbite-react';
import { useState } from 'react';

export default function GearItem({gearForLoan, ...props}) {
  let [startDate, setStartDate] = useState(null)
  let [endDate, setEndDate] = useState(null)

  let dateRange = startDate && endDate ? `${new Date(startDate).toDateString()} to ${new Date(endDate).toDateString()}` : "<ENTER DATES HERE>"
  let defaultBorrowMessage = `Hi!
I would like to borrow the "${gearForLoan.title}" for the following dates:
${dateRange}`

  let bookedDates = gearForLoan.bookedDates?.filter((bookedDate) => !!bookedDate.fields?.length > 0) || []
  return (
  <section className={[styles['gear-item'], "border shadow-sm rounded-md bg-white-alt/10 flex flex-col"].join(" ")} key={props.index}>
    <Splide>
      {gearForLoan.images.map((contentfulImage, idx) => {
        return (
          <SplideSlide key={idx}>
            <img
              src={contentfulImage.fields.file.url}
              alt={contentfulImage.fields.description}
              className=' mb-2 md:mb-3 rounded-tl-md rounded-tr-md'/>
          </SplideSlide>
        )
      })}
    </Splide>
    <h2 className='text-center'>{gearForLoan.title}</h2>
    <div className={`px-5 py-2 md:py-3 text-center text-lg ${styles['gear-description']}`}>
      {documentToReactComponents(gearForLoan.description)}
    </div>
    <div className='mx-5 mb-2 grow flex flex-col justify-end'>
      <h3 className='text-lg md:text-xl font-medium'>Bookings:</h3>
      {bookedDates.length == 0 ?
        <p className='text-lg md:text-xl my-2'>No Bookings</p> :
        bookedDates.map((bookedDate, idx) => {
          return (
            <div className='flex flex-row text-lg md:text-xl my-2' key={idx}>
              <p className='underline'>{new Date(bookedDate.fields.startDate).toDateString()}</p>
              <p className='mx-2 font-semibold'>to</p>
              <p className='underline'>{new Date(bookedDate.fields.endDate).toDateString()}</p>
            </div>
          )
        })
      }
    </div>
    <div className='border-b-2 border-primary-light mb-6'></div>
    <div className='text-lg'>
      <div className='px-5'>
        <div className='flex flex-row justify-around pb-3'>
          <label for="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}/>
        </div>
        <div className='flex flex-row justify-around pb-3'>
          <label for="end">End date:</label>
          <input
            type="date"
            id="end"
            name="trip-end"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}/>
        </div>
      </div>
      <div className='w-72 mx-auto pb-4 pt-2'>
        <a href={`/contact?message=${encodeURIComponent(defaultBorrowMessage)}`}>
          <Button size="lg">Borrow this!</Button>
        </a>
      </div>
    </div>
  </section>
  )
}
