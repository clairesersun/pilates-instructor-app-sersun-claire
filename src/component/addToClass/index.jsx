/*
To do:
-- <h1>Add to</h1>
-- element for new class which will pop up the nameOfClass component
-- element for already created classes <-- loop over names in class planning database
*/

import NameOfClass from "../nameOfClass";

export default function AddToClass(...classes) {
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
