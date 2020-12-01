import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../components/NavBar";
import { API } from "../config/api";

const AdminPage = () => {
  const [literature, setLiterature] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  const handleChange = (e) => {
    setSort(e.target.value);
  };
  console.log(sort);

  useEffect(() => {
    const loadSort = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/sorted/${sort}`);
        setLoading(false);

        setLiterature(res.data.data.literatures);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadSort();
  }, [sort]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const res = await API.get("/all-literature");
        setLiterature(res.data.data.literature);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCancel = (id) => {
    const status = "Cancelled";
    const res = API.post(`/update/${id}/${status}`);
  };

  const handleApprove = (id) => {
    const status = "Approved";
    const res = API.post(`/update/${id}/${status}`);
  };

  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div className="row my-2">
          <h3>Literatures Verification</h3>
          {/* <form>
            <div className="form-group">
              <select
                className="form-control"
                name="status"
                value={sort}
                onChange={handleChange}
              >
                <option value="Approved">Approved</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Waiting to be verified">
                  Waiting to be verified
                </option>
              </select>
            </div>
          </form> */}
        </div>

        <div className="row">
          <table className="table table-striped table-light">
            <thead>
              <tr style={{ fontSize: "14pt" }}>
                <th scope="col">No</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">ISBN</th>
                <th scope="col">Literature</th>
                <th scope="col">Status</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading || !literature ? (
                <tr>
                  <td>No Data</td>
                </tr>
              ) : (
                literature.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td style={{ maxWidth: "300px" }}>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.isbn}</td>
                    <td>{item.file}</td>
                    <td>{item.status}</td>
                    {item.status == "Approved" ? (
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={require("../assets/images/success.svg")}
                          style={{ width: "30px" }}
                        />
                      </td>
                    ) : item.status == "Cancelled" ? (
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={require("../assets/images/cancel.jpg")}
                          style={{ width: "30px" }}
                        />
                      </td>
                    ) : (
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success mx-1"
                          onClick={() => handleApprove(item.id)}
                        >
                          Approve
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
