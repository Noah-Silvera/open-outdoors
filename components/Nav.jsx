import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={"border-gray-200 header-font pr-5 md:pr-10 " + styles["nav-background"]}>
      <div className="flex flex-wrap justify-between items-center">
        <a href="/" className="flex items-center">
            <img src="/logo.png" className="mr-3 h-24" alt="Flowbite Logo" />
            <span className="self-center text-2xl sm:text-3xl font-semibold whitespace-nowrap text-primary-light">Open (out)Doors</span>
        </a>
        <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row pb-2 md:pb-0 md:space-x-8 md:mt-0 md:text-sm md:font-medium text-primary-light md:text-primary-dark">
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 md:p-0 text-2xl hover:text-blue-700" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3  md:p-0 text-2xl hover:text-blue-700">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}
