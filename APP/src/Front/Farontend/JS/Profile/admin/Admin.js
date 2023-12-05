//Imports
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../../ErrorsComponents/ErrorBoundary";
import AdminPagination from "./AdminPagination";
import { setDrinksFlag, setUsersFlag, setFilteredResults, setFilteredUserResults } from '../../States/actions'
import DrinksProfile from "./DrinksProfile";
import WindowAdminAlert from "../../Components/DeleteOrBlockAlert";
import AdminFilter from "./AdminFilter";
import { API_URL } from '../../Components/Constants'

const UsersAdminControlerProfile = lazy(() => import("./UsersAdminControlerProfile"))
const DrinkDetailAdminPreview = lazy(() => import("./DrinkDetailAdminPreview"))
const AdminDataPopup = lazy(() => import("./AdminDataPopup"))

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

    const [changeUserDataPopup, setChangeUserDataPopup] = useState({ isOpenPrev: false, userData: '' })


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


    //Fetch all users from DB
    useEffect(() => {
        const userButtonHandler = async () => {
            try {
                const response = await fetch(`${API_URL}getAllUsers`, {
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
                filteredResults = currentItemsNewDrink.slice().sort((x, y) => {
                    const dateX = new Date(x.Date_Of_Creation.split('.').reverse().join('-'));
                    const dateY = new Date(y.Date_Of_Creation.split('.').reverse().join('-'));

                    if (direction === 1) {
                        return dateX - dateY;
                    } else {
                        return dateY - dateX;
                    }
                });
            } else {
                filteredResults = currentItemsNewDrink?.slice().sort((x, y) => {
                    const dateX = new Date(x.Date_Of_Creation.split('.').reverse().join('-'));
                    const dateY = new Date(y.Date_Of_Creation.split('.').reverse().join('-'));
                    if (direction === -1) {
                        return dateY - dateX;
                    } else {
                        return dateX - dateY;
                    }
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
                const response = await fetch(`${API_URL}getUnAcceptedDrinks`, {
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


    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    <div className="d-flex justify-content-between col-11 mb-5 flex-column align-items-center flex-lg-row">
                        <div className="d-flex ms-5 ms-xxl-3 mt-0 optional-buttons-holder mt-4 col-8 flex-column flex-sm-row">
                            <div className=" me-2 d-flex justify-content-center align-items-center mb-3 mb-sm-0" >
                                <button
                                    className={`mb-md-2 ms-1  btn btn-secondary border  d-flex p-2 change-data-input-user ${drinksFlag ? 'active' : ''}`}
                                    style={{ borderRadius: '15px' }}
                                    onClick={() => {
                                        setInputText('')
                                        dispatch(setUsersFlag(false))
                                        setShowNewsFlag(false)
                                        dispatch(setDrinksFlag(true))
                                        setCurrentPageUsers(0)
                                        setCurrentPageNewDrink(0)
                                    }}
                                >
                                    <svg className="me-1  ms-2 me-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: "white" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z" /></svg> </svg>
                                    <div className="pe-2">Drinks</div>
                                </button>
                            </div>

                            <div className=" me-2 d-flex justify-content-center align-items-center mb-3 mb-sm-0" >
                                <button
                                    className={`mb-md-2 ms-1  btn btn-secondary border  d-flex p-2 change-data-input-user ${usersFlag ? 'active' : ''}`}
                                    style={{ borderRadius: '15px' }}
                                    onClick={() => {
                                        setInputText('')
                                        setShowNewsFlag(false)
                                        dispatch(setDrinksFlag(false))
                                        dispatch(setUsersFlag(true))
                                        setCurrentPage(0)
                                        setCurrentPageNewDrink(0)
                                    }}
                                >
                                    <svg className="me-1  ms-2 me-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: "white" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" /></svg>                                    </svg>
                                    <div className="pe-2">Users</div>
                                </button>
                            </div>

                            <div className=" me-3 d-flex justify-content-center  align-items-center mb-3 mb-sm-0" >
                                <button
                                    className={`mb-md-2 ms-1  btn btn-secondary border  d-flex p-2 change-data-input-user ${showNewsFlag ? 'active' : ''}`}
                                    style={{ borderRadius: '15px' }}
                                    onClick={() => {
                                        dispatch(setUsersFlag(false))
                                        dispatch(setDrinksFlag(false))
                                        setShowNewsFlag(true)
                                        setCurrentPage(0)
                                        setCurrentPageUsers(0)
                                    }}
                                >
                                    <svg className="me-1  ms-2 me-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: "white" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z" /></svg> </svg>
                                    <div className="pe-2">New's</div>
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-sm-10 col-lg-4 d-flex mt-4 align-items-center me-5 justify-content-center ">

                            <input
                                className="searching-items-admin ps-3 pe-3 col-8 d-flex justify-content-center "
                                type="text"
                                placeholder="enter the name you are looking for"
                                value={inputText}
                                onChange={(event) => setInputText(event.target.value)}
                            />
                            <AdminFilter
                                showDrinksOptions={showDrinksOptions}
                                drinksFlag={drinksFlag}
                                usersFlag={usersFlag}
                                showNewsFlag={showNewsFlag}
                                setShowDrinksOptions={setShowDrinksOptions}
                                setAlphabeticalOrder={setAlphabeticalOrder}
                                alphabeticalOrder={alphabeticalOrder}
                                setUnAlphabeticalOrder={setUnAlphabeticalOrder}
                                unAlphabeticalOrder={unAlphabeticalOrder}
                                setIsBlocked={setIsBlocked}
                                isBlocked={isBlocked}
                                setFilterByDate={setFilterByDate}
                                filterByDate={filterByDate}
                            />
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
                    <div className="position-fixed window-alert-holder col-10 col-sm-7 col-md-5 col-xxl-3">
                        <WindowAdminAlert setUsers={setUsers} users={users} hiddenDrinkElements={hiddenDrinkElements} setHiddenDrinkElements={setHiddenDrinkElements} setHiddenElements={setHiddenElements} hiddenElements={hiddenElements} setWindowAlert={setWindowAlert} blockedButton={blockedButton} setBlockedButton={setBlockedButton} windowAlert={windowAlert} setAnnouncementSucces={setAnnouncementSucces} setAnnouncementsUserDoesntExist={setAnnouncementsUserDoesntExist} setAnnouncementsError={setAnnouncementsError} />
                    </div>
                }

                <div className="announcements d-flex flex-column align-items-end pt-3">
                    {announcementSucces &&
                        <div className="announcements-succes d-flex justify-content-end p-3 fs-4">
                            The operation was a success
                        </div>
                    }
                    {announcementsUserDoesntExist &&
                        <div className="announcements-user-doesnt-exist d-flex justify-content-end p-3 fs-4">
                            The Object does not exist
                        </div>
                    }

                    {announcementsError &&
                        <div className="announcements-error d-flex justify-content-end p-3 fs-4">
                            Something went wrong...
                        </div>
                    }
                </div>
            </div>
            {DrinkPreview.isOpenPrev &&
                <DrinkDetailAdminPreview
                    setAnnouncementSucces={setAnnouncementSucces}
                    DrinkPreview={DrinkPreview}
                    setDrinkPreview={setDrinkPreview}
                />
            }
            {changeUserDataPopup.isOpenPrev &&
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminDataPopup
                            users={users}
                            setUsers={setUsers}
                            setChangeUserDataPopup={setChangeUserDataPopup}
                            changeUserDataPopup={changeUserDataPopup}
                            setAnnouncementSucces={setAnnouncementSucces}
                        />
                    </Suspense>
                </ErrorBoundary>
            }
        </div>
    );
}

export default Admin;
