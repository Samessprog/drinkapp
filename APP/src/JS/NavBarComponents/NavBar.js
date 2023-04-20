import { Suspense, useState, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Components/ErrorBoundary";
import OptionsProfile from "../Profile/OptionsProfile";
import Searching from "../Components/Searching";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setLoginPopup, setPopupSetings, setRegisterPopup, setInputDrinkText } from "../States/actions";




const LoginPopup = lazy(() => import("./LoginPopup"))
const SetingsPopup = lazy(() => import("./SetingsPopup"))
const Registers = lazy(() => import("../Register/Register"))



function NavBar({ setSearchingDrink, searchingDrink, drinkDatas,
    setSpecialOptionsPopup, userScroll }) {

    const location = useLocation();
    const dispatch = useDispatch();

    const [userProfileOptions, setUserProfileOptions] = useState(false)

    const loginPopup = useSelector(state => state.navbar.loginPopup);
    const popupSetings = useSelector(state => state.navbar.popupsetings);
    const registerPopup = useSelector(state => state.navbar.registerPopup);
    //userSesion
    const userSesion = useSelector(state => state.user.useSesion)


    const handlePopup = (popupName) => {
        const closePopups = () => {
            setUserProfileOptions(false)
            dispatch(setRegisterPopup(false))
            dispatch(setLoginPopup(false))
            dispatch(setSpecialOptionsPopup(false))
            dispatch(setPopupSetings(false))
        }

        const handleHamburger = () => {
            if (window.innerWidth <= 575) { document.getElementsByClassName('main-options-holder')[0].classList.add('d-none') }
        }

        switch (popupName) {
            case 'login':
                handleHamburger()
                closePopups()
                dispatch(setLoginPopup(!loginPopup))
                break;
            case 'settings':
                handleHamburger()
                closePopups()
                dispatch(setPopupSetings(!popupSetings))
                break;
            case 'userProfile':
                handleHamburger()
                closePopups()
                setUserProfileOptions(!userProfileOptions)
                break;
            case 'register':
                closePopups()
                dispatch(setRegisterPopup(!registerPopup))
                console.log(registerPopup)
                break;
            default:
                closePopups()
                break;
        }
    }

    return (
        <nav className="NavBar position-sticky top-0 ">

            <Searching
                setSearchingDrink={setSearchingDrink}
                searchingDrink={searchingDrink}
                drinkDatas={drinkDatas}

            />

            <div className="NavBarContentHolder p-3 pb-0">
                <div className="d-flex justify-content-between col-sm-12 align-items-center">
                    <div className={userScroll ? 'd-none' : 'brand-name-SCROLL d-md-flex'}>BRANDLOGO</div>
                    {/* hamburger */}
                    
                    <div id="hamburger" className={userScroll ? 'd-flex' : 'hamburger-SCROLL'} onClick={(() => { const navbarLinks = document.getElementsByClassName('main-options-holder')[0]; navbarLinks.classList.toggle('d-none'); handlePopup('menu') })}>
                        <div className="helper d-flex flex-column justify-content-between align-items-center">
                            <span className="bar w-100 rounded-pill bg-light"></span>
                            <span className="bar w-100 rounded-pill bg-light"></span>
                            <span className="bar w-100 rounded-pill bg-light"></span>
                        </div>
                    </div>
  
                <div className="d-flex col-sm-6 col-sm-6  col-xl-5  col-9">

                    {/* Wyszukiwarka drinków  */}
                    {location.key.startsWith('default') &&

                        <div className="searching-holder position-relative  pb-3 col-sm-12 ms-3 d-flex align-items-center ">

                            <div className="col-12 position-relative">
                                <input
                                    onChange={event => dispatch(setInputDrinkText(event.target.value))}
                                    type="text"
                                    className="searching-input border-0 rounded-pill col-12 ps-4 pe-5 ps-3 "
                                    placeholder="Enter drink name"
                                />
                                <button className="searching-icon-holder border-0 p-0 m-0 position-absolute top-50  translate-middle-y" id="SignIn" data-testid="SignIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                                        <path className="icon" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="options-holder">
                                { /*loginPopup || specialOptionsPopup === true ?  setSpecialOptionsPopup(false) && setLoginPopup(false) : setPopupSetings(!popupSetings) */}


                                <button className="settings-button border-0" onClick={() => handlePopup('settings')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                        <path d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z" />
                                    </svg>
                                </button>


                                {popupSetings && (
                                    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                                        <Suspense fallback={<div>Loading...</div>}>

                                            <SetingsPopup
                                                setPopupSetings={setPopupSetings}
                                                setSpecialOptionsPopup={setSpecialOptionsPopup}
                                                searchingDrink={searchingDrink}
                                                drinkDatas={drinkDatas}
                                                setSearchingDrink={setSearchingDrink}

                                            />
                                        </Suspense>

                                    </ErrorBoundary>
                                )}
                            </div>

                        </div>
                    }


                </div>

                <div className="">
                    {userSesion === null &&
                        <div className=" ms-2 mb-3" onClick={() => handlePopup('login')}>Login</div>
                    }

                    {userSesion !== null &&
                        <div onClick={() => handlePopup('userProfile')} className="position-relative me-">
                            <svg className="ProfileButton" xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                                <path d="M9.417 29.083q2.458-1.666 5.041-2.541 2.584-.875 5.542-.875 2.958 0 5.562.875 2.605.875 5.063 2.541Q32.333 27 33.104 24.75q.771-2.25.771-4.75 0-5.875-4-9.875t-9.875-4q-5.875 0-9.875 4t-4 9.875q0 2.5.792 4.75.791 2.25 2.5 4.333ZM20 21.375q-2.417 0-4.083-1.667-1.667-1.666-1.667-4.083 0-2.417 1.667-4.083Q17.583 9.875 20 9.875q2.417 0 4.083 1.667 1.667 1.666 1.667 4.083 0 2.458-1.667 4.104-1.666 1.646-4.083 1.646Zm0 15.292q-3.458 0-6.521-1.313-3.062-1.312-5.312-3.583-2.25-2.271-3.542-5.292Q3.333 23.458 3.333 20t1.313-6.5q1.312-3.042 3.583-5.292t5.292-3.562Q16.542 3.333 20 3.333t6.5 1.313q3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5t-1.313 6.479q-1.312 3.021-3.562 5.292T26.5 35.354q-3.042 1.313-6.5 1.313Z" />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="20"
                                className={`dropArrow ${userProfileOptions ? "rotate180" : ""}`}
                            >
                                <path d="m10 13.062-5-5L6.062 7 10 10.938 13.938 7 15 8.062Z" />
                            </svg>

                            {userProfileOptions &&
                                <OptionsProfile />
                            }

                        </div>
                    }


                </div>

                {loginPopup &&
                    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <LoginPopup
                                setLoginPopup={setLoginPopup}
                                setRegisterPopup={setRegisterPopup}
                            />
                        </Suspense>
                    </ErrorBoundary>
                }

                {registerPopup &&
                    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Registers
                                setLoginPopup={setLoginPopup}
                                setRegisterPopup={setRegisterPopup}
                            />
                        </Suspense>
                    </ErrorBoundary>
                }

            </div>

            <div className={userScroll && window.innerWidth > 768 ? 'main-options-holder d-none' : 'main-options-holder d-flex'} >
                <div className="Options-Holder-W100">
                    <ul className="d-flex justify-content-center ps-0 navbar-menu">
                        <li className=" ms-2  elm-contents-holder " >
                            <a className="elm-contents  text-decoration-none" href="/">Home</a>
                        </li>

                        <li className="ms-2  elm-contents-holder ">
                            <a className="elm-contents text-decoration-none" href="#">Blog</a>
                        </li>

                        <li className="  ms-2 elm-contents-holder  ">
                            <a className="elm-contents text-decoration-none " href="#">Tips</a>
                        </li>

                        <li className="  ms-2  elm-contents-holder ">
                            <a className="elm-contents text-decoration-none " href="#contact" >Help</a>
                        </li>

                        <li className="  ms-2 elm-contents-holder ">
                            <a className="elm-contents text-decoration-none" href="#contact">Contact</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        </nav >
    );
}

export default NavBar;