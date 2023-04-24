/*
To do:
only show this page if the user is logged in. If they are not, redirect them to the login page.

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



-- pass class plans props into this function

<h1>{name}</h1>
<p>{datecreated}</p>
<p>{location}</p>
<p>{equipment}</p>
<h2>Description</h2>
<p>{description}</p>

-- tracker section to tell if it hass all spinal movemetns and planes of motion
<MovementPreview />
^^^this has a specific order based either by time added (each new one gets added to bottom) or by manual adjustment which is done by the edit button
*/

// use the following for help:

// import Head from "next/head";
// import Link from 'next/link';
// import styles from "../styles/Favorites.module.css";
// import { withIronSessionSsr } from "iron-session/next";
// import sessionOptions from "../config/session";
// import Header from "../components/header";
// import BookList from "../components/bookList";
// import db from "../db";

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({ req }) {
//     const user = req.session.user;
//     let books
//     if (user)
//       books = await db.book.getAll(user.id)
//     // no books means db.book.getAll failed because user does not exist
//     if (!books) {
//       req.session.destroy()
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false
//         }
//       }
//     }
//     return {
//       props: {
//         user: req.session.user,
//         isLoggedIn: true,
//         favoriteBooks: books,
//       }
//     };
//   },
//   sessionOptions
// );

// export default function Favorites(props) {
//   return (
//     <>
//       <Head>
//         <title>Booker Favorites</title>
//         <meta name="description" content="Your favorite books on Booker" />
//         <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>" />
//         {/* <link rel="icon" href="/favicon.ico" /> */}
//       </Head>

//       <Header isLoggedIn={props.isLoggedIn} />

//       <main>
//         <h1 className={styles.title}>Favorite Books</h1>
//         {props.favoriteBooks.length > 0 ? <BookList books={props.favoriteBooks} /> : <NoBookText />}
//       </main>
//     </>
//   );
// }

// function NoBookText() {
//   return (
//     <div className={styles.noBooks}>
//       <p><strong>You don't have any books saved to your favorites.</strong></p>
//       <p>Why don't you <Link href="/search">go to search</Link> and add some?</p>
//     </div>
//   )
// }

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
import Header from "@/component/header";
import styles from "../../styles/exercise.module.css";
import Footer from "@/component/footer";
import MovementList from "@/component/movementList";
import Classes from "@/db/controllers/models/classes";
import { useState } from "react";
import Link from "next/link";
import MovementPreview from "@/component/movementPreview";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const props = {};
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
    props.user = user;
    const classes = await Classes.find(req.session.user.id, params.id);
    if (classes) props.classes = classes;
    return { props };
  },
  sessionOptions
);

export default function ClassPlan(props) {
  const router = useRouter();
  const classesId = router.query.id;
  let classes;
  let movement;
  if (props.classes) {
    classes = props.classes;
  }
  if (props.movement) {
    movement = props.movement;
  } else return;

  //have an update
  async function updateClass() {
    const res = await fetch("/api/classes", {
      method: "PUT",
      body: JSON.stringify({ id: classes.id }),
    });
    if (res.status === 200) {
      router.replace(router.asPath);
    }
  }

  //delete from classes
  async function removeClass() {
    const res = await fetch("/api/classes", {
      method: "DELETE",
      body: JSON.stringify({ id: classes.id }),
    });
    if (res.status === 200) {
      router.replace(router.asPath);
    }
  }

  //delete from classes
  async function deleteExercise() {
    const res = await fetch("/api/movement", {
      method: "DELETE",
      body: JSON.stringify({ id: movement.id }),
    });
    if (res.status === 200) {
      router.replace(router.asPath);
    }
  }

  return (
    <>
      <Head>
        <title>Yoga Class</title>
        <meta name="description" content="Yoga Class" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧘‍♀️</text></svg>"
        />
      </Head>

      <Header />
      <main>
        <div className={styles.controls}>
          <a href="#" onClick={() => router.back()}>
            Return
          </a>
        </div>
        <ClassInfo {...classes} id="staticText" />

        <button onClick={DisplayEdit}>Edit</button>
        <EditClass {...classes} id="editableText" />
        <button onClick={removeClass} id="editableText">
          Delete Class
        </button>
      </main>
      <Footer />
    </>
  );
}

function ClassInfo({
  className,
  dateCreated,
  datesTaught,
  location,
  description,
  exercises,
  //^^ how do I determine thte order of these?
}) {
  return (
    <>
      <div className={styles.titleGroup} id="staticText">
        <div>
          <h1>{className}</h1>
          <p>{datesTaught}</p>
          <p>{dateCreated}</p>
          <p>{datesTaught}</p>
          <p>{location}</p>
        </div>
        <section>
          <p> Description: </p>
          <p>{description}</p>
        </section>
        <section>
          <div className={styles.list}>
            {exercises.map((movements) => (
              <>
                <Link
                  key={movements.id}
                  href={`/exercises/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <MovementPreview {...movements} />
                </Link>
                <button onClick={deleteExercise()}>Delete Exercise</button>
              </>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function EditClass({
  className,
  dateCreated,
  datesTaught,
  location,
  description,
  exercises,
}) {
  const [setForm] = useState();
  function handleChange(e) {
    setForm({
      className,
      dateCreated,
      datesTaught,
      location,
      description,
      exercises,
      ...{ [e.target.name]: e.target.value },
    });
    updateClass(e.target.value);
  }
  return (
    <>
      <form onSubmit={updateClass()}>
        <label htmlFor="className">Class Name:</label>
        <input
          type="text"
          id="className"
          name="className"
          onChange={handleChange}
          value={className}
        />
        <label htmlFor="dateCreated"> Date Created: </label>
        <input
          type="text"
          id="dateCreated"
          name="dateCreated"
          onChange={handleChange}
          value={dateCreated}
        />
        <label htmlFor="datesTaught"> Dates Taught: </label>
        <input
          type="text"
          id="datesTaught"
          name="datesTaught"
          onChange={handleChange}
          value={datesTaught}
        />
        <label htmlFor="location"> Location: </label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
          value={location}
        />
        <label htmlFor="description"> Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          value={description}
        />
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
}

function DisplayEdit() {
  var editableText = document.getElementById("editableText");
  var staticText = document.getElementById("staticText");

  if (editableText.style.display === "none") {
    editableText.style.display = "block";
    staticText.style.display === "none";
  } else {
    editableText.style.display = "none";
    staticText.style.display = "block";
  }
}
