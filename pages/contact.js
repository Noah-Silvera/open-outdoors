export default function Contact() {
  return (
    <main className="min-h-screen">
      <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light'>Contact Us</h1>
      <div className='text-center py-20 px-5 text-xl sm:text-2xl md:text-3xl'>
        <p>You can contact us at <a className='underline' href="mailto:openoutdoors.victoria@gmail.com">openoutdoors.victoria@gmail.com</a> or message us on <a className='underline' href='https://www.instagram.com/open.outdoors/' target="_blank" rel="noreferrer" aria-label="Instagram">instagram!</a></p>
      </div>
    </main>
  )
}


export function getStaticProps() {
  return {
    props: {
      pageTitle: "Contact Us",
    }
  }
}
