import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

/* 
    Create a ServerSide Props with IronSessions <-- do I need?? I do not think so
    Within the signup function
        handle change
        handle create account

*/

export default function Signup(props) {
  const router = useRouter();
  const [
    {
      username,
      email,
      igHandle,
      password,
      "confirm-password": confirmPassword,
    },
    setForm,
  ] = useState({
    username: "",
    email: "",
    igHandle: "",
    password: "",
    "confirm-password": "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      username,
      email,
      igHandle,
      password,
      "confirm-password": confirmPassword,
      ...{ [e.target.name]: e.target.value.trim() },
    });
  }
  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!username.trim()) return setError("Must include username");
    // email
    if (!email.trim()) return setError("Must include email");
    // igHandle
    if (!igHandle.trim()) return setError("Must include Instagram handle");
    if (!password.trim()) return setError("Must include password");
    if (!confirmPassword.trim()) return setError("Please confirm password");
    if (password !== confirmPassword) return setError("Passwords must Match");

    try {
      // console.log(username, email, igHandle, password);
      const res = await fetch("/api/auth/signup", {
        //Everything is stopping here. look at line 60 on the above route
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, email, igHandle, password }),
      });
      if (res.status === 200) return router.push("/");
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }
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
          alt="Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />

        <form
          className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onSubmit={handleCreateAccount}
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
          />

          {/* email */}
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={email}
          />
          {/* igHandle */}
          <label htmlFor="igHandle">
            Instagram Handle (i.e. @clubpilates):
          </label>
          <input
            type="text"
            name="igHandle"
            id="igHandle"
            onChange={handleChange}
            value={igHandle}
          />
          {/* password */}
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
          />
          {/* confirmed password */}
          <label htmlFor="confirm-password">Confirm Password: </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={handleChange}
            value={confirmPassword}
          />
          <button>Sign up</button>
          {error && <p>{error}</p>}
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
