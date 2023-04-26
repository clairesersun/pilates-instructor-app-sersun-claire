import MovementList from "@/component/movementList";
import Header from "@/component/header";
import { useState, useRef } from "react";
import styles from "../../styles/exerciselist.module.css";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../../config/session";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";

//you do not need to store these movements. Just look at them via the fetch if selected it will direct to exercise page using query that is sent to see exercise. If you search for a movement, that query is sent to show, if none, just show all movements.

// -- only show this page if the user is logged in. If they are not, redirect them to the login page.
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, query: { name } }) {
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

    async function getListOfMovements() {
      let URL = "https://yoga-api-nzy4.onrender.com/v1/poses";
      if (name) {
        URL += "?name=" + name;
      }
      const res = await fetch(URL);
      if (res.status !== 200) return;
      let data = await res.json();
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
    let movements = await getListOfMovements();
    return { props: { user, movements } };
  },
  sessionOptions
);

export default function LibraryOfMovements(props) {
  const router = useRouter();
  //WILL NOT USE CONTEXT
  // const [{ movementSearchResults }, dispatch] = useMovementContext();
  const [query, setQuery] = useState("");
  // const [fetching, setFetching] = useState(false);
  // const [previousQuery, setPreviousQuery] = useState();
  const inputRef = useRef();
  const inputDivRef = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    router.replace(router.pathname + "?name=" + query);
  }

  return (
    <>
      <Head>
        <title>Yoga Class Planning Movement Library</title>
        <meta
          name="description"
          content="Yoga Class Planning Movement Library"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <h1
          className={`${inter.className} 
        mb-3 text-3xl font-semibold flex justify-center `}
        >
          Library of Movements
        </h1>
        {/*
            -- a search bar which will pull up exercises that match or have any of the same letters when entered
        */}
        <form
          onSubmit={handleSubmit}
          className={`${inter.className} mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-center
           group rounded-lg border border-transparent px-5 py-4 transition-colors `}
        >
          <label htmlFor="movement-search">Search by pose name:</label>
          <br />
          <div ref={inputDivRef}>
            <input
              ref={inputRef}
              type="text"
              name="movement-search"
              id="movement-search"
              value={query}
              autoFocus={true}
              onChange={(e) => setQuery(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className={`${inter.className} group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
            >
              Submit
            </button>
          </div>
        </form>
        <div>
          <MovementList movements={props.movements} />
          {/* {fetching ? (
            <Loading />
          ) : movementSearchResults?.length ? (
            <ClassPlanList movements={movementSearchResults} />
          ) : (
            <NoResults
              {...{ inputRef, inputDivRef, previousQuery }}
              clearSearch={() => setQuery("")}
            />
          )} */}
        </div>
      </main>
    </>
  );
}

function Loading() {
  return <span className={styles.loading}>Gathering the exercises...</span>;
}

function NoResults({ inputDivRef, inputRef, previousQuery, clearSearch }) {
  function handleLetsSearchClick() {
    inputRef.current.focus();
    if (previousQuery) clearSearch();
    if (inputDivRef.current.classList.contains(styles.starBounce)) return;
    inputDivRef.current.classList.add(styles.starBounce);
    inputDivRef.current.onanimationend = function () {
      inputDivRef.current.classList.remove(styles.starBounce);
    };
  }

  return (
    <div className={styles.noResults}>
      <p>
        <strong>
          {previousQuery
            ? `Hmmmmm... We couldn't find any results for "${previousQuery}".`
            : "We're sorry - we were unable to find a match. "}
        </strong>
      </p>
      <button onClick={handleLetsSearchClick}>
        {previousQuery ? (
          `Try another search?`
        ) : (
          <div>
            {/* will I include the following filter? i think maybe not */}
            {/* <Filter />{" "} */}
            {/* <MovementList movement={movementSearchResults} /> */}
          </div>
        )}
      </button>
    </div>
  );
}
