import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import styles from "./style.module.css";
import Image from "next/image";

export default function Header() {
  // const logout = useLogout();
  return (
    <header className={styles.header}>
      <p>
        <Link href="/login" /*onClick={logout}*/>
          <Image
            src="/vercel.svg"
            alt="Logout"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          Logout
        </Link>
      </p>
      <p>
        <Link href="/">
          <Image
            src="/vercel.svg"
            alt="Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          Logo
        </Link>
      </p>
      <p>
        <Link href="/">
          <Image
            src="/vercel.svg"
            alt="Home"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          Home
        </Link>
      </p>
    </header>
  );
}
