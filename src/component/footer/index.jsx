import Link from "next/link";
import styles from "./style.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <Link href="/exercises">
          <Image
            src="/vercel.svg"
            alt="Exercises"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          Exercises
        </Link>
      </p>
      <p>
        <Link href="/classplans">
          <Image
            src="/vercel.svg"
            alt="Class Plans"
            className="dark:invert"
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
