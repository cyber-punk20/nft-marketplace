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
      
<Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  /> */}
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://s1.ax1x.com/2022/04/25/LIA2nK.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          
        </>
      )}
    </Disclosure>

<Component {...pageProps} /> 
    </div>
  )
}

export default Marketplace