import "../styles/App.css";
import "../styles/Navbar.css";
import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import RndPoem from "../components/RndPoem";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch";
import FavList from "../components/Favlist";
import AllPoems from "../components/Allpoems";
export default function Header({ isLoggedIn, setLoginStatus, loginMsg }) {
  let user = isLoggedIn ? `Logged in as: ${localStorage.getItem("user")}` : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/rndpoem">
                Random Poems
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/favList">
                Favorit Poems
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/allpoems">
                All Poems
              </NavLink>
            </li>
          </React.Fragment>
        )}

        {roles.includes("admin") && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/admin">
                Admin
              </NavLink>
            </li>
          </React.Fragment>
        )}
        <li>
          <NavLink activeClassName="selected" to="/login">
            {loginMsg}
          </NavLink>
        </li>
        {!isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
        <li style={{ float: "right", color: "white", marginRight: "20px" }}>
          {user}
          <br />
          {roles}
        </li>
      </ul>

      <Switch>
        {/* for deployment */}
        <Route path="/poem">
          <Redirect to="/poem" />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/rndpoem">
          <RndPoem />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/login">
          <Login
            setLoginStatus={setLoginStatus}
            isLoggedIn={isLoggedIn}
            loginMsg={loginMsg}
          />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/favList">
          <FavList />
        </Route>
        <Route path="/allpoems">
          <AllPoems />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
