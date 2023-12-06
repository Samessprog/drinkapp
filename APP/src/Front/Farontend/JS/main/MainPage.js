import { Suspense, lazy, useEffect, useState, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Pagination from 'react-paginate';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { SessionContext } from '../Session/SessionContext'

import FriendsPopup from "../Components/FriendsPopup";
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


    const [chatID, setChatID] = useState(1)
    const [roomFlag, setRoomFlag] = useState(false)
    const [minimalize, setMinimalize] = useState(false)
    const userSession = useContext(SessionContext).userSesion

    const joinChat = () => {
        if (userSession) {
            socket.emit("joinChatRoom", chatID)
            setShowChat(true)
        }
    }

    const [friendsModalFlag, setFriendsModalFlag] = useState(false)


    return (
        <main className="main d-flex row justify-content-center me-0  main-holder position-relative">
            <div className='position-sticky  arrowUP-holder me-3 d-flex flex-row-reverse column-flex'>
                <a href="#" className={isSmallScreen ? 'd-none' : (userScroll ? 'position-sticky  arrowUP-holder me-3 d-flex flex-row-reverse column-flex' : 'd-none')}>
                    <svg className="arrow-up " xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                        <path d="M18.625 26.333h2.75v-7.375l2.958 2.917 1.959-1.917L20 13.667l-6.292 6.291 1.959 1.917 2.958-2.917ZM20 36.667q-3.417 0-6.458-1.313-3.042-1.312-5.313-3.583t-3.583-5.313Q3.333 23.417 3.333 20q0-3.458 1.313-6.5 1.312-3.042 3.583-5.292t5.313-3.562Q16.583 3.333 20 3.333q3.458 0 6.5 1.313 3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5 0 3.417-1.313 6.458-1.312 3.042-3.562 5.313T26.5 35.354q-3.042 1.313-6.5 1.313Zm0-2.792q5.792 0 9.833-4.042 4.042-4.041 4.042-9.833t-4.042-9.833Q25.792 6.125 20 6.125t-9.833 4.042Q6.125 14.208 6.125 20t4.042 9.833q4.041 4.042 9.833 4.042ZM20 20Z" />
                    </svg>
                </a>
            </div>


            {roomFlag &&
                <div className='col-2 chat-room-holder d-flex'>
                    <div className="d-flex flex-column col-12">
                        <div onClick={() => setRoomFlag(false)} className="d-flex justify-content-end close-room-IDs">X</div>
                        <div className="d-flex flex-column align-items-center">
                            <label className="fs-5">Join to chat room</label>
                            <div>
                                <input className="room-id-input" type="number" placeholder="chat ID" onChange={(e) => setChatID(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 ">
                            <div
                                onClick={() => {
                                    joinChat()
                                    setRoomFlag(false)
                                }} className="join-to-room-button" >
                                Join
                            </div>
                        </div>
                    </div>
                </div>
            }


            {
                (!minimalize && userSession !== null) &&
                <>
                    <div onClick={() => setRoomFlag(true)} className='position-sticky chat-holder-icon me-3 d-flex flex-row-reverse column-flex '>
                        <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M240-399.333h315.333V-466H240v66.667ZM240-526h480v-66.666H240V-526Zm0-126.667h480v-66.666H240v66.666ZM80-80v-733.334q0-27 19.833-46.833T146.666-880h666.668q27 0 46.833 19.833T880-813.334v506.668q0 27-19.833 46.833T813.334-240H240L80-80Zm131.333-226.666h602.001v-506.668H146.666v575.002l64.667-68.334Zm-64.667 0v-506.668 506.668Z" /></svg>
                    </div>

                    <div onClick={() => setFriendsModalFlag(true)} className='position-sticky  firends-icon me-3 d-flex flex-row-reverse column-flex' >
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M38.667-160v-100q0-34.666 17.833-63.166T105.333-366Q174.667-397.666 235-412.166q60.333-14.5 123.667-14.5 63.333 0 123.333 14.5T611.333-366q31 14.334 49.167 42.834 18.167 28.5 18.167 63.166v100h-640Zm706.666 0v-102.666q0-56.667-29.5-97.167t-79.167-66.833q63 7.333 118.667 22.5 55.667 15.166 94 35.5 34 19.333 53 46.166 19 26.834 19 59.834V-160h-176ZM358.667-480.667q-66 0-109.667-43.666Q205.333-568 205.333-634T249-743.666q43.667-43.667 109.667-43.667t109.666 43.667Q512-700 512-634t-43.667 109.667q-43.666 43.666-109.666 43.666ZM731.999-634q0 66-43.666 109.667-43.667 43.666-109.667 43.666-11 0-25.667-1.833-14.666-1.833-25.666-5.5 25-27.333 38.166-64.667Q578.666-590 578.666-634t-13.167-80q-13.166-36-38.166-66 12-3.666 25.666-5.5 13.667-1.833 25.667-1.833 66 0 109.667 43.667Q731.999-700 731.999-634ZM105.333-226.666H612V-260q0-14.333-8.166-27.333-8.167-13-20.501-18.667-66-30.333-117-42.167Q415.333-360 358.667-360q-56.667 0-108 11.833Q199.333-336.333 133.333-306q-12.333 5.667-20.167 18.667-7.833 13-7.833 27.333v33.334Zm253.334-320.667q37 0 61.833-24.833Q445.333-597 445.333-634T420.5-695.833q-24.833-24.834-61.833-24.834t-61.834 24.834Q272-671 272-634t24.833 61.834q24.834 24.833 61.834 24.833Zm0 320.667Zm0-407.334Z" /></svg>
                    </div>
                </>
            }

            {
                (showChat && userSession !== null || undefined) &&
                <Chat
                    setShowChat={setShowChat}
                    socket={socket}
                    chatID={chatID}
                    minimalize={minimalize}
                    setMinimalize={setMinimalize}
                />
            }

            {
                friendsModalFlag &&
                <FriendsPopup setFriendsModalFlag={setFriendsModalFlag} />
            }

            {
                currentData.map((elm) => (
                    <Drink
                        favourites={favourites}
                        setFavourites={setFavourites}
                        key={elm.ID_Drink}
                        elm={elm}
                        userFavouriteDrinks={userFavouriteDrinks}
                    />
                ))
            }


            {
                !drinkNotFound && searchingDrink.length > itemsPerPage &&
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={offset / itemsPerPage}
                    className=" d-flex align-items-center justify-content-center pagination pt-5"
                    nextLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
                    previousLabel={<svg className="leftArroPagination" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
                />
            }

            {
                drinkNotFound &&
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
