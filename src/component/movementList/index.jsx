/*
To do:
-- loop over each movementPreview that matches the given filter or the default, by alphabetical
prop movements= {
    movementSearchResults OR allMovements
}
<MovementList />

*/

import Link from "next/link";
import MovementPreview from "../movementPreview";
import styles from "./style.module.css";

export default function MovementList({ movements }) {
  console.log(movements);
  return (
    <div className={styles.list}>
      {console.log(movements)}
      {movements.map((movement) => (
        <Link
          key={movement.id}
          href={`/exercises/${movement.id}`}
          style={{ textDecoration: "none" }}
        >
          <MovementPreview {...movement} />
        </Link>
      ))}
    </div>
  );
}
