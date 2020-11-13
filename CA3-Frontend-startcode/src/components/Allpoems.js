import { useEffect, useState } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import poemFacade from "../facades/poemFacade";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import Content from "./Content";

export default function AllPoems() {
  const [poems, setPoems] = useState([]);
  let { url, path } = useRouteMatch();

  useEffect(() => {
    poemFacade.getAllPoems().then((poems) => setPoems([...poems]));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <ul>
            {poems.map((poem) => (
              <li key={poem.title}>
                {poem.title}{" "}
                <Link to={`${url}/${poem.title}`}>See Content</Link>
              </li>
            ))}
          </ul>
        </div>
        <Switch>
          <Route path={`${path}/:title`}>
            <Content Poems={poems} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
