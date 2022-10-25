import { Splide, SplideSlide } from '@splidejs/react-splide';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/GearLibrary.module.scss'
import { Button } from 'flowbite-react';
import { useState, useRef } from 'react';
import { CSSTransition } from "react-transition-group"
import classNames from 'classnames';

const humanizeDateInputString = (inputDateString) => {
  var extractSimpleDate = new RegExp("([a-zA-z]+,\\s+\\d+\\s+[a-zA-z]+\\s+\\d+)", "g");
  let utcString = new Date(inputDateString).toUTCString()
  let match = extractSimpleDate.exec(utcString)
  return match[1]
}

function BorrowForm({gearIdentifier, defaultFormOpen, className}) {
  let [startDate, setStartDate] = useState("")
  let [endDate, setEndDate] = useState("")
  let [formOpen, setFormOpen] = useState(defaultFormOpen)

  let dateRange = startDate && endDate ? `${humanizeDateInputString(startDate)} to ${humanizeDateInputString(endDate)}` : "<ENTER DATES HERE>"

  let defaultBorrowMessage = `Hi!
  I would like to borrow the "${gearIdentifier}" for the following dates:
  ${dateRange}`
  const bookingFormRef = useRef(null);

  return (
    <div className={classNames('text-lg', className)}>
      <CSSTransition
        in={formOpen}
        nodeRef={bookingFormRef}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: styles["booking-form-enter"],
          enterActive: styles["booking-form-enter-active"],
          exit: styles["booking-form-exit"],
          exitActive: styles["booking-form-exit-active"],
        }}>
        <div className={classNames('px-5','mb-2', styles["booking-form"])} ref={bookingFormRef}>
          <div className='flex flex-row justify-around pb-3'>
            <label htmlFor="start">Start date:</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              className='w-40'
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}/>
          </div>
          <div className='flex flex-row justify-around pb-3'>
            <label htmlFor="end">End date:</label>
            <input
              type="date"
              id="end"
              name="trip-end"
              className='w-40'
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}/>
          </div>
        </div>
      </CSSTransition>
      <div className='w-72 mx-auto pb-4'>
        {formOpen ?
        (
          <a href={`/contact?message=${encodeURIComponent(defaultBorrowMessage)}`}>
            <Button size="lg" className='w-full'>Book now!</Button>
          </a>
        ) :
        (
          <Button size="lg" className='w-full' onClick={() => setFormOpen(true)}>Borrow this!</Button>
        )}
      </div>
    </div>
  )
}

function Bookings({ bookedDates }) {
  return (
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
  )
}

export default function GearItem({gearForLoan, ...props}) {
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
      <Bookings bookedDates={bookedDates}/>
      <div className='border-b-2 border-primary-light mb-4'></div>
      <BorrowForm gearIdentifier={gearForLoan.title} className="hidden sm:block" defaultFormOpen={true}/>
      <BorrowForm gearIdentifier={gearForLoan.title} className="sm:hidden"/>
    </section>
  )
}
