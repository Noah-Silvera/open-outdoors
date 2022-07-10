import Head from 'next/head'
import Nav from '../components/Nav'

function BioCard({name, className, imgSrc, ...props}) {
  return (
    <div className={['flex items-center justify-center flex-wrap flex-col px-8 sm:px-[20%] pb-12', className].filter(String).join(" ")}>
          <img
              src={imgSrc}
              className="max-h-96 py-8"
              alt=""
          />
          <div className='grow align-middle text-center space-y-4'>
            <h2 className='header-font text-3xl'>{name}</h2>
            <div className="text-xl body-font space-y-4">{props.children}</div>
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
        >
          <p>Hello! My name is Wren Shaman and I am happy with she/her and they/them pronouns! I'm a white settler of British and Yugoslavian descent, and I was born on the lands of the Sinixt and Ktunaxa nations and spent the first 19 years of my life there. I grew up spending lots of time outdoors with my family, and learned a lot from my parents. I moved to the lands of the Lekwungen speaking peoples about 5 years ago, and enjoy spending time outdoors and organizing in community to build the kind of world I want to live in!</p>
          <p>I relate to queerness in a few ways that influence my life and how I interact with the outdoors industry. Firstly, I identify as a bisexual person and interact with queerness in my sexuality! But also, I identify with queerness in the sense of <i>"queer as being about the self that is at odds with everything around it and has to invent, create and find a place to speak and to thrive and to live"</i> (Bell Hooks) and being at odds with the exploitative systems we are currently living under. This sentiment leads me to a deep love for connecting with people and communities, building networks that care for one another, and using my privilege to minimize barriers for folks to access spaces that I have previously taken my access to for granted.</p>
          <p>I've been an avid camper, backpacker, and skier for my whole life, and am passionate about sharing the knowledge I've acquired in that realm. I also enjoy learning about botany and entomology, and am eager to share what knowledge I have! Recently, I have been eager to get into bikepacking and touring, so I am excited to connect with folks about that! I would say something I'm good at is getting outdoors for cheap!</p>
        </BioCard>
        <BioCard className="md:flex-row bg-tertiary-light"
          name="Noah"
          imgSrc="/bio-photo-noah.png"
        >
        </BioCard>
      </div>
    </>
  )
}
