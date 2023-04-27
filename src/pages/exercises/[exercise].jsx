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
// import classes from "../../db";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import { useState } from "react";
// import AddToClass from "@/component/addToClass";
import NameOfClass from "@/component/nameOfClass";
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
  async function getServerSideProps({ req, params, ...id }) {
    const user = req.session.user;
    // const cls = await classes.getAll(req.session.user.id, params.id);

    if (!user) {
      req.session.destroy();
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

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
    // return { props: { user, movements, cls } };
    return { props: { user, movements } };
  },
  sessionOptions
);

export default function Exercise(props) {
  const router = useRouter();
  const movementId = router.id;
  let movement = props.movements[0];
  let classes = props.cls;
  // console.log(movement[0]); //hell yes!
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

  function AddToClass(...classes) {
    return (
      <div>
        <button>New Class</button>
        <NameOfClass />
        {classes.map((classes) => (
          <button onClick={addToClasses()} key={classes.id}>
            {classes.className}
          </button>
        ))}
      </div>
    );
  }

  function NameOfClass() {
    const router = useRouter();
    const [{ className }, setForm] = useState({
      className: "",
    });
    const [error, setError] = useState("");
    function handleChange(e) {
      setForm({ className, ...{ [e.target.name]: e.target.value } });
    }
    async function handleAdd(e, exercises) {
      e.preventDefault();
      if (!className.trim()) return setError("class name is missing");
      try {
        const res = await fetch("/api/classes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ className, exercises }),
        });
        if (res.status === 200) return router.back();
        const { error: message } = await res.json();
        setError(message);
      } catch (err) {
        console.log(err);
      }
    }
    return (
      <div>
        <form
          className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onSubmit={handleAdd}
        >
          <label htmlFor="className">Name of class: </label>
          <input
            type="text"
            name="className"
            id="className"
            onChange={handleChange}
            value={className}
          />
          <button>√</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{movement.englishName}</title>
        <meta name="description" content="Yoga Class Plans" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <div className=" group flex-box w-full  flex-col-1 items-center justify-between p-24 ">
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
            id="everythingElse"
            className={`${inter.className} group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
          >
            Add to Class
          </button>
          {/* <Display {...classes} /> */}
        </div>
      </main>
      <Footer
        className={`${inter.className} 
        pb-6 pt-8`}
      />
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
      <div
        className={`${inter.className} 
        
     group flex-box   flex-col-1 items-center justify-between p-24 `}
      >
        <div>
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
            mb-3 text-3xl font-semibold flex justify-center items-center place-items-center`}
          />
          <h1
            className={`${inter.className} 
            mb-3 text-3xl font-semibold flex text-left `}
          >
            {englishName}
          </h1>
          <h2
            className={`${inter.className} 
      text-left relative flex 
      mb-3 text-1xl font-semibold  `}
          >
            {sanskritName}
          </h2>
          <h3
            className={`${inter.className} 
      text-left relative flex 
      mb-3 text-1xl  `}
          >
            {translatedName}
          </h3>
        </div>
        <section>
          <p
            className={`${inter.className} 
      text-left justify-left relative flex 
      mb-3 text-1xl  `}
          >
            {" "}
            Description:{" "}
          </p>
          <p
            className={`${inter.className} 
      text-left justify-left relative flex 
      mb-3 text-1xl  `}
          >
            {description}
          </p>
        </section>
      </div>
    </>
  );
}

// const Display = (classes) => {
//   const [isAddOpen, setIsAddOpen] = useState(false);

//   const toggleAdd = () => setIsAddOpen(!isAddOpen);

//   const addStyle = {
//     maxHeight: isAddOpen ? "200px" : "0px",
//   };

//   return (
//     <>
//       <button
//         onClick={toggleAdd}
//         id="everythingElse"
//         className={`${inter.className} group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
//       >
//         Add to Class
//       </button>
//       <AddToClass style={addStyle} id="addToClass" {...classes} />
//     </>
//   );
// };
