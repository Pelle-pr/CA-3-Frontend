import { useEffect, useState } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import poemFacade from "../facades/poemFacade";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import Content from "./Content";

export default function Favlist() {
  const username = localStorage.getItem("user");
  const [msg, setMsg] = useState("");
  const [favPoems, setFavPoems] = useState([]);
  const [error, setError] = useState("");

  let { url, path } = useRouteMatch();

  useEffect(() => {
    poemFacade.getFavPoems(username).then((poems) => setFavPoems([...poems]));
  }, [msg]);

  const removePoem = (e) => {
    e.preventDefault();
    poemFacade
      .removePoem(username, e.target.value)
      .then((x) => {
        setMsg(x);
      })
      .catch((error) => setError(error.fullError));
  };

  return (
    <div>
      <p>{error !== "" ? { error } : ""}</p>
      <p>{msg !== "" ? `${msg} has been removed from your list` : ""}</p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <ul>
              {favPoems.map((poem) => (
                <li key={poem.title}>
                  {poem.title}
                  <Link to={`${url}/${poem.title}`}>See Content</Link>
                  <button onClick={removePoem} value={poem.title}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Switch>
            <Route path={`${path}/:title`}>
              <Content Poems={favPoems} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
