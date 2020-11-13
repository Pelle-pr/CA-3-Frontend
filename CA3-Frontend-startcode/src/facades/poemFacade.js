import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const poemFacade = () => {
  const getRandomPoem = () => {
    return fetch(URL + "/api/poem", apiFacade.makeOptions("GET", true)).then(
      handleHttpErrors
    );
  };

  const addPoem = (poem, username) => {
    return fetch(
      URL + `/api/poem/${username}`,
      apiFacade.makeOptions("POST", true, poem)
    ).then(handleHttpErrors);
  };

  const getFavPoems = (username) => {
    return fetch(
      URL + `/api/poem/${username}`,
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  const removePoem = (username, title) => {
    return fetch(
      URL + `/api/poem/${username}`,
      apiFacade.makeOptions("DELETE", true, { title: title })
    ).then(handleHttpErrors);
  };

  const getAllPoems = () => {
    return fetch(
      URL + "/api/poem/all",
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  return { getRandomPoem, addPoem, getFavPoems, removePoem, getAllPoems };
};

const facade = poemFacade();
export default facade;
