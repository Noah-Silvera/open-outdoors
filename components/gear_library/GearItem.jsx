import { Splide, SplideSlide } from '@splidejs/react-splide';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../../styles/gear_library/GearItem.module.scss'
import BorrowForm from './BorrowForm';

export default function GearItem({gearForLoan, ...props}) {
  let bookedDates = gearForLoan.bookedDatesArray || []

  return (
    <section className={[styles['gear-item'], "border shadow-sm rounded-md bg-white-alt/10 flex flex-col"].join(" ")} key={props.index}>
      <Splide>
        {gearForLoan.images.map((image, idx) => {
          return (
            <SplideSlide key={idx}>
              <img
                src={image.url}
                alt={image.description}
                className='mx-auto mb-2 md:mb-3 rounded-tl-md rounded-tr-md'/>
            </SplideSlide>
          )
        })}
      </Splide>
      <h2 className='text-center'><a href={`/gear-library/${gearForLoan.id}`}>{gearForLoan.title}</a></h2>
      <div className={`px-5 py-2 md:py-3 text-center text-lg grow ${styles['gear-description']}`}>
        {documentToReactComponents(gearForLoan.description)}
      </div>
      <div className='border-b-2 border-primary-light mb-4'></div>
      <BorrowForm gearTitle={gearForLoan.title} gearId={gearForLoan.id} bookedDates={bookedDates.map((bookedDate) =>{
        return {startDate: new Date(bookedDate.startDate), endDate: new Date(bookedDate.endDate)}
      })}/>
    </section>
  )
}
