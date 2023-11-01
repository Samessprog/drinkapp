//Imports
import { useEffect, useState, lazy } from "react";
import { useDispatch, useSelector } from 'react-redux';

import AdminPagination from "./AdminPagination";
import { setDrinksFlag, setUsersFlag, setFilteredResults, setFilteredUserResults } from '../../States/actions'
import DrinksProfile from "./DrinksProfile";
import WindowAdminAlert from "../../Components/DeleteOrBlockAlert";

const UsersAdminControlerProfile = lazy(() => import("./UsersAdminControlerProfile"))
const DrinkDetailAdminPreview = lazy(() => import("./DrinkDetailAdminPreview"))

function Admin({ drinkDatas }) {

    const dispatch = useDispatch();

    const [blockedButton, setBlockedButton] = useState(false)
    //Admin Sattes to change USER -> DRINKS
    const drinksFlag = useSelector(state => state.admin.drinksFlag)
    const usersFlag = useSelector(state => state.admin.userFlag)
    //States for Filtering drinks and users
    const filteredResults = useSelector(state => state.admin.filteredResults)
    const filteredUserResults = useSelector(state => state.admin.filteredUserResults)

    const [filteredNewDrinksResults, setFilteredNewDrinksResults] = useState([])

    const [inputText, setInputText] = useState('');
    const [alphabeticalOrder, setAlphabeticalOrder] = useState(false)
    const [unAlphabeticalOrder, setUnAlphabeticalOrder] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)

    //announcement for Delete user
    const [announcementSucces, setAnnouncementSucces] = useState(false)
    const [announcementsUserDoesntExist, setAnnouncementsUserDoesntExist] = useState(false)
    const [announcementsError, setAnnouncementsError] = useState(false)

    const [showDrinksOptions, setShowDrinksOptions] = useState(false)
    //Carousel States
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageUsers, setCurrentPageUsers] = useState(0);
    const [currentPageNewDrink, setCurrentPageNewDrink] = useState(0);

    const [users, setUsers] = useState([]);
    // ile drinków na strone ma się wyświetlać i userów
    const itemsPerPage = 10;

    const [windowAlert, setWindowAlert] = useState({ isOpen: false, ObjectID: null });

    const [hiddenElements, setHiddenElements] = useState([]);
    const [hiddenDrinkElements, setHiddenDrinkElements] = useState([]);

    const [showNewsFlag, setShowNewsFlag] = useState(false)
    const [filterByDate, setFilterByDate] = useState(false)

    const [DrinkPreview, setDrinkPreview] = useState({ isOpenPrev: false, Drink: null })

    const [changeUserDataPopup, setChangeUserDataPopup] = useState('')

    // const [blockedDrink, setBlockedDrink] = useState(null)
    // useEffect(() => {
    //     const getBlockedDrink = async () => {
    //         try {
    //             const response = await fetch('http://localhost:3000/api/getAdminProfileDrinks', {
    //                 credentials: 'include'
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log(data)
    //                 setBlockedDrink(data);
    //             } else {
    //                 console.error('Error fetching users:', response.status);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };
    //     getBlockedDrink();
    // }, [])

    // console.log(blockedDrink)



    //Fetch all users from DB
    useEffect(() => {
        const userButtonHandler = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getAllUsers', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Error fetching users:', response.status);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        userButtonHandler();
    }, [])

    //Use Effect to close an allerts
    useEffect(() => {
        if (announcementSucces) {
            const timer = setTimeout(() => {
                setAnnouncementSucces(false);
            }, 3000);

            // Wyczyść timer, jeśli komponent zostanie odmontowany przed upływem czasu
            return () => clearTimeout(timer);
        }
    }, [announcementSucces]);

    useEffect(() => {
        if (announcementsError) {
            const timer = setTimeout(() => {
                setAnnouncementsError(false);
            }, 3000);

            // Wyczyść timer, jeśli komponent zostanie odmontowany przed upływem czasu
            return () => clearTimeout(timer);
        }
    }, [announcementsError]);

    useEffect(() => {
        if (announcementsUserDoesntExist) {
            const timer = setTimeout(() => {
                setAnnouncementsUserDoesntExist(false);
            }, 3000);

            // Wyczyść timer, jeśli komponent zostanie odmontowany przed upływem czasu
            return () => clearTimeout(timer);
        }
    }, [announcementsUserDoesntExist]);

    //Filtering Drinks do optymalizacji!!
    useEffect(() => {
        const direction = alphabeticalOrder ? 1 : unAlphabeticalOrder ? -1 : 0;
        let filteredResults;
        if (drinksFlag) {
            filteredResults = currentItems.slice().sort((x, y) => {
                const drinkNameX = x.DrinkName.toUpperCase();
                const drinkNameY = y.DrinkName.toUpperCase();
                return (drinkNameX < drinkNameY ? -1 : drinkNameX > drinkNameY ? 1 : 0) * direction;
            });
            dispatch(setFilteredResults(filteredResults));
        } else if (usersFlag) {
            let filteredResults;

            if (isBlocked && !alphabeticalOrder && !unAlphabeticalOrder) {
                filteredResults = currentItemsUsers?.filter((userElm) => userElm.IsBlocked === 1);
            } else if (!isBlocked && !alphabeticalOrder && !unAlphabeticalOrder) {
                filteredResults = users;
            } else {
                filteredResults = currentItemsUsers?.slice().sort((x, y) => {
                    const userNameX = x.Nick.toUpperCase();
                    const userNameY = y.Nick.toUpperCase();
                    return (userNameX < userNameY ? -1 : userNameX > userNameY ? 1 : 0) * direction;
                });
            }
            dispatch(setFilteredUserResults(filteredResults));
        } else if (showNewsFlag) {
            if (filterByDate) {
                filteredResults = currentItemsNewDrink?.slice().sort((x, y) => {
                    // Parsowanie daty do obiektów Date
                    const dateX = new Date(x.Date_Of_Creation);
                    const dateY = new Date(y.Date_Of_Creation);

                    if (direction === 1) {
                        return dateX - dateY;
                    } else {
                        return dateY - dateX;
                    }

                });
            } else {
                filteredResults = currentItemsNewDrink?.slice().sort((x, y) => {
                    const newDrinkNameX = x.DrinkName.toUpperCase();
                    const newDrinkNameY = y.DrinkName.toUpperCase();
                    return (newDrinkNameX < newDrinkNameY ? -1 : newDrinkNameX > newDrinkNameY ? 1 : 0) * direction;
                });
            }
            setFilteredNewDrinksResults(filteredResults);
        }

    }, [alphabeticalOrder, unAlphabeticalOrder, isBlocked, filterByDate, filterByDate]);

    //Filtering Users
    useEffect(() => {

        const inputTXT = inputText.toLowerCase()

        const drinksFilter = drinkDatas.filter((drnik) => {
            const drinkName = drnik.DrinkName.toLowerCase()
            return drinkName.includes(inputTXT)
        })

        const usersFilter = users.filter((user) => {
            const userNickName = user.Nick.toLowerCase();
            return userNickName.includes(inputTXT)
        })

        dispatch(setFilteredUserResults(usersFilter))
        dispatch(setFilteredResults(drinksFilter))

    }, [inputText, users, drinkDatas, usersFlag]);


    let pageCount;
    let currentItems;

    let pageCountUsers;
    let currentItemsUsers;

    if (drinksFlag) {
        pageCount = Math.ceil(filteredResults.length / itemsPerPage);
        currentItems = filteredResults.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );
    }

    if (usersFlag) {
        pageCountUsers = Math.ceil(filteredUserResults.length / itemsPerPage);
        currentItemsUsers = filteredUserResults.slice(
            currentPageUsers * itemsPerPage,
            (currentPageUsers + 1) * itemsPerPage
        );
    }

    const pageCountNewDrink = Math.ceil(filteredNewDrinksResults?.length / itemsPerPage);

    const currentItemsNewDrink = filteredNewDrinksResults?.slice(
        currentPageNewDrink * itemsPerPage,
        (currentPageNewDrink + 1) * itemsPerPage
    );

    useEffect(() => {
        const getUnAcceptedDrinks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getUnAcceptedDrinks', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setFilteredNewDrinksResults(data);
                } else {
                    console.error('Error fetching users:', response.status);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUnAcceptedDrinks();
    }, [])

    return (
        <div className="col-12">
            <div className="admin-container p-3 p-sm-4 position-relative ">
                <div className="admin-header-holder">
                    <header className="fs-2 admin-header">Hello admin NAME</header>
                </div>

                <div className="users-chart-holder mt-5 d-flex justify-content-center align-items-center ms-sm-1  m-md-3">
                    <div className="">
                        miejsce na wykres od usera i opcje jego zmiany
                    </div>
                </div>

                <div className="fs-2 white header-admin ms-3 ">
                    <header>Database of users and drinks</header>
                </div>

                <div className="users-AND-drinks-db-holder  ms-sm-1  m-md-3 col-12 d-flex flex-column align-items-center">
                    <div className="d-sm-flex justify-content-between col-12 mb-5 d-flex-column align-items-center">
                        <div className="d-flex ms-3 mt-0 optional-buttons-holder mt-2 col-6">
                            <div className="pb-0 me-2">
                                <button
                                    className="optional-buttons"
                                    onClick={() => {
                                        setInputText('')
                                        dispatch(setUsersFlag(false))
                                        setShowNewsFlag(false)
                                        dispatch(setDrinksFlag(true))
                                        setCurrentPageUsers(0)
                                        setCurrentPageNewDrink(0)
                                    }}
                                >
                                    Drinks
                                </button>
                            </div>
                            <div className="">
                                <button
                                    className="optional-buttons"
                                    onClick={() => {
                                        setInputText('')
                                        setShowNewsFlag(false)
                                        dispatch(setDrinksFlag(false))
                                        dispatch(setUsersFlag(true))
                                        setCurrentPage(0)
                                        setCurrentPageNewDrink(0)
                                    }}
                                >
                                    Users
                                </button>
                            </div>
                            <div className="ms-2">
                                <button
                                    className="optional-buttons"
                                    onClick={() => {
                                        dispatch(setUsersFlag(false))
                                        dispatch(setDrinksFlag(false))
                                        setShowNewsFlag(true)
                                        setCurrentPage(0)
                                        setCurrentPageUsers(0)
                                    }}
                                >
                                    News
                                </button>
                            </div>
                        </div>

                        <div className="d-flex mt-3 me-3  d-flex justify-content-center  justify-content-sm-end ">
                            <div className="me-4 col-8 col-sm-12">
                                <input
                                    className="searching-items-admin ps-3 pe-3 col-12"
                                    type="text"
                                    placeholder="enter the name you are looking for"
                                    value={inputText}
                                    onChange={(event) => setInputText(event.target.value)}
                                />
                            </div>
                            <div className="data-filtering-holder">
                                <svg
                                    className="data-filtering-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="40"
                                    viewBox="0 -960 960 960"
                                    width="40"
                                    onClick={() => setShowDrinksOptions(!showDrinksOptions)}
                                >
                                    <path d="M440-160q-17 0-28.5-11.5T400-200v-240L163.333-742q-14.333-18-4.166-38 10.166-20 32.833-20h576q22.667 0 32.833 20 10.167 20-4.166 38L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-286.666 226.001-286.668H253.999L480-446.666Zm0 0Z" />
                                </svg>
                                {showDrinksOptions && (drinksFlag || usersFlag || showNewsFlag) &&
                                    <div className="multi-options-holder-admin">
                                        <div className="ps-3 pt-3 pb-3">
                                            <div className="mt-1">
                                                <input type="checkbox" onChange={() => setAlphabeticalOrder(!alphabeticalOrder)} ></input>
                                                <label className="ms-2"  >Alphabetic order</label>
                                            </div>
                                            <div className="mt-1">
                                                <input type="checkbox" onChange={() => setUnAlphabeticalOrder(!unAlphabeticalOrder)} ></input>
                                                <label className="ms-2">Unalphabetic order</label>
                                            </div>
                                            {usersFlag &&
                                                <div className="mt-1">
                                                    <input type="checkbox" onChange={() => setIsBlocked(!isBlocked)}></input>
                                                    <label className="ms-2">Show blocked</label>
                                                </div>
                                            }
                                            {showNewsFlag &&
                                                <div className="mt-1">
                                                    <input type="checkbox" onChange={() => setFilterByDate(!filterByDate)}></input>
                                                    <label className="ms-2">Order by date</label>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-11 d-flex flex-column align-items-center ">
                        {usersFlag === true && (
                            <AdminPagination
                                currentPaginationItem={currentItemsUsers}
                                hiddenElements={hiddenElements}
                                setWindowAlert={setWindowAlert}
                                windowAlert={windowAlert}
                                setBlockedButton={setBlockedButton}
                                pageCountItem={pageCountUsers}
                                setCurrentPage={setCurrentPageUsers}
                                ComponentRender={UsersAdminControlerProfile}
                                setChangeUserDataPopup={setChangeUserDataPopup}
                            />
                        )}

                        {drinksFlag && (

                            <AdminPagination
                                setDrinkPreview={setDrinkPreview}
                                currentPaginationItem={currentItems}
                                hiddenElements={hiddenDrinkElements}
                                setWindowAlert={setWindowAlert}
                                windowAlert={windowAlert}
                                setBlockedButton={setBlockedButton}
                                pageCountItem={pageCount}
                                setCurrentPage={setCurrentPage}
                                ComponentRender={DrinksProfile}
                                setAnnouncementSucces={setAnnouncementSucces}
                            />

                        )}

                        {showNewsFlag && (
                            <AdminPagination
                                setDrinkPreview={setDrinkPreview}
                                hiddenElements={hiddenDrinkElements}
                                setWindowAlert={setWindowAlert}
                                windowAlert={windowAlert}
                                showNewsFlag={showNewsFlag}
                                setAnnouncementSucces={setAnnouncementSucces}
                                currentPaginationItem={currentItemsNewDrink}
                                pageCountItem={pageCountNewDrink}
                                setCurrentPage={setCurrentPageNewDrink}
                                ComponentRender={DrinksProfile}
                            />
                        )}

                    </div>
                </div>

                {windowAlert.isOpen &&
                    <div className="position-fixed window-alert-holder col-3">
                        <WindowAdminAlert hiddenDrinkElements={hiddenDrinkElements} setHiddenDrinkElements={setHiddenDrinkElements} setHiddenElements={setHiddenElements} hiddenElements={hiddenElements} setWindowAlert={setWindowAlert} blockedButton={blockedButton} setBlockedButton={setBlockedButton} windowAlert={windowAlert} setAnnouncementSucces={setAnnouncementSucces} setAnnouncementsUserDoesntExist={setAnnouncementsUserDoesntExist} setAnnouncementsError={setAnnouncementsError} />
                    </div>
                }

                <div className="announcements d-flex flex-column align-items-center pt-3">
                    {announcementSucces &&
                        <div className="announcements-succes d-flex justify-content-center w-100">
                            The operation was a success
                        </div>
                    }
                    {announcementsUserDoesntExist &&
                        <div className="announcements-user-doesnt-exist d-flex justify-content-center w-100">
                            The Object does not exist
                        </div>
                    }

                    {announcementsError &&
                        <div className="announcements-error d-flex justify-content-center w-100">
                            Something went wrong...
                        </div>
                    }
                </div>


            </div>
            {DrinkPreview.isOpenPrev &&
                <DrinkDetailAdminPreview
                    DrinkPreview={DrinkPreview}
                    setDrinkPreview={setDrinkPreview}
                />
            }
            {changeUserDataPopup &&
                <div className="userDataChangeHolder col-5">
                    <div className="d-flex flex-row-reverse me-3 mt-2 mb-3" onClick={() => setChangeUserDataPopup(false)}> X</div>
                    <div className="d-flex  flex-column align-items-center mb-5">
                        <div className="fs-5">User DODAĆ ID data Changer</div>
                        <div className="col-9 d-flex mt-4">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" /></svg>
                            </div>
                            <div className="col-11 input-box">
                                <input className="col-11 ps-2 rounded login-register-input-data" type="Email" placeholder="password"></input>
                            </div>
                        </div>
                        <div className="col-9 d-flex mt-4">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M264 1008q-29.7 0-50.85-21.15Q192 965.7 192 936V216q0-29.7 21.15-50.85Q234.3 144 264 144h432q29.7 0 50.85 21.15Q768 186.3 768 216v720q0 29.7-21.15 50.85Q725.7 1008 696 1008H264Zm0-216v144h432V792H264Zm215.789 108Q495 900 505.5 889.711q10.5-10.29 10.5-25.5Q516 849 505.711 838.5q-10.29-10.5-25.5-10.5Q465 828 454.5 838.289q-10.5 10.29-10.5 25.5Q444 879 454.289 889.5q10.29 10.5 25.5 10.5ZM264 720h432V336H264v384Zm0-456h432v-48H264v48Zm0 528v144-144Zm0-528v-48 48Z" /></svg>
                            </div>
                            <div className="col-11 input-box">
                                <input className="col-11 ps-2 rounded login-register-input-data" type="Phone" placeholder="password"></input>
                            </div>
                        </div>
                        <div className="col-9 d-flex mt-4">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M360.113 648Q340 648 326 634.113q-14-13.888-14-34Q312 580 325.887 566q13.888-14 34-14Q380 552 394 565.887q14 13.888 14 34Q408 620 394.113 634q-13.888 14-34 14Zm240 0Q580 648 566 634.113q-14-13.888-14-34Q552 580 565.887 566q13.888-14 34-14Q620 552 634 565.887q14 13.888 14 34Q648 620 634.113 634q-13.888 14-34 14ZM480.458 888q130.458 0 221-91T792 576.24q0-23.24-5-52.74-5-29.5-13-51.5-21 5-38 6.5t-40 1.5q-85.964 0-162.482-33.5T397 350q-37 78-93.5 129T170 556q-1 4-1.5 10t-.5 10q0 130 91 221t221.458 91ZM480 960q-79.376 0-149.188-30Q261 900 208.5 847.5T126 725.042q-30-69.959-30-149.5Q96 496 126 426t82.5-122q52.5-52 122.458-82 69.959-30 149.5-30 79.542 0 149.548 30.24 70.007 30.24 121.792 82.08 51.786 51.84 81.994 121.92T864 576q0 79.376-30 149.188Q804 795 752 847.5T629.869 930Q559.738 960 480 960Zm-55-691q46 63 117 101t154 38q12 0 21-.5t23-2.472Q691 336 625 300t-144.51-36q-12.49 0-26.465 1.5T425 269ZM187 471q57-29 95-71.5T342 298q-63 37-100 78t-55 95Zm238-202Zm-83 29Z" /></svg>
                            </div>
                            <div className="col-11 input-box">
                                <input className="col-11 ps-2 rounded login-register-input-data" type="text" placeholder="password"></input>
                            </div>
                        </div>
                        <div className="col-9 d-flex mt-4">
                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M263.717 960Q234 960 213 938.85T192 888V504q0-29.7 21.15-50.85Q234.3 432 264 432h24v-96q0-79.68 56.226-135.84t136-56.16Q560 144 616 200.16T672 336v96h24q29.7 0 50.85 21.15Q768 474.3 768 504v384q0 29.7-21.162 50.85Q725.676 960 695.96 960H263.717Zm.283-72h432V504H264v384Zm216.212-120Q510 768 531 746.788q21-21.213 21-51Q552 666 530.788 645q-21.213-21-51-21Q450 624 429 645.212q-21 21.213-21 51Q408 726 429.212 747q21.213 21 51 21ZM360 432h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456V504v384Z" /></svg>
                            </div>
                            <div className="col-11 input-box">
                                <input className="col-11 ps-2 rounded login-register-input-data" type="password" placeholder="password"></input>
                            </div>
                        </div>
                        <div>ROLA</div>
                    </div>
                </div>
            }

        </div>
    );
}

export default Admin;
