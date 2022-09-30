import '../styles/globals.scss'
import '@splidejs/react-splide/css';
import { Flowbite } from 'flowbite-react'
import DefaultHead from '../components/DefaultHead';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }) {
  return <Flowbite
    theme={{
      theme: {
        navbar: {
          base: 'border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 !py-0 !pl-0 header-font fixed w-screen md:hover:opacity-100 opacity-90 z-20 nav-background',
          collapse: {
            list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-2 lg:space-x-8 md:text-sm md:font-medium'
          }
        }
      }
    }}
  >
    <DefaultHead/>
    <div className='navbar-padding'>
      <Nav/>
    </div>
    <Component {...pageProps} />
  </Flowbite>
}

export default MyApp
