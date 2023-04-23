/*
To do:
-- take the prop with movement at top layer of object
-- have the name, image (placeholder if none), and description
*/

import styles from "./style.module.css";
import Image from "next/image";

export default function MovementPreview({ englishName, sanskritName, image }) {
  return (
    <div className={styles.preview}>
      <Image
        src={
          image
            ? image
            : "https://i0.wp.com/yogawithtg.com/wp-content/uploads/2018/03/logo3.png?fit=300%2C167&ssl=1"
        }
        alt={englishName}
      />
      <div>
        <p>
          <strong>{englishName}</strong>
        </p>
        <p>{sanskritName}</p>
      </div>
    </div>
  );
}
