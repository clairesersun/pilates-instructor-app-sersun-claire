/*
To do:
only show this page if the user is logged in. If they are not, redirect them to the login page.

-- copy all contents for the external API here.
-- the look will be a chat looking feed with autopopulating messages
-- the bottom is a type form. when entered it will send to the feed.
-- profiles are clickable. show a pop up vs of the others profiles (what they deemed public)

*/
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
