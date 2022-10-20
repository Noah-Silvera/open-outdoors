import '../styles/globals.scss'
import '@splidejs/react-splide/css';
import { Flowbite } from 'flowbite-react'
import DefaultHead from '../components/DefaultHead';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return <Flowbite
    theme={{
      theme: {
        navbar: {
          base: 'border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 !py-0 !pl-0 header-font fixed w-screen md:hover:opacity-100 opacity-90 z-20 nav-background',
          collapse: {
            list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-2 lg:space-x-8 md:text-sm md:font-medium'
          }
        },
        footer: {
          groupLink: {
            base: "flex flex-wrap text-sm text-white justify-end align-center",
            link: {
              base: "last:mr-0 mr-4 md:mr-6 flex items-center"
            }
          }
        },
        formControls: {
          label: {
            base: "text-md sm:text-sm font-medium"
          }
        },
        button: {
          color: {
            info: "text-white bg-secondary-light border border-transparent hover:bg-secondary-light/90 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-secondary-light"
          },
          size: {
            xl: "text-xl px-6 py-3"
          }
        }
      }
    }}
  >
    <DefaultHead title={pageProps.pageTitle || null}/>
    <div className='navbar-padding'>
      <Nav/>
    </div>
    <Component {...pageProps} />
    <Footer/>
  </Flowbite>
}

export default MyApp
