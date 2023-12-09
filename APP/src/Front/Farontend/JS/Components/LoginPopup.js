//Imports
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import localhost from "../../../../config/config"
import { setEmail, setPassword } from "../States/actions"
import { setUserSession, setLoginPopup, setRegisterPopup } from "../States/actions"
import { API_URL } from '../Components/Constants'
import drinkLoginLogo from '../../../../Assets/drinksLoginBrand.png'

function LoginPopup() {
    const dispatch = useDispatch()

    // take states from storage to login
    const email = useSelector(state => state.user.email)
    const password = useSelector(state => state.user.password)

    const [loginError, setLoginError] = useState(null)

    const handleLogin = (event) => {
        event.preventDefault()

        // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        // if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        //     setLoginError(['Email or Password is valid'])
        //     return 0
        // }

        // Send a POST request to the login API endpoint
        fetch(`http://${localhost}:3000/api/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }), // Convert data to JSON string
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            credentials: 'include' // Include cookies in the request
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                if (!data.success) {
                    throw new Error(data.message)
                }
                const user = data.user
                dispatch(setUserSession(user))
                dispatch(setLoginPopup(false))
                window.location.reload()
            })
            .catch(error => {
                setLoginError([error.message])
            })
    }

    let loginRef = useRef(null)

    useEffect(() => {
        let handler = (e) => {
            if (!loginRef.current.contains(e.target)) {
                dispatch(setLoginPopup(false))
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    return (
        <div
            ref={loginRef}
            className="col-11 col-md-9 col-lg-6 col-xxl-5 loginPopupHolder h-500 position-fixed d-flex  align-items-center flex-column "
        >
            <div className="d-flex  position-fixed close-icon-holder mt-1 ">
                <svg
                    onClick={() => dispatch(setLoginPopup(false))}
                    className="close-icon d-flex flex-row-reverse"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
            </div>
            <div className="col-12  mt-2 rounded">
                <form
                    onSubmit={handleLogin}
                    className=" d-flex flex-column align-items-center"
                >
                    <div className=" login-reg-header fs-2 color-black mt-5">Login</div>
                    <div className="col-12 logRegHolder d-flex align-items-center mt-5 justify-content-center">
                        <div className="col-4 d-none d-xl-flex">
                            <img
                                className="login-icon"
                                src={drinkLoginLogo}>
                            </img>
                        </div>
                        <div className="col-12 col-xl-8 d-flex flex-column align-items-center justify-content-center me-5 me-xl-0">
                            <div className="col-10  d-flex  align-items-center mb-2 mt-2  ms-5">
                                <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                    <svg
                                        className="login-register-icon ps-0 pt-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20" viewBox="0 96 960 960" width="20">
                                        <path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" />
                                    </svg>
                                </div>
                                <div className="input-box col-11">
                                    <input
                                        onChange={(event) => dispatch(setEmail(event.target.value))}
                                        className="ps-2 col-11 rounded login-register-input-data"
                                        type="text"
                                        placeholder="Email"
                                    >
                                    </input>
                                </div>
                            </div>
                            <div className="col-10 d-flex align-items-center mt-4 ms-5">
                                <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                    <svg
                                        className="login-register-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20" viewBox="0 96 960 960" width="20">
                                        <path d="M263.717 960Q234 960 213 938.85T192 888V504q0-29.7 21.15-50.85Q234.3 432 264 432h24v-96q0-79.68 56.226-135.84t136-56.16Q560 144 616 200.16T672 336v96h24q29.7 0 50.85 21.15Q768 474.3 768 504v384q0 29.7-21.162 50.85Q725.676 960 695.96 960H263.717Zm.283-72h432V504H264v384Zm216.212-120Q510 768 531 746.788q21-21.213 21-51Q552 666 530.788 645q-21.213-21-51-21Q450 624 429 645.212q-21 21.213-21 51Q408 726 429.212 747q21.213 21 51 21ZM360 432h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456V504v384Z" />
                                    </svg>
                                </div>
                                <div className="col-11 input-box">
                                    <input
                                        onChange={(event) => dispatch(setPassword(event.target.value))}
                                        className="col-11 ps-2 rounded login-register-input-data"
                                        type="password"
                                        placeholder="password"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="login-register-errors mb-3 ">
                            {loginError}
                        </div>
                    </div>
                    <div className=" mb-3">
                        <button
                            type="submit"
                            className="login-input"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="color-black ms-2 me-2 mb-3 d-flex flex-column align-items-center">
                    If you do not have an account,
                    <p
                        className="registerLink"
                        onClick={() => {
                            dispatch(setRegisterPopup(true))
                            dispatch(setLoginPopup(false))
                        }}> Register </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPopup