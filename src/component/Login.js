import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";
import loginpic from "../images/login.jpg";

import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import Errorpop from "./CustomComp/Errorpop";
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Login() {
  const [modalshow, setmodalshow] = useState(false);
  const [modalerror, setmodalerror] = useState("")

  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState("");
  const [isEmailValid, setisEmailValid] = useState(false);
  const [password, setpassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  let isValid;
  let isValidPass;

  const loginPost = async (e) => {
    // e.preventDefault();
    const url = "http://localhost:7000/user/login ";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("id", data.id);
      localStorage.setItem("userName", data.name);
      alert("Login successful");
      dispatch(userAction(true));
      history.push("/home", { replace: true });
    } else if (res.status === 400) {
      // alert("Fill all the fields");
      setmodalshow(!modalshow);
      setmodalerror("something went wrong")
    } else if (res.status === 401) {
      setmodalshow(!modalshow);
      setmodalerror("User does not exist")
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    isValid = validateEmail(email);
    isValidPass = validatePassword(password);

    if (isValid && isValidPass) {
      loginPost();
    }
  };

  const validateEmail = (email) => {
    const mailexp =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,12})$/;
    if (mailexp.test(email)) {
      setisEmailValid(true);
      setemailError("");
      return true;
    } else {
      setisEmailValid(false);
      setemailError("enter valid email");
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password.length > 5) {
      setisPasswordValid(true);
      setpasswordError("");
      return true;
    } else {
      setisPasswordValid(false);
      setpasswordError(" enter valid password");
      return false;
    }
  };

  return (
    <div>
      <section className="sign-in">
        <div className="container1 mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="login image" />
              </figure>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>

              <form
                method="POST"
                className="register-form"
                id="register-form" 
                onSubmit={loginUser}
              >
                <div className="mb-3  form-group">
             
                  <input
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                    value={email}
                    type="email"
                    id="email"
                    title="email"
                    placeholder="Enter email"
                  />
                  {!isEmailValid ? (
                    <span
                      style={{
                        color: "red",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {emailError}
                    </span>
                  ) : null}
                </div>
                <div className="mb-3 form-group">
                  <label onClick={()=>{
setshowPassword(!showPassword)
                  }} htmlFor="password">
                   { showPassword ? <AiFillEye />:
                    <AiFillEyeInvisible/>}
                  </label>
                  <input
                 
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    title="password"
                    placeholder="Enter password"
                    id="password"
                  />

                  {!isPasswordValid ? (
                    <span
                      style={{
                        color: "red",
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {passwordError}
                    </span>
                  ) : null}
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    onClick={loginUser}
                    title="loginBtn"
                  />
                </div>
                <Link className="nav-link" to="/register">    
                    Not registered ? click here.
                  </Link>
             
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Errorpop modalerror={modalerror} modalshow={modalshow} handleClose={() => setmodalshow(false)} />
    </div>
  );
}

export default Login;
