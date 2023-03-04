import React from "react";

function Registers({ setLoginPopup, setRegisterPopup }) {

    return (
        <div className="position-fixed loginPopupHolder d-flex  align-items-center  flex-column col ">

            <div className="test col-12 mt-5  rounded">

                <div className="d-flex flex-row-reverse me-2 mt-2">
                    <svg onClick={() => setRegisterPopup(false)} className="close-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                        <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                    </svg>
                </div>

                <form className=" d-flex  flex-column align-items-center">

                    <div className="test col-4 d-flex  justify-content-center flex-column align-items-center mt-5 logRegHolder">

                        <div className="fs-5 color-black">REGISTRATION</div>

                        <div className="mt-3">
                            <input className="ps-2 rounded" type="text" placeholder="login"></input>
                        </div>

                        <div className="mt-3">
                            <input className="ps-2 rounded" type="password" placeholder="password"></input>
                        </div>

                        <div className="mt-3">

                            <input className="ps-2 rounded" type="password" placeholder="Confirm Password"></input>
                        </div>

                        <div className="mt-3">
                            <input className="ps-2 rounded" type="password" placeholder="Email"></input>
                        </div>

                        <div className="mt-3">
                            <input className="ps-2 rounded" type="password" placeholder="Phone"></input>
                        </div>

                    </div>

                    <div className="mt-4 mb-4">
                        <button type="button" className="btn btn-dark">Register</button>
                    </div>
                </form>

                <div onClick={() => { setRegisterPopup(false); setLoginPopup(true) }} className="color-black ms-2 me-2 mb-3 d-flex  flex-column align-items-center registerLink">
                    back to login
                </div>

            </div>

        </div >
    )

}

export default Registers;