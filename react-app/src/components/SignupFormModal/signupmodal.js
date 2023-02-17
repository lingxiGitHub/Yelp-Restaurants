import React, { useState} from "react";
import { Modal } from "../../context/Modal";
import SignupFormModal from "./index";
import "./SignupForm.css";

function SignupForm(){
    const [showModal, setShowModal] = useState(false);

    return(
        <>
            <button className="signupmodalbutton" onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}><SignupFormModal /></Modal>
            )}
        </>
    )
}

export default SignupForm;
