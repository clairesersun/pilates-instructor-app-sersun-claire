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


<h1>Class Plans</h1>
-- add search bar
-- add filter that will pop up <- you will pull it from the same filter component as the other, it will just have specific filters for this page
-- class plan component and list component
*/
