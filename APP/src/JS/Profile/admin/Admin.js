import  { useEffect, useState, useContext, lazy } from "react";
import Pagination from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import { SessionContext } from "../../Session/SessionContext";
import { setDrinksFlag, setUsersFlag, setFilteredResults, setFilteredUserResults } from '../../States/actions'
import DrinksProfile from "./DrinksProfile";
import WindowAdminAlert from "../../Components/DeleteOrBlockAlert";

const UsersAdminControlerProfile = lazy(() => import("./UsersAdminControlerProfile"))

function Admin({ drinkDatas }) {
    const userSesion = useContext(SessionContext).userSesion;

    const [blockedButton, setBlockedButton] = useState(false)

    const dispatch = useDispatch();

    //Admin Sattes to change USER -> DRINKS
    const drinksFlag = useSelector(state => state.admin.drinksFlag)
    const usersFlag = useSelector(state => state.admin.userFlag)
    //States for Filtering drinks and users
    const filteredResults = useSelector(state => state.admin.filteredResults)
    const filteredUserResults = useSelector(state => state.admin.filteredUserResults)

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

    const [users, setUsers] = useState([]);

    const itemsPerPage = 8;

    const [windowAlert, setWindowAlert] = useState({ isOpen: false, ObjectID: null });


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

    //Filtering Drinks
    useEffect(() => {
        const direction = alphabeticalOrder ? 1 : unAlphabeticalOrder ? -1 : 0;
        let filteredResults;

        if (!isBlocked && drinksFlag) {
            filteredResults = currentItems.slice().sort((x, y) => {
                const drinkNameX = x.DrinkName.toUpperCase();
                const drinkNameY = y.DrinkName.toUpperCase();
                return (drinkNameX < drinkNameY ? -1 : drinkNameX > drinkNameY ? 1 : 0) * direction;
            });
            dispatch(setFilteredResults(filteredResults));
        } else {
            filteredResults = currentItemsUsers.slice().sort((x, y) => {
                const drinkNameX = x.Nick.toUpperCase();
                const drinkNameY = y.Nick.toUpperCase();
                return (drinkNameX < drinkNameY ? -1 : drinkNameX > drinkNameY ? 1 : 0) * direction;
            });
            dispatch(setFilteredUserResults(filteredResults));
        }
    }, [alphabeticalOrder, unAlphabeticalOrder, isBlocked, drinksFlag]);

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

    }, [inputText, users, drinkDatas]);


    //Next and previous Carousel Handler functions
    const pageCount = Math.ceil(filteredResults.length / itemsPerPage);
    const currentItems = filteredResults.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCountUsers = Math.ceil(filteredUserResults.length / itemsPerPage);
    const currentItemsUsers = filteredUserResults.slice(
        currentPageUsers * itemsPerPage,
        (currentPageUsers + 1) * itemsPerPage
    );

    const [isHidden, setIsHidden] = useState(false)
    //Do zmiany
    const [hiddenElements, setHiddenElements] = useState([]);
    const [hiddenDrinkElements, setHiddenDrinkElements] = useState([]);


    return (
        <div className="admin-container p-3 p-sm-4 position-relative">
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

            <div className="users-AND-drinks-db-holder  ms-sm-1  m-md-3 col-12">
                <div className="d-sm-flex justify-content-between col-12 mb-5 d-flex-column align-items-center">
                    <div className="d-flex ms-3 mt-0 optional-buttons-holder mt-2 col-6 ">
                        <div className="pb-0 me-2">
                            <button
                                className="optional-buttons"
                                onClick={() => {
                                    setInputText('')
                                    dispatch(setDrinksFlag(true))
                                    dispatch(setUsersFlag(false))
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
                                    dispatch(setUsersFlag(true))
                                    dispatch(setDrinksFlag(false))
                                }}
                            >
                                Users
                            </button>
                        </div>
                    </div>

                    <div className="d-flex mt-3 me-3  d-flex justify-content-center  justify-content-sm-end position-relative">
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
                            {showDrinksOptions === true && (drinksFlag === true || usersFlag === true) &&
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
                                        {usersFlag === true &&
                                            <div className="mt-1">
                                                <input type="checkbox"></input>
                                                <label className="ms-2">Show blocked</label>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <div className="">

                    {usersFlag === true && (
                        <>
                            {currentItemsUsers.map((elm) => (
                                <UsersAdminControlerProfile key={elm.id} elm={elm} hiddenElements={hiddenElements} setWindowAlert={setWindowAlert} windowAlert={windowAlert} setBlockedButton={setBlockedButton} />
                            ))}
                            {currentItemsUsers.length !== 0 &&
                                <div className="d-flex justify-content-center align-items-center">
                                    <Pagination
                                        nextLabel={
                                            <svg
                                                className="arroPagi"
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="40"
                                                width="40"
                                            >
                                                <path
                                                    className="arrowPagination"
                                                    d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z"
                                                />
                                            </svg>
                                        }
                                        previousLabel={
                                            <svg
                                                className="arroPagi"
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="40"
                                                width="40"
                                            >
                                                <path
                                                    className="arrowPagination"
                                                    d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z"
                                                />
                                            </svg>
                                        }
                                        pageCount={pageCountUsers}
                                        onPageChange={({ selected }) => setCurrentPageUsers(selected)}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            }

                            {currentItemsUsers.length === 0 &&
                                <div className="d-flex align-items-center justify-content-center fs-4">No user with that nickname found</div>
                            }

                        </>
                    )}
                    {drinksFlag && (
                        <>
                       
                            {currentItems.map((elm) => (
                                <DrinksProfile key={elm.id} elm={elm} hiddenDrinkElements={hiddenDrinkElements}  setWindowAlert={setWindowAlert} windowAlert={windowAlert}/>
                            ))}

                            {currentItems.length !== 0 &&
                                <div className="d-flex justify-content-center align-items-center">
                                    <Pagination
                                        nextLabel={
                                            <svg
                                                className="arroPagi"
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="40"
                                                width="40"
                                            >
                                                <path
                                                    className="arrowPagination"
                                                    d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z"
                                                />
                                            </svg>
                                        }
                                        previousLabel={
                                            <svg
                                                className="arroPagi"
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="40"
                                                width="40"
                                            >
                                                <path
                                                    className="arrowPagination"
                                                    d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z"
                                                />
                                            </svg>
                                        }
                                        pageCount={pageCount}
                                        onPageChange={({ selected }) => setCurrentPage(selected)}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            }
                            {currentItems.length === 0 &&
                                <div className="d-flex align-items-center justify-content-center fs-4">No drink with that nickname found</div>
                            }

                        </>
                    )}

                </div>
            </div>

            {windowAlert.isOpen &&
                <div className="position-fixed window-alert-holder col-3">
                    <WindowAdminAlert  hiddenDrinkElements={hiddenDrinkElements} setHiddenDrinkElements={setHiddenDrinkElements} setHiddenElements={setHiddenElements} hiddenElements={hiddenElements} setWindowAlert={setWindowAlert} blockedButton={blockedButton} setBlockedButton={setBlockedButton} windowAlert={windowAlert} setAnnouncementSucces={setAnnouncementSucces} setAnnouncementsUserDoesntExist={setAnnouncementsUserDoesntExist} setAnnouncementsError={setAnnouncementsError} />
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
    );
}

export default Admin;
