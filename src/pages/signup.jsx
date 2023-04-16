import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

/* 
    Create a ServerSide Props with IronSessions
    Within the signup function
        handle change
        handle reate account
*/

export default function Signup(props) {
  return (
    <div>
      {/* {container} */}

      <Head>
        <title>Pilates Class Planning Login</title>
        <meta name="description" content="Pilates Class Planning Login" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>

      <main
        className=" flex min-h-screen flex-col items-center justify-between p-24
          
          relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"
      >
        <Image
          src="/vercel.svg"
          alt="Loho"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />

        <form
          className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          /*onSubmit={handleCreateAccount}*/
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            /*onChange={handleChange}*/
            /*value={username}*/
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            /*onChange={handleChange}*/
            /*value={password}*/
          />
          <label htmlFor="confirm-password">Confirm Password: </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            /*onChange={handleChange}*/
            /*value={confirmPassword}*/
          />
          <button>Sign up</button>
          {/*error && <p>{error}</p>*/}
        </form>
        <Link href="/login">
          <p>back to login</p>
        </Link>

        <Link
          href="/accountcreated"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          use this link when in development =+ this goes to confirmation page
        </Link>
      </main>

      {/* {container} */}
    </div>
  );
}
