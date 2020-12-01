import React, { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UseModal from "../components/UseModal";
import SignUp from "./SignUp";
import { API, setAuthToken } from "../config/api";

const SignIn = ({ showSignIn, toggleSignIn }) => {
  // Penggunaan Modal
  const { isShowing, toggle } = UseModal();

  // Penggunaan history
  let history = useHistory();

  // Penggunaan context
  const [state, dispatch] = useContext(CartContext);

  // Membuat state untuk menampung data sementara
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destruct element formData menjadi email dan password
  const { email, password } = formData;

  // Fungsi dari event yang dibuat untuk menghandle perubahan pada field input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi dari event untuk menghandle pengiriman data saat klik submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      // set header to define format data
      headers: {
        "Content-type": "application/json",
      },
    };

    // set payload
    const body = JSON.stringify({ email, password });

    try {
      // send body (email and password) to endpoint /login
      const res = await API.post("/login", body, config);

      // if request data success, then dispatch
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
      });

      // set header from token bearer
      setAuthToken(res.data.data.token);

      // check if token valid or invalid
      try {
        const res = await API.get("/auth");
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
        history.push("/");
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  };

  return (
    <Modal
      show={showSignIn}
      keyboard={false}
      centered
      onHide={toggleSignIn}
      className="my-modal"
    >
      <Modal.Body>
        <h2>Sign In</h2> <br />
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <button
              className="Button-o"
              type="submit"
              style={{ width: "100%" }}
            >
              Sign In
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center" }}>
          Don't have an account ? Click{" "}
          <a href="#" onClick={toggle}>
            Here
          </a>
        </p>
        <SignUp isShowing={isShowing} toggle={toggle} />
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
