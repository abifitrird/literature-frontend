import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import MyLiterature from "../components/MyLiterature";
import { CartContext } from "../context/cartContext";
import { API } from "../config/api";

const Profile = () => {
  const [state] = useContext(CartContext);
  const dataUser = JSON.stringify(state);
  const userData = JSON.parse(dataUser);

  // Membuat state untuk menampung data sementara
  const [formData, setFormData] = useState({
    photo: "",
  });

  // Destruct element formData menjadi masing-masing key
  const { photo } = formData;

  // handle penampungan data
  const handleStore = async (e) => {
    // e.preventDefault();

    try {
      const config = {
        // set header to define format data
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      var formData = new FormData();
      formData.append("photo", photo);
      console.log(photo);

      const res = await API.patch("/change-photo", formData, config);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div>
          <div className="jumbotron py-4 bg-dark">
            <div className="row">
              <div className="col-9 d-flex flex-column justify-content-between">
                <div className="row">
                  <div className="col-xs-6 cover-tile-image">
                    <svg viewBox="0 0 24 24" className="icon mr-1">
                      <path
                        fill="currentColor"
                        d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                      />
                    </svg>
                  </div>

                  {/* Email */}
                  <div className="col-xs-6 cover-tile-text">
                    <b>{userData.user.email}</b>
                    <p className="subtitle">Email</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 cover-tile-image">
                    <svg viewBox="0 0 24 24" className="icon mr-1">
                      <path
                        fill="currentColor"
                        d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z"
                      />
                    </svg>
                  </div>

                  {/* Gender */}
                  <div className="col-xs-6 cover-tile-text">
                    <b>{userData.user.gender}</b>
                    <p className="subtitle">Gender</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 cover-tile-image">
                    <svg viewBox="0 0 24 24" className="icon mr-1">
                      <path
                        fill="currentColor"
                        d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
                      />
                    </svg>
                  </div>

                  {/* phone */}
                  <div className="col-xs-6 cover-tile-text">
                    <b>{userData.user.phone}</b>
                    <p className="subtitle">Mobile phone</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 cover-tile-image">
                    <svg viewBox="0 0 24 24" className="icon mr-1">
                      <path
                        fill="currentColor"
                        d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
                      />
                    </svg>
                  </div>

                  {/* address */}
                  <div className="col-xs-6 cover-tile-text">
                    <b>{userData.user.address}</b>
                    <p className="subtitle">Address</p>
                  </div>
                </div>
              </div>

              {/* profile photo */}
              <div
                className="col-3 d-flex align-items-center flex-column"
                style={{ textAlign: "right" }}
              >
                <div className="p-2">
                  {userData.user.photo ? (
                    <img
                      src={`http://localhost:5000/${userData.user.photo}`}
                      className="rounded shadow-sm"
                      style={{ height: "10.2rem", width: "10.2rem" }}
                      alt="my-photo"
                    />
                  ) : (
                    <img
                      src={require("../assets/images/profile.jpg")}
                      className="rounded shadow-sm"
                      style={{
                        height: "10.2rem",
                        width: "10.2rem",
                        objectFit: "cover",
                      }}
                      alt="my-photo"
                    />
                  )}
                </div>
                <div className="p-2">
                  <form onSubmit={(e) => handleStore(e)}>
                    <div className="form-group">
                      <label className="labelPhoto" htmlFor="file">
                        {photo ? "1 file attached" : "Change Profile Photo"}
                      </label>

                      <input
                        type="file"
                        className="form-control-file"
                        id="file"
                        name="photo"
                        onChange={(e) => {
                          setFormData({
                            photo: !e.target.files[0]
                              ? photo
                              : e.target.files[0],
                          });
                          console.log(photo);
                        }}
                        required
                        style={{ display: "none" }}
                      ></input>
                    </div>
                    {photo ? (
                      <div>
                        <button
                          type="submit"
                          className="Button-o"
                          style={{ width: "10.2rem" }}
                        >
                          Change Now
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h3>My Literature</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <MyLiterature />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
