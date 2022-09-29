import '../styles/globals.scss'
import { Flowbite } from 'flowbite-react'

function MyApp({ Component, pageProps }) {
  return <Flowbite
    theme={{
      theme: {
        navbar: {
          base: 'border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 !py-0 !pl-0 header-font fixed w-screen md:hover:opacity-100 opacity-90 z-10 nav-background'
        }
      }
    }}
  >
    <Component {...pageProps} />
  </Flowbite>
}

export default MyApp
