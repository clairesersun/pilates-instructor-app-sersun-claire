/*
To do:
-- take the prop with movement at top layer of object
-- have the name, image (placeholder if none), and description
*/

import styles from "./style.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function MovementPreview({ englishName, sanskritName, image }) {
  return (
    <div
      className={`${inter.className} 
       flex place-items-center
     group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
    >
      <Image
        src={
          image
            ? image
            : "https://i0.wp.com/yogawithtg.com/wp-content/uploads/2018/03/logo3.png?fit=300%2C167&ssl=1"
        }
        alt={englishName}
        width={100}
        height={100}
        className={`${inter.className} 
      justify-left relative flex place-items-center px-5 py-4`}
      />
      <div>
        <p
          className={`${inter.className} 
      text-left justify-left relative flex place-items-center
      mb-3 text-2xl font-semibold  `}
        >
          {englishName}
        </p>
        <p>{sanskritName}</p>
      </div>
    </div>
  );
}
