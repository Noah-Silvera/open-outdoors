import Head from 'next/head'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <>
      <Head>
        <title>Open (out)Doors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
      <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'></link>
      <Nav/>
      <div className="min-h-screen bg-tertiary-light">

      </div>
    </>
  )
}
