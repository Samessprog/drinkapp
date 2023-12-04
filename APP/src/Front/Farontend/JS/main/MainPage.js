import { Suspense, lazy, useEffect, useState, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Pagination from 'react-paginate';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { SessionContext } from '../Session/SessionContext'

import Chat from "../Components/chat";
import { setDrinkNotFound, setUserFavouriteDrinks } from "../States/actions";
import Drink from "../drinksComponents/Drink";
import ErrorFallback from "../ErrorsComponents/ErrorBoundary";
const DDE = lazy(() => import("../ErrorsComponents/DDE"))

const socket = io.connect("http://localhost:4001")

function MainPage({ searchingDrink, userScroll, offset, setOffset }) {

    const dispatch = useDispatch();

    const [showChat, setShowChat] = useState(false)
    const [favourites, setFavourites] = useState([]);

    const drinkNotFound = useSelector(state => state.navbar.drinkNotFound);
    const userFavouriteDrinks = useSelector(state => state.user.userFavouriteDrinks);

    const itemsPerPage = 15;
    const pageCount = Math.ceil(searchingDrink.length / itemsPerPage);
    const currentData = searchingDrink.slice(offset, offset + itemsPerPage);

    const isSmallScreen = useMediaQuery({ maxWidth: 767 });

    //Pagination handler
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * itemsPerPage;
        window.scrollTo(0, 0);
        setOffset(offset);
    };

    //check if any drinks are visible
    useEffect(() => {
        dispatch(setDrinkNotFound(searchingDrink.length === 0));
    }, [searchingDrink]);

    useEffect(() => {
        const fetchUserFavouriteDrinks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/takeFavouriteUserDrink', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user favourites.');
                }
                const data = await response.json();
                dispatch(setUserFavouriteDrinks(data.drinkIDs));
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserFavouriteDrinks();

    }, [favourites]);

    const [minimalize, setMinimalize] = useState(false)
    const userSession = useContext(SessionContext).userSesion
    const chatID = 1
    const joinChat = () => {
        if (userSession) {
            socket.emit("joinChatRoom", chatID)
            setShowChat(true)
        }
    }

    return (
        <main className="main d-flex row justify-content-center me-0 main-holder">
            <div className='position-sticky  arrowUP-holder me-3 d-flex flex-row-reverse column-flex'>
                <a href="#" className={isSmallScreen ? 'd-none' : (userScroll ? 'position-sticky  arrowUP-holder me-3 d-flex flex-row-reverse column-flex' : 'd-none')}>
                    <svg className="arrow-up " xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                        <path d="M18.625 26.333h2.75v-7.375l2.958 2.917 1.959-1.917L20 13.667l-6.292 6.291 1.959 1.917 2.958-2.917ZM20 36.667q-3.417 0-6.458-1.313-3.042-1.312-5.313-3.583t-3.583-5.313Q3.333 23.417 3.333 20q0-3.458 1.313-6.5 1.312-3.042 3.583-5.292t5.313-3.562Q16.583 3.333 20 3.333q3.458 0 6.5 1.313 3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5 0 3.417-1.313 6.458-1.312 3.042-3.562 5.313T26.5 35.354q-3.042 1.313-6.5 1.313Zm0-2.792q5.792 0 9.833-4.042 4.042-4.041 4.042-9.833t-4.042-9.833Q25.792 6.125 20 6.125t-9.833 4.042Q6.125 14.208 6.125 20t4.042 9.833q4.041 4.042 9.833 4.042ZM20 20Z" />
                    </svg>
                </a>
            </div>
            {!minimalize &&
                <div className='position-sticky  chat-holder-icon me-3 d-flex flex-row-reverse column-flex'>
                    <svg className="fill-white" onClick={joinChat} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M240-399.333h315.333V-466H240v66.667ZM240-526h480v-66.666H240V-526Zm0-126.667h480v-66.666H240v66.666ZM80-80v-733.334q0-27 19.833-46.833T146.666-880h666.668q27 0 46.833 19.833T880-813.334v506.668q0 27-19.833 46.833T813.334-240H240L80-80Zm131.333-226.666h602.001v-506.668H146.666v575.002l64.667-68.334Zm-64.667 0v-506.668 506.668Z" /></svg>
                </div>
            }

            {(showChat && userSession !== undefined) &&
                <Chat
                    setShowChat={setShowChat}
                    socket={socket}
                    chatID={chatID}
                    minimalize={minimalize}
                    setMinimalize={setMinimalize}
                />
            }

            {currentData.map((elm) => (
                <Drink
                    favourites={favourites}
                    setFavourites={setFavourites}
                    key={elm.ID_Drink}
                    elm={elm}
                    userFavouriteDrinks={userFavouriteDrinks}
                />
            ))}

            {!drinkNotFound && searchingDrink.length > itemsPerPage &&
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={offset / itemsPerPage}
                    className=" d-flex align-items-center justify-content-center pagination pt-5"
                    nextLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
                    previousLabel={<svg className="leftArroPagination" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
                />
            }

            {drinkNotFound &&
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <DDE />
                    </Suspense>
                </ErrorBoundary>
            }
        </main >
    )
}

export default MainPage;
