import { Suspense, lazy, useEffect, useState, useContext } from "react"
import { ErrorBoundary } from "react-error-boundary"
import Pagination from 'react-paginate'
import { useMediaQuery } from 'react-responsive'
import { useSelector, useDispatch } from "react-redux"

import localhost from "../../../../config/config"
import { setDrinkNotFound, setUserFavoriteDrinks } from "../States/actions"
import Drink from "../drinksComponents/Drink"
import ErrorFallback from "../ErrorsComponents/ErrorBoundary"
const DDE = lazy(() => import("../ErrorsComponents/DDE"))


function MainPage({ searchingDrink, userScroll, offset, setOffset, setFriendsProfile }) {

    const dispatch = useDispatch()

    const [favorites, setFavorites] = useState([])

    const drinkNotFound = useSelector(state => state.navbar.drinkNotFound)
    const userFavoriteDrinks = useSelector(state => state.user.userFavouriteDrinks)

    const itemsPerPage = 15
    const pageCount = Math.ceil(searchingDrink.length / itemsPerPage)
    const currentData = searchingDrink.slice(offset, offset + itemsPerPage)
    const isSmallScreen = useMediaQuery({ maxWidth: 767 })

    //Pagination handler
    const handlePageClick = (data) => {
        const selectedPage = data.selected
        const offset = selectedPage * itemsPerPage
        window.scrollTo(0, 0)
        setOffset(offset)
    }
    //check if any drinks are visible
    useEffect(() => {
        dispatch(setDrinkNotFound(searchingDrink.length === 0))
    }, [searchingDrink])

    useEffect(() => {
        const fetchUserFavoriteDrinks = async () => {
            try {
                const response = await fetch(`http://${localhost}:3000/api/takeFavouriteUserDrink`, {
                    credentials: 'include'
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch user favourites.')
                }
                const data = await response.json()
                dispatch(setUserFavoriteDrinks(data.drinkIDs))
            } catch (error) {
                console.error(error)
            }
        }
        fetchUserFavoriteDrinks()
    }, [favorites])


    return (
        <main className="main d-flex row justify-content-center me-0  main-holder position-relative">
            <div className='position-sticky arrowUP-holder me-3 d-flex flex-row-reverse column-flex'>
                <a
                    href="#"
                    className={isSmallScreen ? 'd-none' : (userScroll ? 'position-sticky  arrowUP-holder me-3 d-flex flex-row-reverse column-flex' : 'd-none')}
                >
                    <svg
                        className="arrow-up "
                        xmlns="http://www.w3.org/2000/svg"
                        height="40" width="40">
                        <path d="M18.625 26.333h2.75v-7.375l2.958 2.917 1.959-1.917L20 13.667l-6.292 6.291 1.959 1.917 2.958-2.917ZM20 36.667q-3.417 0-6.458-1.313-3.042-1.312-5.313-3.583t-3.583-5.313Q3.333 23.417 3.333 20q0-3.458 1.313-6.5 1.312-3.042 3.583-5.292t5.313-3.562Q16.583 3.333 20 3.333q3.458 0 6.5 1.313 3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5 0 3.417-1.313 6.458-1.312 3.042-3.562 5.313T26.5 35.354q-3.042 1.313-6.5 1.313Zm0-2.792q5.792 0 9.833-4.042 4.042-4.041 4.042-9.833t-4.042-9.833Q25.792 6.125 20 6.125t-9.833 4.042Q6.125 14.208 6.125 20t4.042 9.833q4.041 4.042 9.833 4.042ZM20 20Z" />
                    </svg>
                </a>
            </div>

            {
                currentData.map((elm) => (
                    <Drink
                        favorites={favorites}
                        setFavorites={setFavorites}
                        key={elm.ID_Drink}
                        elm={elm}
                        userFavoriteDrinks={userFavoriteDrinks}
                    />
                ))
            }

            {
                !drinkNotFound && searchingDrink.length > itemsPerPage &&
                <ul>
                    <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        forcePage={offset / itemsPerPage}
                        className=" d-flex align-items-center justify-content-center pagination pt-5"
                        nextLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
                        previousLabel={<svg className="leftArroPagination" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
                    />
                </ul>
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

export default MainPage