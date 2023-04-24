import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import styles from "./style.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  const logout = useLogout();
  return (
    <header className={styles.header}>
      <p
        className={`${inter.className} mb-3 text-2xl font-semibold group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
      >
        <Link onClick={logout} href="/login">
          <Image
            src="/icons8-logout-rounded-left-100.png"
            alt="Logout"
            className="dark:invert"
            width={40}
            height={12}
            priority
          />
        </Link>
      </p>

      <p
        className={`${inter.className} mb-3 text-2xl font-semibold group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
      >
        <Link href="/">
          <Image
            src="/icons8-home.svg"
            alt="Home"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </Link>
      </p>
    </header>
  );
}
