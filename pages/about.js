import Head from 'next/head'
import Nav from '../components/Nav'

function BioCard({name, bio, className, imgSrc, ...props}) {
  return (
    <div className={['flex items-center justify-center flex-wrap flex-col sm:px-[20%] pb-4 sm:pb-0', className].filter(String).join(" ")}>
          <img
              src={imgSrc}
              className="max-h-96 py-8"
              alt=""
          />
          <div className='grow align-middle text-center space-y-4'>
            <h2 className='header-font text-3xl'>{name}</h2>
            <p className="text-xl body-font">{bio}</p>
          </div>
        </div>
  )
}

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
        <BioCard className="md:flex-row-reverse"
          name="Wren"
          imgSrc="/bio-photo-wren.png"
          bio="Bio Bio Bio"
        ></BioCard>
        <BioCard className="md:flex-row bg-tertiary-light"
          name="Noah"
          imgSrc="/bio-photo-noah.png"
          bio="Bio Bio Bio"
        ></BioCard>
      </div>
    </>
  )
}
