import '../styles/globals.scss'
import '@splidejs/react-splide/css';
import { Flowbite, useThemeMode } from 'flowbite-react'
import DefaultHead from '../components/DefaultHead';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  const [mode, _, toggleMode] = useThemeMode(true)

  if (mode == 'dark'){
    toggleMode()
  }

  return <Flowbite
    theme={{
      theme: {
        navbar: {
          collapse: {
            list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-2 lg:space-x-6 md:font-medium'
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
            lg: "text-lg px-5 py-2.5",
            xl: "text-xl px-6 py-3"
          }
        },
        dropdown: {
          arrowIcon: 'h-8 w-8 lg:h-10 lg:w-10 text-primary-dark pt-2 hidden md:block',
          inlineWrapper: 'flex items-center hidden md:flex',
          floating: {
            style: {
              auto: 'bg-tertiary-light text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white drop-shadow-xl'
            }
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
