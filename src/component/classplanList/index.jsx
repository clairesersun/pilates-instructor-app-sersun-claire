/*
To do:
-- loop over each classplanPreview that matches the given filter or the default, by date created
*/

import Link from "next/link";
import ClassPlanPreview from "../classplanPreview";
import styles from "./style.module.css";

export default function ClassPlanList({ classes }) {
  return (
    <div className={styles.list}>
      {classes.map((classes) => (
        <Link
          key={classes.id}
          href={`/classplans/${id}`}
          style={{ textDecoration: "none" }}
        >
          <ClassPlanPreview {...classes} />
        </Link>
      ))}
    </div>
  );
}
