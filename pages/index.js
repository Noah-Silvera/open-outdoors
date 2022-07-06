import Head from 'next/head'
import LeftSideText from '../components/LeftSideText'
import Nav from '../components/Nav'
import RightSideText from '../components/RightSideText'
import TextBody from '../components/TextBody'

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
      <div className="min-h-screen">
        <div className='bg-tertiary-light'>
          <img
            src="/banner-mobile.jpg"
            className="max-h-96 w-full md:w-3/5 md:max-w-2xl mx-auto sm:hidden"
            alt="Open (out)Doors"
          />
          <img
            src="/banner.jpg"
            className="max-h-96 w-full md:w-3/5 md:max-w-2xl mx-auto hidden sm:block"
          />
        </div>
        <div className='bg-white h-full pt-2 sm:pt-10'>
          <div className='w-5/6 sm:w-4/5 md:w-3/5 md:max-w-2xl mx-auto space-y-7'>
            <h1 className='header-font hidden sm:block'>Open (out)Doors</h1>
            <LeftSideText>
              <TextBody>
                <p>
                  Open Outdoors is a Queer led organization that seeks to minimize the barriers to accessing the outdoors for groups that have been historically isolated from the outdoors industry.
                </p>
              </TextBody>
            </LeftSideText>
            <RightSideText>
              <TextBody>
                <p>
                  We consist of a few people excited to share their knowledge and resources to help queer people and other marginalized groups get outside and hike, camp, cycle, and more.
                </p>
              </TextBody>
            </RightSideText>
            <LeftSideText>
              <TextBody>
                <p>This organization is still in it's infancy but our dreams include:</p>
              </TextBody>
            </LeftSideText>
          </div>
        </div>
      </div>
    </>
  )
}
