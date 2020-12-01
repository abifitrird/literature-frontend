import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../config/api";
var dayjs = require("dayjs");

const LiteratureList = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  // let { id } = useParams();

  useEffect(() => {
    const loadCollection = async () => {
      try {
        setLoading(true);

        // fetching data from endpoint
        const res = await API.get("/my-collection");
        setCollection(res.data.data.collection);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadCollection();
  }, []);

  return (
    <div>
      <div className="row">
        {/* Card for Literatures */}
        {loading || !collection ? (
          <h3>Loading . . .</h3>
        ) : (
          collection.map((item) => (
            <div className="col-sm-3 my-2">
              <Link to={`/detail/${item.id}`} style={{ color: "white" }}>
                <div
                  className="card"
                  style={{
                    border: "none",
                    backgroundColor: "#161616",
                  }}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiteratureList;
