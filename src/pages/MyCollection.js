import React from "react";
import LiteratureList from "../components/LiteratureList";
import NavBar from "../components/NavBar";

const MyCollection = () => {
  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div className="row">
          <div className="col-12">
            <h3>My Collection</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <LiteratureList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
