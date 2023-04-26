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
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function MovementList({ movements }) {
  return (
    <div>
      {movements.map((movement) => (
        <Link
          key={movement.id}
          href={`/exercises/${movement.id}`}
          style={{ textDecoration: "none" }}
          onClick={(e) => setQuery(e.target.value)}
        >
          <MovementPreview {...movement} />
        </Link>
      ))}
    </div>
  );
}
