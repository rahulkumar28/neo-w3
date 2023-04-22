
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../component/Footer';
import MyCarousel from '../component/Carousel';
import MyPlan from '../component/MyPlan';

import Starsvg from '../component/Starsvg';
import Ethsvg from '../component/ethsvg';


//import { MyConnectW3M } from '../component/ConnectW3M';

import { metaverse } from "../helpers/metaverseH";
import { avatars } from "../helpers/avatarsH";
import { games } from "../helpers/gamesH";
import { movies } from "../helpers/moviesH";

/*
export let myMovies = [movies[0], movies[1]];
export let myAvatars = [avatars[0], avatars[1]];
export let myGames = [games[0], games[1]];
export let myMetaverse = [metaverse[0], metaverse[1]];
*/
export let myMovies = [];
export let myAvatars = [];
export let myGames = [];
export let myMetaverse = [];

export default function Home() {

  return (
    <>
      <Head>
        <title>Explore</title>
        <link
          rel="icon"
          href="/n1ce-2.png"
          type="image/x-icon">
        </link>
      </Head>

      <div className="w-full items-center">
        <h1 className="text-black  text-4xl font-bold text-center mt-10">Explore Contents & Subcribe with Tokens
        </h1>
        <div className="flex flex-col gap-3 overflow-scroll mt-3">
          <h1 className="text-black  text-2xl font-bold text-left mt-10">Metaverse
          </h1>
          <div className="flex flex-row gap-2 overflow-scroll overflow-y-hidden ">
            {metaverse && (
              metaverse.map((e, idx) => {
                return (
                  < div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" >
                    <a href="#">
                      <img class="w-full h-40 p-8 rounded-t-lg hover:scale-150 hover:cursor-pointer ease-in-out duration-300" src={e.Image} alt="product image" />
                    </a>
                    <div class="px-5 pb-5">
                      <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-ellipsis">{e.Description}</h5>
                      </a>
                      <div class="flex items-center mt-2.5 mb-5">
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <Ethsvg />
                        <span class="text-l font-bold text-gray-900 dark:text-white">{e.Price}/mo</span>
                        <Link href={`/post/meta/${idx}`}>
                          <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            )

            }
          </div>
          <h1 className="text-black  text-2xl font-bold text-left mt-10">Avatars
          </h1>
          <div className="flex flex-row gap-2 overflow-scroll overflow-y-hidden mt-3">
            {avatars && (
              avatars.map((e, idx) => {
                return (
                  <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img class="w-full h-40 p-8 rounded-t-lg hover:scale-150 hover:cursor-pointer ease-in-out duration-300" src={e.Image} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-ellipsis">{e.Description}</h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="">
                          <Ethsvg />
                          <span className="text-l font-bold text-gray-900 dark:text-white">{e.Price}</span>
                        </div>
                        <Link href={`/post/av/${idx}`}>
                          <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            )

            }
          </div>
          <h1 className="text-black  text-2xl font-bold text-left mt-10">Games
          </h1>
          <div className="flex flex-row gap-2 overflow-scroll overflow-y-hidden mt-3">
            {games && (
              games.map((e, idx) => {
                return (
                  <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img class="w-full h-40 p-8 rounded-t-lg hover:scale-150 hover:cursor-pointer ease-in-out duration-300" src={e.Image} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-ellipsis">{e.Description}</h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="">
                          <Ethsvg />
                          <span className="text-l font-bold text-gray-900 dark:text-white">{e.Price}</span>
                        </div>
                        <Link href={`/post/gm/${idx}`}>
                          <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            )

            }
          </div>
          <h1 className="text-black  text-2xl font-bold text-left mt-10">Movies
          </h1>
          <div className="flex flex-row gap-2 overflow-scroll overflow-y-hidden mt-3">
            {movies && (
              movies.map((e, idx) => {
                return (
                  <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img class="w-full h-40 p-8 rounded-t-lg hover:scale-150 hover:cursor-pointer ease-in-out duration-300" src={e.Image} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-ellipsis">{e.Name}</h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <Starsvg />
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="">
                          <Ethsvg />
                          <span className="text-l font-bold text-gray-900 dark:text-white">{e.Price}</span>
                        </div>
                        <Link href={`/post/mv/${idx}`}>
                          <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            )

            }
          </div>
        </div>
        <Footer />

      </div>

    </>
  )
}
