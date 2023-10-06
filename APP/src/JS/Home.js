import React, { Suspense, lazy, useContext } from "react";
import MainPage from "./MainPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorBoundary";
import { SessionContext } from "./Session/SessionContext";


const SpecialDrinks = lazy(() => import("./NavBarComponents/SpecialDrinks"))


export default function Home({ searchingDrink, specialOptionsPopup, setSearchingDrink,
    drinkDatas, userScroll, setSpecialOptionsPopup, offset, setOffset, setClickedDrinkDetail }) {

    const { userSesion } = useContext(SessionContext);

    return (

        <div>

            {specialOptionsPopup &&
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SpecialDrinks
                            setSpecialOptionsPopup={setSpecialOptionsPopup}
                            searchingDrink={searchingDrink}
                            setSearchingDrink={setSearchingDrink}
                            drinkDatas={drinkDatas}
                        />
                    </Suspense>
                </ErrorBoundary>
            }

            <MainPage
                setClickedDrinkDetail={setClickedDrinkDetail}
                userScroll={userScroll}
                drinkDatas={drinkDatas}
                searchingDrink={searchingDrink}
                offset={offset}
                setOffset={setOffset}

            />

        </div>
    )
}

