import React, { useState } from "react";
import DrinksProfile from "./DrinksProfile";
import Pagination from 'react-paginate';
import UsersAdminControlerProfile from './UsersAdminControlerProfile'
import { useDispatch, useSelector } from 'react-redux';

import { setDrinksFlag, setUsersFlag, setFilteredResults, setFilteredUserResults } from '../../States/actions'


function Admin({ drinkDatas }) {

    const dispatch = useDispatch();

    const drinksFlag = useSelector(state => state.admin.drinksFlag)
    const usersFlag = useSelector(state => state.admin.userFlag)
    const filteredResults = useSelector(state => state.admin.filteredResults)
    const filteredUserResults = useSelector(state => state.admin.filteredUserResults)

    const [currentPage, setCurrentPage] = useState(0);
    const [inputText, setInputText] = useState('');
    const [users, setUsers] = useState([]);
    const [currentPageUsers, setCurrentPageUsers] = useState(0);

    const itemsPerPage = 8;

    React.useEffect(() => {
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


    React.useEffect(() => {

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


    return (
        <div className="admin-container p-3 p-sm-4">
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

            <div className="users-AND-drinks-db-holder  ms-sm-1  m-md-3 ">
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
                                    dispatch(setDrinksFlag(false))
                                    dispatch(setUsersFlag(true))
                                }}
                            >
                                Users
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
                            >
                                <path d="M440-160q-17 0-28.5-11.5T400-200v-240L163.333-742q-14.333-18-4.166-38 10.166-20 32.833-20h576q22.667 0 32.833 20 10.167 20-4.166 38L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-286.666 226.001-286.668H253.999L480-446.666Zm0 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="">

                    {usersFlag && (
                        <>
                            {currentItemsUsers.map((elm) => (
                                <UsersAdminControlerProfile key={elm.id} elm={elm} />
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
                                        onPageChange={ ({ selected }) => setCurrentPageUsers(selected) }
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
                                <DrinksProfile key={elm.id} elm={elm} />
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
                                        onPageChange={({ selected }) => setCurrentPage(selected) }
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
        </div>
    );
}

export default Admin;
