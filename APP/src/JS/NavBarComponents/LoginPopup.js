import React, { useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from "../States/actions";




function LoginPopup({ setLoginPopup, setRegisterPopup }) {
    const dispatch = useDispatch();

    const email = useSelector(state => state.user.email)
    const password = useSelector(state => state.user.password)

    const [loginError, setLoginError] = useState(null);
    const [useSesion, setUserSesion] = useState([]);

    const handleLogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    throw new Error(data.message);
                }
                const sessionData = data.session;
                const user = data.user;
                setUserSesion(user)

            })
            .catch(error => {
                setLoginError([error.message]);
            });
    };

    console.log(useSesion)

    return (
        <div className="position-fixed loginPopupHolder d-flex  align-items-center  flex-column">

            <div className="d-flex  position-fixed close-icon-holder">
                <svg onClick={() => dispatch(setLoginPopup(false))} className="close-icon d-flex flex-row-reverse" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                    <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                </svg>
            </div>

            <div className="test col-10 col-md-12 mt-5  rounded">

                <form onSubmit={handleLogin} className=" d-flex  flex-column align-items-center">

                    <div className="test col-4 d-flex  justify-content-center flex-column align-items-center mt-5  logRegHolder">

                        <div className="fs-4 color-black mb-3">Login</div>

                        <div className="mt-3 d-flex align-items-center input-box">
                            <input onChange={(event) => dispatch(setEmail(event.target.value))} className="ps-2 rounded login-register-input-data" type="text" placeholder="Email"></input>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" /></svg>
                        </div>

                        <div className="mt-3 d-flex align-items-center input-box">
                            <input onChange={(event) => dispatch(setPassword(event.target.value))} className="ps-2 rounded login-register-input-data" type="password" placeholder="password"></input>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M263.717 960Q234 960 213 938.85T192 888V504q0-29.7 21.15-50.85Q234.3 432 264 432h24v-96q0-79.68 56.226-135.84t136-56.16Q560 144 616 200.16T672 336v96h24q29.7 0 50.85 21.15Q768 474.3 768 504v384q0 29.7-21.162 50.85Q725.676 960 695.96 960H263.717Zm.283-72h432V504H264v384Zm216.212-120Q510 768 531 746.788q21-21.213 21-51Q552 666 530.788 645q-21.213-21-51-21Q450 624 429 645.212q-21 21.213-21 51Q408 726 429.212 747q21.213 21 51 21ZM360 432h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456V504v384Z" /></svg>
                        </div>
                    </div>

                    <div>
                        <div className="mt-3 login-register-errors">

                            {loginError}
                        </div>
                    </div>

                    <div className="mt-2 mb-4">
                        <button type="submit" className="btn btn-dark">Login</button>
                    </div>
                </form>

                <div className="color-black ms-2 me-2 mb-3 d-flex  flex-column align-items-center">
                    If you do not have an account,
                    <p className="registerLink" onClick={() => { dispatch(setRegisterPopup(true)); dispatch(setLoginPopup(false)) }}> register </p>
                </div>

            </div>

        </div >

    )

}

export default LoginPopup;