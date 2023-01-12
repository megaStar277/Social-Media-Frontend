import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import signupimg from "./signup.png";
import { registerUser } from "../../Redux/auth/action";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  // const auth = useSelector((store) => store.auth);
  // console.log(auth);

  const authState = useSelector((state) => state.auth.userRegister);
  console.log(authState);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (authState.message === "User already exist") {
      dispatch({ type: "AUTH_REGISTER_RESET" });
    }
    if (authState.message === "User Registered Successfully") {
      dispatch({ type: "AUTH_REGISTER_RESET" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [dispatch, navigate, authState.message]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.username.trim() !== "" &&
      formData.password.trim() !== ""
    ) {
      if (
        formData.name.trim().length < 4 ||
        formData.password.trim().length < 4
      ) {
        alert("Name and password must be at least of 4 characters");
      } else {
        dispatch(registerUser(formData));
      }
    } else {
      alert("Please enter all required fields");
    }
  };

  return (
    <div className="signup">
      <div className="signupContainer">
        <div className="signupImage">
          <img src={signupimg} alt="" />
        </div>
        <div className="signupDetail">
          <div>
            <h3>Signup</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                type="text"
                placeholder="Full name"
              />
              <input
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                type="text"
                placeholder="@username"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="Set a password"
              />
              <p>
                Already a User ? <Link to="/login">Login .</Link>
              </p>
              <button type="submit">CONTINUE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;