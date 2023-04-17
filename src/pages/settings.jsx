import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "@/component/header";
import Footer from "@/component/footer";

const inter = Inter({ subsets: ["latin"] });

/*
To do:
only show this page if the user is logged in. If they are not, redirect them to the login page.

*/

export default function Settings() {
  return (
    <div>
      {/* {container} */}

      <Head>
        <title>Pilates Class Planning Settings</title>
        <meta name="description" content="Pilates Class Planning Settings" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <Image
            src="/vercel.svg"
            alt="Profile Photo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <h1
            className={`${inter.className} mb-3 text-2xl font-semibold fixed left-0 top-0 flex w-full justify-center border-b border-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30`}
          >
            Claire {/* This will be effected by the user's name */}
          </h1>
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
          <h2>username {/*This will be effected by the user's info */}</h2>
          <p>public {/*This will be effected by the user's info */}</p>
          <h2>email {/*This will be effected by the user's info */}</h2>
          <p>public {/*This will be effected by the user's info */}</p>
          <h2>IG handle {/*This will be effected by the user's info */}</h2>
          <p>public {/*This will be effected by the user's info */}</p>
          <h2>About {/*This will be effected by the user's info */}</h2>
          <p>public {/*This will be effected by the user's info */}</p>
          <p>
            About text blah blah {/*This will be effected by the user's info */}
          </p>

          {/*Include additional info if the edit button is selected. I'm thinking if the button is not selected show the info this way, but if it is, show the information this way.*/}
        </div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <button>Edit</button>
        </div>
        <Footer />
      </main>

      {/* {container} */}
    </div>
  );
}
