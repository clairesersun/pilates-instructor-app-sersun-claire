import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/component/header'
import Footer from '@/component/footer'

const inter = Inter({ subsets: ['latin'] })
/*
To do:
only show this page if the user is logged in. If they are not, redirect them to the login page.

*/
export default function Home() {
  return (
    <div>
      {/* {container} */}


      <Head>
      <title>Pilates Class Planning Home</title>
        <meta name="description" content="Pilates Class Planning Home" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          
          <h1 
          className={`${inter.className} mb-3 text-2xl font-semibold fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30`}>Welcome Claire! {/* This will be effected by the user's name */}</h1>
          
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          

          <Link href="/exercises" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Image
                src="/vercel.svg"
                alt="Exercises Icon and Link"
                className="dark:invert"
                width={100}
                height={24}
                priority
            />
            <p
              className={`${inter.className} mb-3 text-2xl font-semibold`}
            >
              Movement Library
            </p>
          </Link>
          <Link href="/feed" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Image
                src="/vercel.svg"
                alt="Feed Icon and Link"
                className="dark:invert"
                width={100}
                height={24}
                priority
            />
            <p
              className={`${inter.className} mb-3 text-2xl font-semibold`}
            >
              Feed
            </p>
          </Link>
          <Link href="/settings" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Image
                src="/vercel.svg"
                alt="Profile Icon and Link"
                className="dark:invert"
                width={100}
                height={24}
                priority
            />
            <p
              className={`${inter.className} mb-3 text-2xl font-semibold`}
            >
              Profile
            </p>
          </Link>
          <Link href="/classplans" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Image
                src="/vercel.svg"
                alt="Class Planning Icon and Link"
                className="dark:invert"
                width={100}
                height={24}
                priority
            />
            <p
              className={`${inter.className} mb-3 text-2xl font-semibold`}
            >
              Class Planning
            </p>
          </Link>



          
        </div>
        <Footer />
      </main>


    {/* {container} */}
    </div>
  )
}
