import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const NavBar = () => {
  const [state, dispatch] = useContext(CartContext);
  return (
    <div>
      <nav
        className="navbar navbar-expand"
        style={{ width: "100%", fontSize: "14pt", color: "white" }}
      >
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-collection">
                My Collection <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-literature">
                Add Literature <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() =>
                  dispatch({
                    type: "LOGOUT",
                  })
                }
              >
                Logout <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <div>
            <Link to="/">
              <img
                src={require("../assets/images/logo.svg")}
                style={{ height: "4vh", width: "auto", marginRight: "0" }}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
