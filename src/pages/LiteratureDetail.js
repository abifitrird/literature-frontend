import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import NavBar from "../components/NavBar";

const LiteratureDetail = () => {
  const [literature, setLiterature] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true);

        // fetching data from endpoint
        const res = await API.get(`/literature-detail/${id}`);
        setLiterature(res.data.data.literature);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadDetail();
  }, []);

  const handleAdd = (id) => {
    const res = API.post(`/add-collection/${id}`);
  };

  const handleClick = (id) => {
    const res = API.get(`/download/${id}`);
  };

  console.log(literature);
  console.log(id);
  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div className="row my-3">
          <div className="col-9">
            <div className="d-flex flex-row" style={{ height: "400px" }}>
              <div className="d-flex flex-column">
                <img
                  src={require("../assets/images/thumbnail.jpg")}
                  style={{
                    height: "450px",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                ></img>
              </div>
              <div
                className="d-flex flex-column justify-content-between pl-4"
                style={{ height: "100%" }}
              >
                <div>
                  <h3>{literature.title}</h3>
                  <p className="subtitle">{literature.author}</p>
                </div>
                <div>
                  <h6>Publication date</h6>
                  <p className="subtitle">{literature.publication}</p>
                </div>
                <div>
                  <h6>Pages</h6>
                  <p className="subtitle">{literature.pages}</p>
                </div>
                <div>
                  <h6 style={{ color: "red" }}>ISBN</h6>
                  <p className="subtitle">{literature.isbn}</p>
                </div>
                <div>
                  <button
                    className="Button-o"
                    onClick={() => handleClick(literature.id)}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="float-right">
              <button
                className="Button-o"
                onClick={() => handleAdd(literature.id)}
              >
                Add to My Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiteratureDetail;
