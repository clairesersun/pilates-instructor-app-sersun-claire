import Link from "next/link";
import styles from "./style.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer
      className={
        styles.footer &&
        "mb-3 grid text-center lg:mb-0 lg:grid-cols-2  place-items-center"
      }
    >
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
    </footer>
  );
}
