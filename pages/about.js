import Head from 'next/head'
import Nav from '../components/Nav'
import TextBody from '../components/TextBody'

export default function Home() {
  return (
    <>
      <Head>
        <title>Open (out)Doors</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js" async></script>
        <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'></link>
      </Head>
      <div className='pb-24'>
        <Nav/>
      </div>
      <div className="min-h-screen">
        <h1 className='header-font text-center mx-auto py-10 bg-tertiary-light'>About Us</h1>
        <div className='flex items-center justify-center flex-wrap flex-col md:flex-row-reverse sm:px-[20%]  pb-4 sm:pb-0'>
          <img
              src="/bio-photo-wren.png"
              className="max-h-96 py-8"
              alt=""
          />
          <div className='grow align-middle text-center space-y-4'>
            <h2 className='header-font text-3xl'>Wren</h2>
            <p className="text-xl body-font">Bio Bio Bio</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center flex-wrap sm:px-[20%] pb-4 sm:pb-0 bg-tertiary-light'>
          <img
              src="/bio-photo-noah.png"
              className="max-h-96 py-8"
              alt="A picture of Noah Silvera smiling with a cycling helmet on, against the background of a gravel trail"
          />
          <div className='grow align-middle text-center space-y-4'>
            <h2 className='header-font text-3xl'>Noah</h2>
            <p className="text-xl body-font">Bio Bio Bio</p>
          </div>
        </div>
      </div>
    </>
  )
}
