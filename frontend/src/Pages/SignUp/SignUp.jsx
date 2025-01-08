import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("User created successfully!");
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
      <div className="container m-4 mx-auto bg-success text-white rounded">
        <form className="m-4 p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="geolocation"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
         {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Check me out
            </label>
          </div>*/}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/Login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
