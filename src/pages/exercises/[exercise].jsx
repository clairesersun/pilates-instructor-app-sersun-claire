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
import styles from "../../styles/exercise.module.css";
import Image from "next/image";
import Footer from "@/component/footer";
import Classes from "../../db/controllers/models/classes";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import { useParams } from "react-router-dom";
//you do not need to store these movements. Just look at them via the fetch and use the query from previous page either classes or movement list. Then you can add to classes from here.

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req, params }) {
//     const props = {};
//     const movement = await Movement.getAll(params.id);
//     //do I need this???
//     if (movement) props.movement = movement;
//     return { props };
//   },
//   sessionOptions
// );

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...id }) {
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

    // async function getListOfMovements() {
    //   let URL = "https://yoga-api-nzy4.onrender.com/v1/poses";
    //   const res = await fetch(URL);
    //   if (res.status !== 200) return;
    //   let data = await res.json();
    //   if (!Array.isArray(data)) {
    //     data = [data];
    //   }
    //   return data?.map((mvmt) => ({
    //     id: mvmt.id,
    //     englishName: mvmt.english_name,
    //     sanskritName: mvmt.sanskrit_name,
    //     translatedName: mvmt.translation_name,
    //     description: mvmt.pose_description,
    //     image: mvmt.url_svg,
    //   }));
    // }
    // let movements = await getListOfMovements();
    // return { props: { user, movements } };

    async function getMovement(id) {
      // console.log(id.resolvedUrl);
      let ClickedURL = id.resolvedUrl;
      function getLastPart() {
        const parts = ClickedURL.split("/");
        const part = parts.at(-1);
        return part;
      }
      let URLID = getLastPart(ClickedURL);
      // console.log(URLID);
      //how do I get what this dynamic route is? the di that can be passed. right now the id is undefined
      let URL = "https://yoga-api-nzy4.onrender.com/v1/poses?id=" + URLID;
      const res = await fetch(URL);
      // console.log(res);
      if (res.status !== 200) return;
      let data = await res.json();
      console.log(data);
      if (!Array.isArray(data)) {
        data = [data];
      }
      return data?.map((mvmt) => ({
        id: mvmt.id,
        englishName: mvmt.english_name,
        sanskritName: mvmt.sanskrit_name,
        translatedName: mvmt.translation_name,
        description: mvmt.pose_description,
        image: mvmt.url_svg,
      }));
    }
    // let movements = await GetMovement();
    let movements = await getMovement(id);
    return { props: { user, movements } };
  },
  sessionOptions
);

export default function Exercise(props) {
  const router = useRouter();
  const movementId = router.id;
  let movement = props.movements[0];
  console.log(movement[0]); //hell yes! 12 hrs later lol
  // let lastItem = window.location.pathname.split("/").pop();

  // console.log(movement[lastItem]);

  // else movement = allMovements.find((movement) => movement.id === movementId);

  //make a function to find a given movement by query that is sent via previous page, either exercises or classplans/[class] this is the redirection which the [exercise] is the query sent to the api route that is fetching the info

  //add to classes
  async function addToClasses() {
    const res = await fetch("/api/movements", {
      method: "POST",
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

      <main className="flex flex-col items-center justify-between p-24">
        <Header />
        <div
          className={`${inter.className} mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-center
           group rounded-lg border border-transparent px-5 py-4 transition-colors `}
        >
          <a
            href="#"
            onClick={() => router.back()}
            className={`${inter.className} group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
          >
            Return
          </a>
          <button
            onClick={addToClasses}
            className={`${inter.className} group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
          >
            Add to Class
          </button>
          {movement ? (
            <MovementInfo key={movement.id} {...movement} />
          ) : (
            <img
              src={
                "https://i0.wp.com/yogawithtg.com/wp-content/uploads/2018/03/logo3.png?fit=300%2C167&ssl=1"
              }
              alt="not found"
              width={100}
              height={50}
              className={`${inter.className} 
      relative flex place-items-center px-5 py-4`}
            />
          )}
        </div>
      </main>
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
  console.log(englishName);
  return (
    <>
      <div className={styles.titleGroup}>
        <div
          className={`${inter.className} 
       flex place-items-center
     group `}
        >
          <img
            src={
              image
                ? image
                : "https://i0.wp.com/yogawithtg.com/wp-content/uploads/2018/03/logo3.png?fit=300%2C167&ssl=1"
            }
            alt={englishName}
            width={100}
            height={50}
            className={`${inter.className} 
      relative flex place-items-center px-5 py-4`}
          />
          <h1
            className={`${inter.className} 
      text-left justify-left relative flex place-items-center
      mb-3 text-2xl font-semibold  `}
          >
            {englishName}
          </h1>
          <h2>{sanskritName}</h2>
          <h3>{translatedName}</h3>
        </div>
        <section>
          <p> Description: </p>
          <p>{description}</p>
        </section>
      </div>
    </>
  );
}
