// THIS WORKS!! RE-ADD WHEN READY WITH DATABASE
// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req }) {
//     const user = req.session.user;
//     if (!user) {
//       req.session.destroy()
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false
//         }
//       }
//     };
//   },
//   sessionOptions
// );

import Head from "next/head";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import { useMovementContext } from "../../context/movements";
import Header from "@/component/header";
import db from "../../db";
import styles from "../../styles/exercise.module.css";
import Image from "next/image";
import Footer from "@/component/footer";

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req, params }) {
//     const props = {};
//     const movement = await db.movement.getAll(params.id);
//     //do I need this???
//     if (movement) props.movement = movement;
//     return { props };
//   },
//   sessionOptions
// );

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
    const props = user;
    return { props };
  },
  sessionOptions
);

export default function Exercise(props) {
  const router = useRouter();
  const movementId = router.query.id;
  const [{ allMovements }] = useMovementContext();
  let movement;
  if (props.movement) {
    movement = props.movement;
  } else movement = allMovements.find((movement) => exerciseId === exerciseId);

  //add to classes
  async function addToClasses() {
    // TODO: use fetch to call POST /api/book
    const res = await fetch("/api/movements", {
      method: "POST",
      // Be sure to pass book in body (use JSON.stringify)
      body: JSON.stringify({ ...movement }),
    });
    // Call router.replace(router.asPath) if you receive a 200 status
    if (res.status === 200) {
      router.replace(router.asPath);
    }
  }

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
      {movement && (
        <main>
          <MovementInfo {...movement} />
          <div className={styles.controls}>
            <a href="#" onClick={() => router.back()}>
              Return
            </a>
            <button onClick={addToClasses}>Add to Class</button>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}

function MovementInfo({
  englishName,
  sanskritName,
  translatedName,
  description,
  image,
}) {
  return (
    <>
      <div className={styles.titleGroup}>
        <div>
          <h1>{englishName}</h1>
          <h2>{sanskritName}</h2>
          <h3>{translatedName}</h3>
        </div>
        <section>
          <p> Description: </p>
          <p>{description}</p>
        </section>
        <Image
          src={
            image
              ? image
              : "https://i0.wp.com/yogawithtg.com/wp-content/uploads/2018/03/logo3.png?fit=300%2C167&ssl=1"
          }
          alt={englishName}
        />
      </div>
    </>
  );
}
