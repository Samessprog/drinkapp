//Imports
import { Suspense, useState, lazy, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { setLoginPopup, setPopupSetings, setRegisterPopup, setInputDrinkText } from "../States/actions"
import ErrorFallback from "../ErrorsComponents/ErrorBoundary"
import OptionsProfile from "../Profile/user/OptionsProfile"
import Searching from "../Components/Searching"

//Lazy imports 
const LoginPopup = lazy(() => import("../Components/LoginPopup"))
const SetingsPopup = lazy(() => import("./SetingsPopup"))
const Registers = lazy(() => import("../Components/Register"))

function NavBar({ setSearchingDrink, searchingDrink, drinkDatas,
    setSpecialOptionsPopup, userScroll, setFriendsProfile }) {

    const location = useLocation()
    const dispatch = useDispatch()

    const [userProfileOptions, setUserProfileOptions] = useState(false)
    //fetching values ​​from sotrage
    //Take login states from storage
    const loginPopup = useSelector(state => state.navbar.loginPopup)
    const popupSetings = useSelector(state => state.navbar.popupsetings)
    //Take Register states from storage
    const registerPopup = useSelector(state => state.navbar.registerPopup)
    //userSesion
    const userSesion = useSelector(state => state.user.useSesion)
    // take screen  Width
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)
    const [hamburgerAnimation, setHamburgerAnimation] = useState('')

    //check what was clicked
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
                break
            case 'settings':
                handleHamburger()
                closePopups()
                dispatch(setPopupSetings(!popupSetings))
                break
            case 'userProfile':
                handleHamburger()
                closePopups()
                setUserProfileOptions(!userProfileOptions)
                break
            case 'register':
                closePopups()
                dispatch(setRegisterPopup(!registerPopup))
                break
            default:
                closePopups()
                break
        }
    }
    //Resize a icons from Navbar
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        setHamburgerAnimation('')
    }, [userScroll])

    // useEffect(() => {
    //     let timer
    //     if (popupSetings) {
    //         timer = setTimeout(() => {
    //             setShowPopup(true)
    //         }, 5000) 
    //     }

    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [popupSetings])

    return (
        <nav className="NavBar position-sticky top-0 ">

            <Searching
                setSearchingDrink={setSearchingDrink}
                searchingDrink={searchingDrink}
                drinkDatas={drinkDatas}
            />

            <div className="col-12 NavBarContentHolder p-3 pb-0">
                <div className={`col-12 d-flex align-items-center ${userScroll ? 'pb-3' : 'pb-0'}`} >
                    <div className={userScroll ? `d-none` : `col-xl-4 brand-name-SCROLL d-md-flex ${location.pathname.endsWith('/') ? '' : 'col-xl-10 col-xxl-4'}`}>
                        <Link className="d-flex align-items-center logo-link" to="/">
                            <label className="brand-name-nav d-none d-xl-flex">
                                𝒞𝑜𝒸𝓀𝓉𝒶𝒾𝓁 𝒫𝒶𝓇𝓉𝓎
                            </label>
                            <svg
                                className="ms-3 brand-logo d-none d-xxl-block"
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.1em" viewBox="0 0 576 512">
                                <path d="M432 240c53 0 96-43 96-96s-43-96-96-96c-35.5 0-66.6 19.3-83.2 48H296.2C316 40.1 369.3 0 432 0c79.5 0 144 64.5 144 144s-64.5 144-144 144c-27.7 0-53.5-7.8-75.5-21.3l35.4-35.4c12.2 5.6 25.8 8.7 40.1 8.7zM1.8 142.8C5.5 133.8 14.3 128 24 128H392c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-177 177V464h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H208 120c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V345.9L7 169c-6.9-6.9-8.9-17.2-5.2-26.2z" />
                            </svg>
                        </Link>
                    </div>
                    <div
                        id="hamburger"
                        className={userScroll ? `col-xl-4 col-xxl-3 d-flex mb-3 align-items-center mt-3 align-items-center ${location.pathname.endsWith('/') ? '' : 'col-8 col-sm-8 col-md-10 col-xl-9 col-xxl-3'} ` : `hamburger-SCROLL  mt-3 mb-3 ${location.pathname.endsWith('/') ? `` : `col-8 col-sm-8 col-md-10 col-xxl-6 `}`} onClick={(() => { const navbarLinks = document.getElementsByClassName('main-options-holder')[0]; navbarLinks.classList.toggle('d-none'); handlePopup('menu') })}>
                        <div
                            className={`d-flex flex-column justify-content-between align-items-center helper ${hamburgerAnimation ? 'clicked' : (hamburgerAnimation === false ? 'hide' : 'helper')}`}
                            onClick={() => setHamburgerAnimation(!hamburgerAnimation)}
                        >
                            <span className="bar w-100 rounded-pill bg-light"></span>
                            <span className="bar w-100 rounded-pill bg-light"></span>
                            <span className="bar w-100 rounded-pill bg-light"></span>
                        </div>
                        <label
                            onClick={() => setHamburgerAnimation(!hamburgerAnimation)}
                            className={`ms-5  d-xl-flex brand-logo-hamburger  ${location.pathname.endsWith('/') ? 'd-none' : ''}`}>
                            𝒞𝑜𝒸𝓀𝓉𝒶𝒾𝓁 𝒫𝒶𝓇𝓉𝓎
                        </label>
                    </div>
                    {location.pathname.endsWith('/') &&
                        <div className={`d-flex me-3 col-7 col-sm-7 col-md-9 col-xl-6 justify-content-center justify-content-xl-start  ${userScroll ? 'justify-content-xl-center  col-xl-5 ' : 'justify-content-center'}`}>
                            {/* Wyszukiwarka drinków  */}
                            <div className="col-sm8 col-md-8 col-xl-9 searching-holder  ms-3 d-flex align-items-center pt-2 d-flex">
                                <div className="col-11 col-md-10 col-xxl-9 d-flex  align-items-center">
                                    <input
                                        onChange={event => dispatch(setInputDrinkText(event.target.value))}
                                        type="text"
                                        className="searching-input border-0  col-12 ps-4 pe-4 ps-3 "
                                        placeholder="Enter drink name"
                                    />
                                    <button
                                        className="searching-icon-holder border-0 "
                                        id="SignIn"
                                        data-testid="SignIn" >
                                        <svg
                                            className="searching-icon d-none d-md-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px" viewBox="0 0 24 24" width="24px"
                                        >
                                            <path
                                                className="searching-icon"
                                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                        </svg>
                                        <svg
                                            onClick={() => handlePopup('settings')}
                                            className=" me-1 d-block d-md-none fill-color-212 ms-2 me-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24" width="24">
                                            <path d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="options-holder d-none d-md-flex">
                                    <button
                                        className="mb-md-2 ms-1 rounded-pill btn btn-secondary bg-transparent border rounded d-flex p-2"
                                        onClick={() => handlePopup('settings')}>
                                        <svg className="me-1 fill-color-212 ms-2 me-2 filter-icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24" width="24"
                                        >
                                            <path d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z" />
                                        </svg>
                                        <div className="pe-2 ">Filter</div>
                                    </button>
                                    <div className={`filter-dis ${popupSetings ? 'active' : 'hide'}`}>
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
                            </div>
                        </div>
                    }
                    <div className={`d-flex justify-content-end pe-2 pt-36 mt-3 col-sm-4 col-md-2 col-4 ${userScroll ? `col-xl-2 col-xxl-3  ${location.pathname.endsWith('/') ? '' : 'col-2 col-xxl-9'}` : `  ${location.pathname.endsWith('/') ? '  ' : 'col-2 col-xxl-8'}`}`}>
                        {userSesion === null &&
                            <button
                                className=" ms-2 mb-3 login-navbar"
                                onClick={() => handlePopup('login')}
                            >
                                login
                            </button>
                        }

                        {userSesion !== null &&
                            <div
                                onClick={() => handlePopup('userProfile')}
                                className="profileButton-holder  me-2"
                            >
                                <svg
                                    className="ProfileButton"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height={isSmallScreen ? "40" : "48"}
                                    width={isSmallScreen ? "40" : "48"}
                                >
                                    {isSmallScreen ?
                                        <path d="M9.417 29.083q2.458-1.666 5.041-2.541 2.584-.875 5.542-.875 2.958 0 5.562.875 2.605.875 5.063 2.541Q32.333 27 33.104 24.75q.771-2.25.771-4.75 0-5.875-4-9.875t-9.875-4q-5.875 0-9.875 4t-4 9.875q0 2.5.792 4.75.791 2.25 2.5 4.333ZM20 21.375q-2.417 0-4.083-1.667-1.667-1.666-1.667-4.083 0-2.417 1.667-4.083Q17.583 9.875 20 9.875q2.417 0 4.083 1.667 1.667 1.666 1.667 4.083 0 2.458-1.667 4.104-1.666 1.646-4.083 1.646Zm0 15.292q-3.458 0-6.521-1.313-3.062-1.312-5.312-3.583-2.25-2.271-3.542-5.292Q3.333 23.458 3.333 20t1.313-6.5q1.312-3.042 3.583-5.292t5.292-3.562Q16.542 3.333 20 3.333t6.5 1.313q3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5t-1.313 6.479q-1.312 3.021-3.562 5.292T26.5 35.354q-3.042 1.313-6.5 1.313Z" />
                                        :
                                        <svg className="ProfileButton" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" /></svg>
                                    }
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    width="20"
                                    className={`dropArrow ${userProfileOptions ? "rotate180" : "rotateA180"}`}
                                >
                                    <path d="m10 13.062-5-5L6.062 7 10 10.938 13.938 7 15 8.062Z" />
                                </svg>
                                <div className={`OptionsProfile ${userProfileOptions ? 'active' : 'hide'}`}>
                                    {userProfileOptions &&
                                        <OptionsProfile
                                            userProfileOptions={userProfileOptions}
                                            setUserProfileOptions={setUserProfileOptions}
                                            setFriendsProfile={setFriendsProfile}
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className={`login-dis ${loginPopup ? 'active' : 'hide'}`}>
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

                    </div>

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
                <div className={userScroll || window.innerWidth < 1000 ? 'main-options-holder d-none' : 'main-options-holder d-flex '} >
                    <div className="Options-Holder-W100 ">
                        <ul className="d-flex justify-content-center mt-1 navbar-menu ps-0">
                            <li className=" ms-2  elm-contents-holder" >
                                <Link className="elm-contents text-decoration-none" to="/">Home</Link>
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
    )
}

export default NavBar