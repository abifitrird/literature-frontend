import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../config/api";
var dayjs = require("dayjs");

const MyLiterature = () => {
  const [literature, setLiterature] = useState([]);
  const [loading, setLoading] = useState(true);

  // let { id } = useParams();

  useEffect(() => {
    const loadLiterature = async () => {
      try {
        setLoading(true);

        // fetching data from endpoint
        const res = await API.get("/my-literature");
        setLiterature(res.data.data.creation);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadLiterature();
  }, []);

  return (
    <div>
      <div className="row">
        {/* Card for Literatures */}
        {loading || !literature ? (
          <h3>Loading . . .</h3>
        ) : (
          literature.map((item) => (
            <div className="col-sm-3 my-2">
              {item.status == "Approved" ? (
                <Link to={`/detail/${item.id}`} style={{ color: "white" }}>
                  <div
                    className="card"
                    style={{ border: "none", backgroundColor: "#161616" }}
                  >
                    <img
                      className="card-img-top pb-2"
                      alt="..."
                      src={require("../assets/images/thumbnail.jpg")}
                    ></img>
                    <h5 className="card-title" style={{ textAlign: "justify" }}>
                      {item.title}
                    </h5>
                    <p className="card-text">{item.author}</p>
                    <p className="card-text">
                      {dayjs(item.publication).format("YYYY")}
                    </p>
                  </div>
                </Link>
              ) : item.status == "Cancelled" ? (
                <div
                  className="card"
                  style={{
                    border: "none",
                    backgroundColor: "#161616",
                    position: "relative",
                  }}
                >
                  <img
                    className="card-img-top pb-2"
                    alt="..."
                    src={require("../assets/images/thumbnail.jpg")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "250px",
                      left: "50%",
                      transform: "translate(-50%, -40%)",
                      color: "red",
                      background: "rgba(0, 0, 0, 0.8)",
                      fontSize: "20pt",
                      textAlign: "center",
                      width: "90%",
                    }}
                  >
                    <p>{item.status}</p>
                  </div>
                  <h5 className="card-title" style={{ textAlign: "justify" }}>
                    {item.title}
                  </h5>
                  <p className="card-text">{item.author}</p>
                  <p className="card-text">
                    {dayjs(item.publication).format("YYYY")}
                  </p>
                </div>
              ) : (
                <div
                  className="card"
                  style={{
                    border: "none",
                    backgroundColor: "#161616",
                    position: "relative",
                  }}
                >
                  <img
                    className="card-img-top pb-2"
                    alt="..."
                    src={require("../assets/images/thumbnail.jpg")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "250px",
                      left: "50%",
                      transform: "translate(-50%, -40%)",
                      color: "yellow",
                      background: "rgba(0, 0, 0, 0.8)",
                      fontSize: "20pt",
                      textAlign: "center",
                      width: "90%",
                    }}
                  >
                    <p>{item.status}</p>
                  </div>
                  <h5 className="card-title" style={{ textAlign: "justify" }}>
                    {item.title}
                  </h5>
                  <p className="card-text">{item.author}</p>
                  <p className="card-text">
                    {dayjs(item.publication).format("YYYY")}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyLiterature;
