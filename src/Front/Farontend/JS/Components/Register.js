//Imports
import { useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"

import { API_URL } from '../Components/Constants'
import { setRegisterPopup, setLoginPopup } from "../States/actions"

function Registers() {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm()


    //State for display errors 
    const [registerError, setRegisterError] = useState(null)

    const onSubmit = (formData) => {
        const { email, password, rePassword, phone, Nick } = formData

        fetch(`${API_URL}register`, {
            method: 'POST',
            body: JSON.stringify({ email, password, rePassword, phone, Nick }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === false) {
                    setRegisterError(data.message)
                } else {
                    setRegisterError(null)
                    dispatch(setRegisterPopup(false))
                    dispatch(setLoginPopup(true))
                    alert('Registration was successful')
                }
            })
            .catch(error => console.error(error))
    }

    let registerRef = useRef(null)

    useEffect(() => {
        let handler = (e) => {
            if (!registerRef.current.contains(e.target)) {
                dispatch(setRegisterPopup(false))
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }

    }, [])

    const checkPassword = (value) => {
        const { password } = getValues();
        return value === password || "Passwords do not match";
    }

    return (
        <div ref={registerRef} className="col-4 col-12 col-md-6 col-lg-4 loginPopupHolder h-600 position-fixed d-flex align-items-center flex-column ">
            <div className="d-flex position-fixed close-icon-holder">
                <svg
                    onClick={() => dispatch(setRegisterPopup(false))}
                    className="close-icon d-flex flex-row-reverse"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
            </div>
            <div className="col-12 rounded ">
                <form onSubmit={handleSubmit(onSubmit)} className=" d-flex  flex-column align-items-center col-12">
                    <div className="col-12 d-flex  justify-content-center flex-column align-items-center mt-5 logRegHolder">
                        <div className="fs-2 color-black mb-3 login-reg-header">Registration</div>
                        <div className="col-9 d-flex  align-items-center mb-2 mt-3 justify-content-center">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg
                                    className="login-register-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20" viewBox="0 96 960 960" width="20">
                                    <path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" />
                                </svg>
                            </div>
                            <div className="col-sm-11 col-12  input-box">
                                <input
                                    {...register("email", {
                                        required: "Email is required!",
                                        minLength: {
                                            value: 10,
                                            message: 'Minimal length of email is 10'
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'Maximal length of email is 60'
                                        }
                                    })}
                                    value={watch('email')}
                                    className=" ps-2 rounded col-11 login-register-input-data"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="col-9 d-flex  align-items-center mb-2 mt-3 justify-content-center">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg
                                    className="login-register-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20" viewBox="0 96 960 960" width="20"
                                >
                                    <path d="M263.717 960Q234 960 213 938.85T192 888V504q0-29.7 21.15-50.85Q234.3 432 264 432h24v-96q0-79.68 56.226-135.84t136-56.16Q560 144 616 200.16T672 336v96h24q29.7 0 50.85 21.15Q768 474.3 768 504v384q0 29.7-21.162 50.85Q725.676 960 695.96 960H263.717Zm.283-72h432V504H264v384Zm216.212-120Q510 768 531 746.788q21-21.213 21-51Q552 666 530.788 645q-21.213-21-51-21Q450 624 429 645.212q-21 21.213-21 51Q408 726 429.212 747q21.213 21 51 21ZM360 432h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456V504v384Z" />
                                </svg>
                            </div>
                            <div className="col-sm-11 col-12 input-box">
                                <input
                                    {...register("password", {
                                        required: "Password is required!",
                                        minLength: {
                                            value: 10,
                                            message: 'Minimal length of Password is 10'
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'Maximal length of Password is 60'
                                        },
                                        pattern: {
                                            value: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$",
                                            message: "Invalid password format"
                                        }
                                    })}
                                    value={watch('password')}
                                    className="ps-2 col-11 rounded login-register-input-data"
                                    type="password"
                                    placeholder="password">
                                </input>
                            </div>
                        </div>
                        <div className="col-9 d-flex  align-items-center mb-2 mt-3 justify-content-center">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg
                                    className="login-register-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20" viewBox="0 96 960 960"
                                    width="20">
                                    <path d="M263.717 960Q234 960 213 938.85T192 888V504q0-29.7 21.15-50.85Q234.3 432 264 432h24v-96q0-79.68 56.226-135.84t136-56.16Q560 144 616 200.16T672 336v96h24q29.7 0 50.85 21.15Q768 474.3 768 504v384q0 29.7-21.162 50.85Q725.676 960 695.96 960H263.717Zm.283-72h432V504H264v384Zm216.212-120Q510 768 531 746.788q21-21.213 21-51Q552 666 530.788 645q-21.213-21-51-21Q450 624 429 645.212q-21 21.213-21 51Q408 726 429.212 747q21.213 21 51 21ZM360 432h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456V504v384Z" />
                                </svg>
                            </div>
                            <div className="col-sm-11 col-12 input-box">
                                <input
                                    {...register("rePassword", {
                                        required: "rePassword is required!",
                                        minLength: {
                                            value: 10,
                                            message: 'Minimal length of Password is 10'
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'Maximal length of Password is 60'
                                        },
                                        validate: checkPassword,
                                        pattern: {
                                            value: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$",
                                            message: "Invalid password format"
                                        }
                                    })}
                                    value={watch('rePassword')}
                                    className="ps-2 rounded col-11 login-register-input-data"
                                    type="password"
                                    placeholder="Confirm password">
                                </input>
                            </div>
                        </div>
                        <div className="col-9 ">
                            <div className="col-12 d-flex  align-items-center mb-2 mt-3 justify-content-center">
                                <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                    <svg
                                        className="login-register-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20" viewBox="0 96 960 960" width="20">
                                        <path d="M264 1008q-29.7 0-50.85-21.15Q192 965.7 192 936V216q0-29.7 21.15-50.85Q234.3 144 264 144h432q29.7 0 50.85 21.15Q768 186.3 768 216v720q0 29.7-21.15 50.85Q725.7 1008 696 1008H264Zm0-216v144h432V792H264Zm215.789 108Q495 900 505.5 889.711q10.5-10.29 10.5-25.5Q516 849 505.711 838.5q-10.29-10.5-25.5-10.5Q465 828 454.5 838.289q-10.5 10.29-10.5 25.5Q444 879 454.289 889.5q10.29 10.5 25.5 10.5ZM264 720h432V336H264v384Zm0-456h432v-48H264v48Zm0 528v144-144Zm0-528v-48 48Z" />
                                    </svg>
                                </div>
                                <div className="col-sm-11 col-12 input-box">
                                    <input
                                        {...register("phone", {
                                            required: "phone is required!",
                                            minLength: {
                                                value: 8,
                                                message: 'Minimal length of phone is 8'
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: 'Maximal length of phone is 15'
                                            }
                                        })}
                                        value={watch('phone')}
                                        className="ps-2 rounded col-11 login-register-input-data"
                                        type="tel"
                                        placeholder="Phone">
                                    </input>
                                </div>
                            </div>
                            <p className="d-flex justify-content-center mb-0">{errors.phone?.message}</p>
                        </div>
                        <div className="col-9 ">
                            <div className="col-12 d-flex  align-items-center mb-2 mt-3 justify-content-center">
                                <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                    <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M360.113 648Q340 648 326 634.113q-14-13.888-14-34Q312 580 325.887 566q13.888-14 34-14Q380 552 394 565.887q14 13.888 14 34Q408 620 394.113 634q-13.888 14-34 14Zm240 0Q580 648 566 634.113q-14-13.888-14-34Q552 580 565.887 566q13.888-14 34-14Q620 552 634 565.887q14 13.888 14 34Q648 620 634.113 634q-13.888 14-34 14ZM480.458 888q130.458 0 221-91T792 576.24q0-23.24-5-52.74-5-29.5-13-51.5-21 5-38 6.5t-40 1.5q-85.964 0-162.482-33.5T397 350q-37 78-93.5 129T170 556q-1 4-1.5 10t-.5 10q0 130 91 221t221.458 91ZM480 960q-79.376 0-149.188-30Q261 900 208.5 847.5T126 725.042q-30-69.959-30-149.5Q96 496 126 426t82.5-122q52.5-52 122.458-82 69.959-30 149.5-30 79.542 0 149.548 30.24 70.007 30.24 121.792 82.08 51.786 51.84 81.994 121.92T864 576q0 79.376-30 149.188Q804 795 752 847.5T629.869 930Q559.738 960 480 960Zm-55-691q46 63 117 101t154 38q12 0 21-.5t23-2.472Q691 336 625 300t-144.51-36q-12.49 0-26.465 1.5T425 269ZM187 471q57-29 95-71.5T342 298q-63 37-100 78t-55 95Zm238-202Zm-83 29Z" /></svg>
                                </div>
                                <div className="col-sm-11 col-12 input-box">
                                    <input
                                        {...register("Nick", {
                                            required: "Nick is required!",
                                            minLength: {
                                                value: 5,
                                                message: 'Minimal length of Nick is 5'
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: 'Maximal length of Nick is 15'
                                            }
                                        })}
                                        value={watch('Nick')}
                                        className="ps-2 rounded col-11 login-register-input-data"
                                        type="text"
                                        placeholder="Nick">
                                    </input>
                                </div>
                            </div>
                            <p className="d-flex justify-content-center mb-0">{errors.Nick?.message}</p>
                        </div>
                    </div>
                    <div className="login-register-errors mt-4">
                        {registerError}
                    </div>
                    <div className="mt-2 mb-4 ">
                        <button
                            type="submit"
                            className="login-input"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div onClick={() => {
                    dispatch(setRegisterPopup(false))
                    dispatch(setLoginPopup(true))
                }}
                    className="color-black ms-2 me-2 mb-3 d-flex flex-column align-items-center registerLink">
                    back to login
                </div>
            </div >
        </div >
    )
}

export default Registers