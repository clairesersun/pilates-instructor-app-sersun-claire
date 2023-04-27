import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [{ username, password }, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ username, password, ...{ [e.target.name]: e.target.value } });
  }
  async function handleLogin(e) {
    e.preventDefault();
    if (!username.trim() && !password.trim())
      return setError("username and password is missing");
    if (!password.trim()) return setError("password is missing");
    if (!username.trim()) return setError("username is missing");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
        <title>Yoga Class Planning Login</title>
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
          src="https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.svg"
          alt="Movement Drawing"
          className=""
          width={100}
          height={24}
          priority
        />

        <form
          className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onSubmit={handleLogin}
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
          />
          <button>Login</button>
          {error && <p>{error}</p>}
        </form>
        <Link href="/signup">
          <p>Sign up</p>
        </Link>
      </main>

      {/* {container} */}
    </div>
  );
}
