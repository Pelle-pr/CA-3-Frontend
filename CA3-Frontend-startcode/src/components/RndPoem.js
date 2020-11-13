import { useState } from "react";
import poemFacade from "../facades/poemFacade";

export default function RndPoem() {
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState("");

  const username = localStorage.getItem("user");

  const getNewPoem = (e) => {
    e.preventDefault();

    poemFacade
      .getRandomPoem()
      .then((x) => setPoem(x))
      .catch((promise) => console.log(promise));
  };

  const addToList = (e) => {
    e.preventDefault();
    poemFacade
      .addPoem(poem, username)
      .then(setPoem(null))
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <h1>Random poems</h1>

      <button onClick={getNewPoem} className="btn btn-secondary">
        Click me
      </button>
      {poem ? (
        <ShowPoem addToList={addToList} poem={poem} loading={loading} />
      ) : (
        <p>Click the button to get a new random poem</p>
      )}
    </div>
  );
}

function ShowPoem({ poem, addToList, loading }) {
  return (
    <div>
      <h3>Title:</h3>
      <p>{poem.title}</p>
      <h3>Content:</h3>
      <p>{poem.content}</p>
      <br /> <button onClick={addToList}>Add to List</button>
    </div>
  );
}
