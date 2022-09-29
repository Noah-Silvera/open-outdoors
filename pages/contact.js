import DefaultHead from '../components/DefaultHead'
import Nav from '../components/Nav'

export default function GearLibrary({ content }) {
  return (
    <>
      <DefaultHead/>
      <div className='navbar-padding'>
        <Nav/>
      </div>
      <main className="min-h-screen">
        <h1 className='header-font text-center mx-auto py-12 bg-tertiary-light'>Contact Us</h1>
        <div className='text-center py-20 px-5 text-3xl'>
          <p>You can contact us at <a className='underline' href="mailto:openoutdoors.victoria@gmail.com">openoutdoors.victoria@gmail.com</a> or message us on <a className='underline' href='https://www.instagram.com/open.outdoors/' target="_blank" aria-label="Instagram">instagram!</a></p>
        </div>
      </main>
    </>
  )
}
