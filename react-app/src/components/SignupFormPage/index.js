import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email_address, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //       const data = await dispatch(signUp(username, email_address, first_name, last_name, password));
  //       if (data) {
  //         setErrors(data)
  //       }
  //   } else {
  //       setErrors(['Confirm Password field must be the same as the Password field']);
  //   }
  // };

  useEffect(() => {
    const validationErr = []
    if(username.length < 4 || username.length > 60) validationErr.push('Username must be between 4 and 60 characters')
    if(password !== confirmPassword) validationErr.push('Passwords are not equivalent')
    if(!email_address.includes('@')) validationErr.push('Please enter a valid email address')
    if(first_name.length < 1 || first_name.length > 50) validationErr.push('First name must be between 1 and 50 characters long')
    if(last_name.length < 1 || last_name.length > 50) validationErr.push('Last name must be between 1 and 50 characters long')
    setErrors(validationErr)
  }, [username, email_address, first_name, last_name, password, confirmPassword])

  const uponSignUp = async (e) => {
    if(errors.length) return
    if(password === confirmPassword){
      const data = await dispatch(signUp(email_address, username, first_name, last_name, password));
      if(data){
        setErrors(data)
      }
    } else {
      return
    }
  };

  if (sessionUser) return <Redirect to="/" />;


  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={uponSignUp}>
        <div className="errors">
          {errors.map((error, idx) => (
            <div className="error" key={idx}>{error}</div>))}
        </div>
        <div className="autharea">
          <div className="authdeets">
            <input
              className="inputdeet"
              type="text"
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirst_Name(e.target.value)}
              required
            />
            <input
              className="inputdeet"
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
              required
            />
            <input
              className="inputdeet"
              type="text"
              name="email_address"
              placeholder="Email Address"
              value={email_address}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="inputdeet"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="inputdeet"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="inputdeet"
              type="password"
              name="confirm password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          <button className="sibutton" type="submit">Sign Up</button>
          </div>
          <div className="redcarpetpic">
            <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"></img>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupFormPage;
