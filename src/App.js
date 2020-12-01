import React, { useEffect, useContext } from "react";
import "./App.css";
// import "./StyleApp.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyCollection from "./pages/MyCollection";
import AddLiterature from "./pages/AddLiterature";
import SearchPage from "./pages/SearchPage";
import LiteratureDetail from "./pages/LiteratureDetail";
import AdminPage from "./pages/AdminPage";
import FileUpload from "./pages/FileUpload";

import PrivateRoute from "./components/PrivateRoute";

import { API, setAuthToken } from "./config/api";

import { CartContext } from "./context/cartContext";

//  if token is available in local storage then set default header for auth
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(CartContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };

    loadUser();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/file-upload" component={FileUpload} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/search/:keyword" component={SearchPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/my-collection" component={MyCollection} />
        <PrivateRoute exact path="/detail/:id" component={LiteratureDetail} />
        <PrivateRoute exact path="/add-literature" component={AddLiterature} />
        <PrivateRoute exact path="/admin" component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
