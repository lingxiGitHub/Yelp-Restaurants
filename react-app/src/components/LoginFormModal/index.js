import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect} from "react-router-dom";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email_address, setEmail_Address] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user)
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email_address, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  if(user) return <Redirect to="/" />;

  return (
    <>
    <div className="loginmodal">
      <form onSubmit={handleSubmit} className="loginform">
        <label className="titleloginmod">Log In to Yelp</label>
        <ul className="errors1">
          {errors.map((error, idx) => (
            <li className="error1" key={idx}>{error}</li>
          ))}
        </ul>
        <div className="loginbox">
              <input
                className="inputdeet1"
                placeholder="Email address"
                type="email"
                value={email_address}
                onChange={(e) => setEmail_Address(e.target.value)}
                required={true}
              />
              <input
                className="inputdeet1"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
        </div>
            <button type="submit" className="thedemologinbutton" onClick={() => {dispatch(login('demo@aa.io', 'password'))}}>Demo User Log In</button>
            <button type="submit" className="themainlog">Log In</button>


      </form>
      </div>
    </>
  );
};

export default LoginFormModal;
