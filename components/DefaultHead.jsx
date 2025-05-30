import Head from 'next/head'

export default function DefaultHead({ title }) {
  let pageTitle = [title, "Open (out)Doors"].filter((val) => !!val).join(" - ")
  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js" async></script>
      <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'></link>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'></link>
    </Head>
  )
}
