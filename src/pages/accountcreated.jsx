import { Inter } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

/* 

To do:
only show this page if the user is logged in. If they are not, redirect them to the login page.

*/
export default function AccountCreated(props) {
  return (
    <div>
      {/* {container} */}

      <Head>
        <title>Pilates Class Planning Account Creation Success</title>
        <meta
          name="description"
          content="Pilates Class Planning Account Creation Success"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>

      <main
        className=" flex min-h-screen flex-col items-center justify-between p-24
          
          relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"
      >
        <p className={`${inter.className} mb-3 text-2xl font-semibold`}>
          Account successfully created! You will recieve an email confirming
          creation in the next 15 minutes.
        </p>

        <Link href="/login">
          <p>back to login</p>
        </Link>
      </main>

      {/* {container} */}
    </div>
  );
}
