import React from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import UseModal from "../components/UseModal";

const Landing = () => {
  const { isShowing, toggle } = UseModal();
  const { showSignIn, toggleSignIn } = UseModal();
  return (
    <div
      className="container fluid"
      style={{ width: "100%", paddingTop: "40px" }}
    >
      <div
        style={{
          background: `url(${require("../assets/images/books.svg")})`,
          backgroundPosition: "100%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: "75vh",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <img
                src={require("../assets/images/logo.svg")}
                alt=""
                style={{ height: "5vh" }}
              ></img>
            </div>

            <div className="row float-left my-5">
              <h1
                style={{
                  fontSize: "11vh",
                  width: "60vh",
                  marginTop: "20px",
                }}
              >
                source <i>of</i> intelligence
              </h1>
              <h4
                style={{
                  fontSize: "3vh",
                  textAlign: "justify",
                  width: "60vh",
                }}
              >
                Sign-up today and receive unlimited access to all of your
                literatur - share your literature.
              </h4>
            </div>

            <div className="row">
              <button
                className="Button-o mt-3 mr-3"
                style={{ width: "30%" }}
                onClick={toggle}
              >
                Sign Up
              </button>
              <button
                className="Button-g mt-3"
                style={{ width: "30%" }}
                onClick={toggleSignIn}
              >
                Sign In
              </button>
              <SignUp isShowing={isShowing} toggle={toggle} />
              <SignIn showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
