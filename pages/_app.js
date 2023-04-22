/* pages/_app.js */
import '../styles/globals.css';
import Link from 'next/link';
import Head from 'next/head';

import Profile from '../component/Profile';
import { MyConnectW3M, NEXT_PUBLIC_PROJECT_ID } from '../component/ConnectW3M';
//import ConnectW from '../component/Connect';

import { BellIcon, BeakerIcon } from '@heroicons/react/24/solid';



function N1ce({ Component, pageProps }) {

  return (
    <>
      <div className="">
        <Head>
          <title>N1ce</title>
          <meta charSet="UTF-8" />
          <meta name="description" content="Token Marketplace" />
          <meta name="keywords" content="HTML, CSS, JavaScript" />
          <meta name="author" content="N1ce" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="icon"
            href="/neo-logo-2-11.png"
            type="image/x-icon">
          </link>
        </Head>

        <nav className="w-full bg-cover bg-bottom border-b-4 p-1 shadow-lg">
          <div className="w-full flex flex-row">
            <div className="flex shrink-0">
              <Link href="/">
                <a>
                  <img src="/neo-logo-2-11.png" alt="Logo" class="object-contain align-left " />
                </a>
              </Link>
            </div>
            <div class="ml-5 mt-4 hidden relative md:block">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."></input>
            </div>
            <div className="hidden md:flex items-center ml-10 mt-2">
              <Link href="/">
                <a className="mr-20 text-black  text-2xl font-bold no-underline hover:text-blue-500 hover:underline decoration-2 transition duration-300">
                  Home
                </a>
              </Link>
              <Link href="/metaverse">
                <a className="mr-20 text-black  text-2xl font-bold no-underline hover:text-blue-500 hover:underline decoration-2 transition duration-300">
                  Metaverse
                </a>
              </Link>
              <Link href="/avatar">
                <a className="mr-20 text-black text-2xl font-bold no-underline hover:text-blue-500 hover:underline decoration-2 transition duration-300">
                  Avatar
                </a>
              </Link>
              <Link href="/games">
                <a className="mr-20 text-black text-2xl font-bold no-underline hover:text-blue-500 hover:underline decoration-2 transition duration-300">
                  Games
                </a>
              </Link>
              <Link href="/movies">
                <a className="mr-20 text-black text-2xl font-bold no-underline hover:text-blue-500 hover:underline decoration-2 transition duration-300">
                  Movies
                </a>
              </Link>
              <Link href="/myList">
                <a className="mr-20 text-black text-2xl font-bold no-underline hover:text-blue-500 hover:underline decoration-2 transition duration-300">
                  MyList
                </a>
              </Link>
            </div>
            <div className="mt-6 ml-200 w-100 align-left">
              <BellIcon className="h-8 w-8 text-blue-500" />
            </div>
            <Profile />
          </div>

        </nav>
        <Component {...pageProps} />

      </div>
    </>
  )
}

export default N1ce
