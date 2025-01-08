import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
 const [credentials, setCredentials] = useState({
  
    email: "",
    password: "",
  
  });
  let navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          email: credentials.email,
          password: credentials.password,
         
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        
        localStorage.setItem("userEmail", credentials.email);
        
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      } else {
        alert("Please enter valid credentials.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  
  return (
    <>
      <div className="container  bg-success login ">
        <form className="m-4 p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We will never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          {credentials.password.length > 0 && credentials.password.length < 5 && (
        <p style={{ color: "orange" }}>Password must be greater than 4 digits</p>
      )}
          </div>
          
         
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/Createuser" className="m-3 btn btn-danger">
            I am a new user
          </Link>
        </form>
      </div>
      
    </>
  )
}

export default Login
