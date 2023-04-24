import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/component/header'
import Footer from '@/component/footer'
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
/*
To do:
only show this page if the user is logged in. If they are not, redirect them to the login page.

*/
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      req.session.destroy();
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const props = user;
    return { props };
  },
  sessionOptions
);

export default function Home() {
  return (
    <div>
      {/* {container} */}


      <Head>
      <title>Yoga Class Planning Home</title>
        <meta name="description" content="Yoga Class Planning Home" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <div>
           
          <h1 className={`${inter.className} mb-3 text-2xl font-semibold fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30`}
          >Welcome - Let	&apos;s get creative!</h1>
         
          <Image
                src="https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.svg"
                alt="Butterfly Image"
                className={`${inter.className} mb-3 text-2xl font-semibold justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30`}
                width={100}
                height={24}
                priority
            />
            </div>
            <div
      className="mb-3 grid text-center lg:mb-0 lg:grid-cols-1 px-5 py-4">
      <p
        className={`${inter.className} mb-3 text-2xl font-semibold group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
      >
        <Link href="/exercises">
          <Image
            src="https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.svg"
            alt="Exercises"
            className="justify-center relative flex place-items-center "
            width={100}
            height={24}
            priority
          />
          Movement Library
        </Link>
      </p>
      <p
        className={`${inter.className} mb-3 text-2xl font-semibold group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
      >
        <Link href="/classplans">
          <Image
            src="https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.svg"
            alt="Class Plans"
            className="justify-center"
            width={100}
            height={24}
            priority
          />
          Class Plans
        </Link>
      </p>
    </div>
        </div>
        
      </main>
      


    {/* {container} */}
    </div>
  )
}
