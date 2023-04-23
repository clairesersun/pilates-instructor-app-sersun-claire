/*
To do:
-- take the prop with class plan at top layer of object
-- have the name, location, date
*/
import styles from "./style.module.css";

export default function ClassPlanPreview({
  className,
  dateCreated,
  datesTaught,
  location,
}) {
  return (
    <div className={styles.preview}>
      <p>
        <strong>{className}</strong>
      </p>
      <p>{dateCreated}</p>
      <p>{datesTaught}</p>
      <p>{location}</p>
    </div>
  );
}
