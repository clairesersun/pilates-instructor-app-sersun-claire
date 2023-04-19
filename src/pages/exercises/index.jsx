/*
To do:
-- only show this page if the user is logged in. If they are not, redirect them to the login page.
-- <h1>Library of Movements</h1>
-- <Link href="/exercises/addexercise" /> <-- this will look like a plus sign
-- a search bar which will pull up exercises that match or have any of the same letters when entered
-- Filter button that pops up the filter component and hides everything else. When the filter button is not clicked (the back button is hit, it shows everything)
-- the movement list component
    ^^the prop changes the order. The standard is alphabetical, but the filter changes the view
-- Have a scrolling alphabetical element that only appears when the alphabetical sorting is present
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
