import Head from 'next/head'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <>
      <Head>
        <title>Open (out)Doors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js" async></script>
      <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'></link>
      <div className='pb-24 sm:pb-0'>
        <Nav/>
      </div>
      <div className="min-h-screen bg-tertiary-light">
        <img
          src="/banner-mobile.jpg"
          className="max-h-96 w-full md:w-3/5 md:max-w-2xl mx-auto sm:hidden"
          alt="Open (out)Doors"
        />
        <img
          src="/banner.jpg"
          className="max-h-96 w-full md:w-3/5 md:max-w-2xl mx-auto hidden sm:block"
        />
        <div className='bg-white h-full pt-2 sm:pt-10'>
          <hr className='bg-secondary-light h-1 w-11/12 mx-auto border-0 hidden sm:block mb-10'/>
          <div className='w-5/6 sm:w-4/5 md:w-3/5 md:max-w-2xl mx-auto space-y-5'>
            <h1 className='header-font hidden sm:block'>Open (out)Doors</h1>
            <p className='text-xl body-font'>Open Outdoors is a Queer led organization that seeks to minimize the financial and logistical barriers to accessing the outdoors for groups that have been historically isolated from the outdoors industry.</p>
          </div>
        </div>
      </div>
    </>
  )
}
