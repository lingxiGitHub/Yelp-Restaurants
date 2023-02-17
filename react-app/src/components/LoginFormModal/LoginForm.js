import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginFormModal from "./index";
import "./LoginForm.css";

function LoginForm(){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="loginbuttonmod" onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginFormModal />
                </Modal>
            )}
        </>
    )
}

export default LoginForm;
