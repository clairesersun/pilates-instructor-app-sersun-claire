import Header from "@/component/header";
import styles from "../../styles/exerciselist.module.css";
import Head from "next/head";
import ClassPlanList from "@/component/classplanList";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "src/config/session";
import classes from "../../db";
import Classes from "../../db/controllers/models/classes";

// -- only show this page if the user is logged in. If they are not, redirect them to the login page.

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const userId = user.id;
    let allClasses;
    if (user) allClasses = await Classes.getAll(userId);
    if (!allClasses) {
      req.session.destroy();
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {
        user: req.session.user,
        isLoggedIn: true,
        classes: allClasses,
      },
    };
  },
  sessionOptions
);

export default function ClassPlans(props) {
  return (
    <>
      <Head>
        <title>Yoga Class Plans</title>
        <meta name="description" content="Yoga Class Plans" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>

      <Header />

      <main>
        <h1 className={styles.title}>Favorite Books</h1>
        {props.classes.length > 0 ? (
          <ClassPlanList classes={props.classes} />
        ) : (
          <NoClasses />
        )}
      </main>
    </>
  );
}

function NoClasses() {
  return (
    <div className={styles.noClasses}>
      <p>
        <strong>You do not have any classes.</strong>
      </p>
      <p>
        <Link href="/exercises">Why don&apos;t you create some? </Link>
      </p>
    </div>
  );
}
