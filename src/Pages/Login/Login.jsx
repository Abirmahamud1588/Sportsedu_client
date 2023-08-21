import React, { useContext, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";
const Login = () => {
  const [disable, setDisable] = useState(true);
  const { signIn, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Add this line to get access to the navigate function
  const googlelogin = () => {
    handleGoogleSignIn();
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire("Login!", "You have been Logged In.", "success");
        // Redirect to the home page after successful login
        navigate("/");
      })
      .catch((error) => {
        // Handle login errors, if any
        console.error(error);
        Swal.fire("Error", "An error occurred during login.", "error");
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control">
                <p>
                  New Here?{" "}
                  <Link className="text-2xl text-red-700 mt-8" to="/sign">
                    Registration
                  </Link>
                </p>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div className="w-1/2 mx-auto mb-5">
              <button className="btn btn-warning" onClick={googlelogin}>
                Google Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
