/*
To do:
-- only show this page if the user is logged in. If they are not, redirect them to the login page.
-- Have a form that when the submit button (add exercise) is clicked, it populates to the database
-- the form has options for all the elements in the exercise object
-- specify which ones are required (name, planeofmotion, spinalmovements, bodyclassification, description, equipment)
-- specify which ones are optional (everything else)
-- do not approve any special characteristics besides a - or a / in the name

This form has two views, an edit and a add
if it is in edit show all of the current information in the form fields and the CRUD is update for anything that changes. 
if it is in add the CRUD is add ... make sure the name is not already taken in the database (check with all spaces condensed, everything in lowercase, and - and / are removed)

Add a back btn in the left hand corner. This will return them to either the exercise name or the library of movements. Check with their browser to determine location.
*/
