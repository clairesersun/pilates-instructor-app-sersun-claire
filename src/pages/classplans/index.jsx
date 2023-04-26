import Header from "@/component/header";
import styles from "../../styles/exerciselist.module.css";
import Head from "next/head";
import ClassPlanList from "@/component/classplanList";
import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "src/config/session";
import { Inter } from "next/font/google";
import Footer from "@/component/footer";
const inter = Inter({ subsets: ["latin"] });
// import classes from "@/db/controllers";

// -- only show this page if the user is logged in. If they are not, redirect them to the login page.

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
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
      },
    };
  },
  sessionOptions
);

export default function ClassPlans(props) {
  async function getAllClasses() {
    const res = await fetch("/api/classes/all", {
      method: "GET",
      // body: JSON.stringify({ ...classes }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    // Call router.replace(router.asPath) if you receive a 200 status
    if (res.status === 200) {
      router.replace(router.asPath);
    }
  }
  let classes = getAllClasses();

  console.log(getAllClasses());
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

      <main className="flex flex-col items-center  p-24">
        <Header />
        <h1
          className={`${inter.className} 
        mb-3 text-3xl font-semibold flex justify-center `}
        >
          Classes
        </h1>
        {classes?.length > 0 ? (
          <ClassPlanList classes={classes} />
        ) : (
          <NoClasses />
        )}
      </main>
      <Footer />
    </>
  );
}

function NoClasses() {
  return (
    <div
      className={
        styles.noClasses && "flex min-h-screen flex-col items-center p-24 "
      }
    >
      <p
        className={`${inter.className} 
        mb-3 text-2xl flex justify-center `}
      >
        You do not have any classes.
      </p>
      <p
        className={`${inter.className} 
        mb-3 text-1xl flex justify-center `}
      >
        <Link href="/exercises">Why don&apos;t you create some? </Link>
      </p>
    </div>
  );
}
