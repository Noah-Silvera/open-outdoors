import { Splide, SplideSlide } from '@splidejs/react-splide';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../../styles/gear_library/GearItem.module.scss'
import { Button } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from "react-transition-group"
import classNames from 'classnames';
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import isWithinInterval from 'date-fns/isWithinInterval'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'

const humanizeDateInputString = (inputDateString) => {
  var extractSimpleDate = new RegExp("([a-zA-z]+,\\s+\\d+\\s+[a-zA-z]+\\s+\\d+)", "g");
  let utcString = new Date(inputDateString).toUTCString()
  let match = extractSimpleDate.exec(utcString)
  return match[1]
}

function BorrowForm({gearTitle, gearId, defaultFormOpen, className, bookedDates}) {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
  let [formOpen, setFormOpen] = useState(defaultFormOpen)
  let [dateRangeInvalid, setDateRangeInvalid] = useState(false)
  let dateRange = startDate && endDate ? `${humanizeDateInputString(startDate)} to ${humanizeDateInputString(endDate)}` : "<ENTER DATES HERE>"

  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }

  const isWithinBookedDateRange = (date) => {
    return bookedDates.some((bookedDateRange) => {
      return isWithinInterval(date, {
        start: bookedDateRange.startDate,
        end: bookedDateRange.endDate
      })
    })
  }

  const generateContactFormLink = () => {
    let parameters = new URLSearchParams()

    parameters.set("message", defaultBorrowMessage)
    parameters.set("gearId", gearId)

    if(startDate && endDate) {
      parameters.set("startDate", startDate.toISOString())
      parameters.set("endDate", endDate.toISOString())
    }

    return `/contact?${parameters.toString()}`
  }

  let defaultBorrowMessage = `Hi!
  I would like to borrow the "${gearTitle}" for the following dates:
  ${dateRange}`
  const bookingFormRef = useRef(null);

  const modifiers = {
    highlight: (date) => isWithinBookedDateRange(date)
  }

  const modifiersClassNames = {
    highlight: '-highlight'
  }

  useEffect(() => {
    if(startDate && endDate) {
      let invalidDateFound = eachDayOfInterval({start: startDate, end: endDate}).some((date) => {
        if(isWithinBookedDateRange(date)){
          return true
        }
      })
      setDateRangeInvalid(invalidDateFound)
    }
  }, [startDate, endDate])

  return (
    <div className={classNames('text-lg', className)}>
      <CSSTransition
        in={formOpen}
        nodeRef={bookingFormRef}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: styles["borrow-form-enter"],
          enterActive: styles["borrow-form-enter-active"],
          exit: styles["borrow-form-exit"],
          exitActive: styles["borrow-form-exit-active"],
        }}>
        <div className={classNames('px-5','mb-2', styles["borrow-form"])} ref={bookingFormRef}>
          <div className='justify-around pb-3'>
            <DateRangePickerCalendar
              startDate={startDate}
              endDate={endDate}
              focus={focus}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onFocusChange={handleFocusChange}
              locale={enGB}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
            />
          </div>
        </div>
      </CSSTransition>
      <div className='w-72 mx-auto pb-4'>
        {formOpen ?
        (
          <a href={generateContactFormLink()} className={classNames({"pointer-events-none": dateRangeInvalid})}>
            {dateRangeInvalid && <p className="text-red-500 text-sm pb-3">A date in your selected range has already been booked</p>}
            <Button size="lg" className='w-full' disabled={dateRangeInvalid || (!startDate && !endDate)}>Book now!</Button>
          </a>
        ) :
        (
          <Button size="lg" className='w-full' onClick={() => setFormOpen(true)}>Borrow this!</Button>
        )}
      </div>
    </div>
  )
}

export default function GearItem({gearForLoan, ...props}) {
  let bookedDates = gearForLoan.bookedDates?.filter((bookedDate) => !!Object.keys(bookedDate.fields || {}).length > 0) || []

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
      <div className={`px-5 py-2 md:py-3 text-center text-lg grow ${styles['gear-description']}`}>
        {documentToReactComponents(gearForLoan.description)}
      </div>
      <div className='border-b-2 border-primary-light mb-4'></div>
      <BorrowForm gearTitle={gearForLoan.title} gearId={gearForLoan.id} bookedDates={bookedDates.map((bookedDate) =>{
        return {startDate: new Date(bookedDate.fields.startDate), endDate: new Date(bookedDate.fields.endDate)}
      })}/>
    </section>
  )
}
