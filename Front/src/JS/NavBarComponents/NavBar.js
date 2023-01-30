import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Components/ErrorBoundary";

const LoginPopup = React.lazy(() => import("./LoginPopup"))
const SetingsPopup = React.lazy(() => import("./SetingsPopup"))


function NavBar({ setSearchingDrink, searchingDrink, drinkDatas, setDrinkDetailsPopup,
    userScroll, specialOptionsPopup, setSpecialOptionsPopup, Popupsetings,
    setPopupSetings, loginPopup, setLoginPopup, setDrinkNotFound }) {



    const loginHandler = () => {
        if (Popupsetings === true || specialOptionsPopup === true) {
            setPopupSetings(false)
            setSpecialOptionsPopup(false)
        }
        setLoginPopup(!loginPopup)
    }

    const setingsMenu = () => {
        if (loginPopup === true || specialOptionsPopup === true) {
            setLoginPopup(false)
            setSpecialOptionsPopup(false)
        }
        setPopupSetings(!Popupsetings)
    }

    const hamburgerMenu = () => {
        const navbarLinks = document.getElementsByClassName('main-options-holder')[0]
        navbarLinks.classList.toggle('d-none')
    }




    const [inputDrinkText, setInputDrinkText] = React.useState("");

    const setDrinkName = (event) => {
        setInputDrinkText(event.target.value)
    }

    React.useEffect(() => {
        const searchDrinks = async () => {

            const searchingResults = await drinkDatas.filter((elm) => {
                const drinkName = elm.DrinkName.toLowerCase();
                const inputText = inputDrinkText.toLowerCase();

                if (drinkName.includes(inputText)) {
                    return elm;
                }
            });

            setSearchingDrink(searchingResults);
        };

        searchDrinks();
    }, [inputDrinkText, setSearchingDrink]);




    React.useEffect(() => {
        if (searchingDrink.length === 0) {
            setDrinkNotFound(true);
        } else {
            setDrinkNotFound(false);
        }
    }, [searchingDrink, setDrinkNotFound]);







    return (
        <nav className="NavBar position-sticky top-0 ">
            <div className="NavBarContentHolder p-3 pb-0">
                <div className="d-flex justify-content-between col-sm-12 align-items-center">
                    <div className={userScroll ? 'd-none' : 'brand-name-SCROLL d-sm-flex'}>BRANDLOGO</div>
                    {/* hamburger */}
                    <div className={userScroll ? 'd-flex' : 'hamburger-SCROLL'} onClick={hamburgerMenu}>
                        <div className="helper d-flex flex-column justify-content-between align-items-center">
                            <span className="bar w-100 rounded-pill bg-light"></span>
                            <span className="bar w-100 rounded-pill bg-light"></span>
                            <span className="bar w-100 rounded-pill bg-light"></span>
                        </div>
                    </div>

                    <div className="d-flex col-sm-5">

                        {/*Wyszukiwarka drinków  */}

                        <div className="searching-holder position-relative pb-3 col-sm-12">

                            <input onChange={setDrinkName} type="text" className="searching-input  border-0 rounded-pill p-2 ps-3 col-sm-12" placeholder=" Enter drink name" />

                            <button className="searching-icon-holder  border-0 p-0 m-0 position-absolute ">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" >
                                    <path className="icon" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                </svg>
                            </button>
                        </div>


                        <div className="options-holder d-flex ms-2 mb-2">
                            { /*loginPopup || specialOptionsPopup === true ?  setSpecialOptionsPopup(false) && setLoginPopup(false) : setPopupSetings(!Popupsetings) */}
                            <button className="settings-button border-0" onClick={setingsMenu}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                    <path className="options-icon" d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z" />
                                </svg>
                            </button>

                            {Popupsetings && (
                                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <SetingsPopup
                                            Popupsetings={Popupsetings}
                                            setPopupSetings={setPopupSetings}
                                            setSpecialOptionsPopup={setSpecialOptionsPopup}
                                            specialOptionsPopup={specialOptionsPopup}
                                            searchingDrink={searchingDrink}
                                            drinkDatas={drinkDatas}
                                            setSearchingDrink={setSearchingDrink}
                                            setDrinkNotFound={setDrinkNotFound}

                                        />
                                    </Suspense>
                                </ErrorBoundary>
                            )}

                        </div>

                    </div>

                    <div className="">
                        <button onClick={() => setLoginPopup(!loginPopup)} type="button" className="btn btn-dark">Sign in</button>
                    </div>

                    {loginPopup &&
                        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <LoginPopup
                                    setLoginPopup={setLoginPopup}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    }

                </div>

                <div className={userScroll ? 'main-options-holder d-none' : ' main-options-holder d-flex'} >

                    <ul className="d-flex ps-0 navbar-menu">
                        <li className=" ms-2 mt-1 mt-sm-2" >
                            <a onClick={() => setDrinkDetailsPopup(false)} className="elm-contents  text-decoration-none rounded p-2" href="/">Home</a>
                        </li>

                        <li className="ms-2 mt-1 mt-sm-2">
                            <a className="elm-contents text-decoration-none rounded p-2" href="#">Blog</a>
                        </li>

                        <li className="  ms-2 mt-1 mt-sm-2">
                            <a className="elm-contents text-decoration-none rounded p-2" href="#">Tips</a>
                        </li>

                        <li className="  ms-2 mt-1 mt-sm-2">
                            <a className="elm-contents text-decoration-none rounded p-2" href="#contact" >Help</a>
                        </li>

                        <li className="  ms-2 mt-1 mt-sm-2">
                            <a className="elm-contents text-decoration-none rounded p-2" href="#contact">Contact</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav >
    );

}

export default NavBar;