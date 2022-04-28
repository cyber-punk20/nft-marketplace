import '../styles/globals.css'
import Link from 'next/link'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Sell Digital Assets', href: '/create-item', current: false },
  { name: 'My Digital Assets', href: '/my-assets', current: false },
  { name: 'Creator Dashboard', href: '/creator-dashboard', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Marketplace({ Component, pageProps }) {
  return ( 
    <div>
      {/* <nav className="border-b p-6">
        <p className="font-serif text-blue-500 italic text-center text-5xl font-bold">IoTDATA Marketplace</p>
        <div className="flex mt-4 content-center">
          <Link href="/">
            <a className="mr-4 text-blue-600">
              Home
            </a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 content-center text-blue-400">
              Sell Digital Asset
            </a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 content-center text-blue-400">
              My Digital Assets
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-center text-blue-400">
              Creator Dashboard
            </a>
          </Link>
        </div>
      </nav> */}
      
      {/* Here, the backgrounded is set to gray even in light mode because dark mode isn't working properly on this component, but this needs to be changed if dark mode starts working properly */}
      <nav className="bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5 no-underline dark:bg-gray-800">
        <div className="container no-underline flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex no-underline items-center">
            <img src="/spiral.png" className="mr-3 h-6 sm:h-9" alt="Logo"/>
            <span className="self-center text-xl font-semibold whitespace-nowrap no-underline dark:text-white">IoT Data Marketplace</span>
          </a>
          <div className="flex items-center md:order-2">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="/img_avatar2.png" alt="user photo"/>
            </button>

            <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(1015px, 423px)' }}>
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">John Doe</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">johndoe@email.com</span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 bg-blue-700 rounded md:bg-transparent md:p-0 no-underline dark:text-white" aria-current="page">Home</a>
              </li>
              <li>
                <a href="/create-item" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 no-underline dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sell Digital Assets</a>
              </li>
              <li>
                <a href="/my-assets" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 no-underline dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Assets</a>
              </li>
              <li>
                <a href="/creator-dashboard" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 no-underline dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Creator Dashboard</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>



<Component {...pageProps} /> 
    </div>
  )
}

export default Marketplace