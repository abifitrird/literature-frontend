import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  const [keyword, setKeyword] = useState("");

  const handleInput = (event) => {
    setKeyword(event.target.value);
  };
  console.log(keyword);
  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15%",
            width: "40%",
            textAlign: "center",
          }}
        >
          <img
            src={require("../assets/images/logo.svg")}
            alt=""
            style={{ width: "75%" }}
          />
          <form>
            <div className="input-group mt-4">
              <input
                type="text"
                className="form-control bg-dark"
                style={{ color: "white" }}
                placeholder="Search for literature"
                name="keyword"
                value={keyword}
                onChange={handleInput}
              ></input>
              <Link
                to={`/search/${keyword}`}
                style={{ color: "white" }}
                className="Button-o ml-1 px-0 py-2"
                type="submit"
                style={{
                  height: "38.5px",
                  width: "38.5px",
                  textAlign: "center",
                }}
              >
                <i className="fa fa-search" style={{ fontSize: "25px" }} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
