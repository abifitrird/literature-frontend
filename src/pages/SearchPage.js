import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { API } from "../config/api";
var dayjs = require("dayjs");

const SearchPage = () => {
  const [literature, setLiterature] = useState([]);
  const [key, setKey] = useState("");
  const [years, setYears] = useState([]);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);

  let { keyword } = useParams();
  useEffect(() => {
    const loadSearch = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/literature-search/${keyword}`);
        setLiterature(res.data.data.literature);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadSearch();
  }, []);

  useEffect(() => {
    const loadFilter = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/literature/${year}`);
        setLiterature(res.data.data.literature);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadFilter();
  }, [year]);

  useEffect(() => {
    const loadYears = async () => {
      try {
        setLoading();

        const res = await API.get("/years");
        setYears(res.data.data.years);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadYears();
  }, []);

  const handleClick = (e) => {
    setYear(e.target.value);
  };
  console.log(year);

  const handleInput = (e) => {
    setKey(e.target.value);
  };
  console.log(key);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setKey(e.target.value);
    try {
      setLoading(true);

      // fetching data from endpoint
      const res = await API.get(`/literature-search/${key}`);
      setLiterature(res.data.data.literature);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div style={{ width: "53%" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* <form> */}
            <div className="input-group mt-4">
              <input
                type="text"
                className="form-control bg-dark"
                style={{ color: "white" }}
                placeholder="Search for literature"
                name="keyword"
                value={key}
                onChange={handleInput}
              ></input>
              <button
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
              </button>
            </div>
          </form>
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <form>
              <div className="form-group">
                <label htmlFor="yearSelection" style={{ color: "#ee4622" }}>
                  Anytime
                </label>
                <select
                  className="form-control bg-dark"
                  style={{ color: "white" }}
                  id="yearSelection"
                  name="year"
                  value={year}
                  onChange={handleClick}
                >
                  {loading || !years ? (
                    <option>Default</option>
                  ) : (
                    years.map((item) => (
                      <option value={dayjs(item.publication).year()}>
                        Since {dayjs(item.publication).year()}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </form>
          </div>
          <div className="col-9">
            <div className="row">
              {/* Card for Literatures */}
              {loading || !literature ? (
                <h3>Please wait, while we load your data . . .</h3>
              ) : (
                literature.map((item) => (
                  <div className="col-sm-3 my-2">
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
                        <h5
                          className="card-title"
                          style={{ textAlign: "justify" }}
                        >
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
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
