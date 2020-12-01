import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import UseModal from "./UseModal";
import SignIn from "./SignIn";
import { API } from "../config/api";

const SignUp = ({ isShowing, toggle }) => {
  const { showSignIn, toggleSignIn } = UseModal();

  // Membuat state untuk menampung data sementara
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  // Destruct element formData menjadi masing-masing key
  const { email, password, fullName, gender, phone, address } = formData;

  // Fungsi dari event yang dibuat untuk menghandle perubahan pada field input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle penampungan data
  const handleStore = async (e) => {
    e.preventDefault();

    try {
      const config = {
        // set header to define format data
        headers: {
          "Content-Type": "application/json",
        },
      };

      // set payload
      const body = JSON.stringify({
        email,
        password,
        fullName,
        gender,
        phone,
        address,
      });

      // send body (email and password) to endpoint /login
      const res = await API.post("/register", body, config);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      show={isShowing}
      keyboard={false}
      centered
      onHide={toggle}
      className="my-modal"
    >
      <Modal.Body>
        <h2>Sign Up</h2> <br />
        <form onSubmit={(e) => handleStore(e)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control bg-dark"
              style={{ color: "white" }}
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control bg-dark"
              style={{ color: "white" }}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control bg-dark"
              style={{ color: "white" }}
              placeholder="Full Name"
              name="fullName"
              value={fullName}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <select
              className="form-control bg-dark"
              style={{ color: "white" }}
              placeholder="Gender"
              name="gender"
              value={gender}
              onChange={(e) => handleChange(e)}
              required
            >
              <option defaultValue disabled value="">
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control bg-dark"
              style={{ color: "white" }}
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control bg-dark"
              style={{ color: "white" }}
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => handleChange(e)}
              required
              rows="4"
            />
          </div>
          <button
            className="Button-o mb-2"
            type="submit"
            style={{ width: "100%" }}
          >
            Submit
          </button>
        </form>
        <p style={{ textAlign: "center" }}>
          Already have an account ? Click{" "}
          <a href="#" onClick={toggleSignIn}>
            Here
          </a>
          <SignIn showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
