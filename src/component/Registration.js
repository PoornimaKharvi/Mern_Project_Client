import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import signup from "../images/signin.png";
import { Link } from 'react-router-dom';

function Registration() {
  const history = useHistory();

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const userCopy = { ...user };
    userCopy[event.target.name] = event.target.value;
    setuser(userCopy);
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, password, } = user;

    const url = "http://localhost:7000/user/register "
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.status === 409 || !data) {
      alert("invalid registration");
    } else {
      alert(" registration succesfull");
      history.push("/home");
    }
  };

  return (
    <div>
      <section className="signup">
        <div className="container1 mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form
                method="POST"
                name="form"
                className="register-form"
                id="register-form"
              >
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    value={user.name}
                    name="name"
                    type="text"
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    value={user.email}
                    name="email"
                    type="text"
                    placeholder="email"
                  />{" "}
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange}
                    value={user.password}
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                </div>
                <div className="form-group form-button">
                  <input type="submit" onClick={PostData} />
                
                </div>
              </form>
            </div>

            <div className="signup-image">
              <figure>
                <img src={signup} alt="registration pic" />
              </figure>
              <Link className="nav-link" to="/">    
                    Already registered ?  signin.
                  </Link>
            </div>
            
          </div>
          
        </div>
      </section>
   
    </div>
  );
}

export default Registration;
