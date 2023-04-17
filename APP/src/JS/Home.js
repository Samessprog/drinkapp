import React, { Suspense } from "react";
import MainPage from "./MainPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorBoundary";



const SpecialDrinks = React.lazy(() => import("./NavBarComponents/SpecialDrinks"))


export default function Home({ searchingDrink, specialOptionsPopup, setSearchingDrink,
    drinkDatas, userScroll, setSpecialOptionsPopup, offset, setOffset, eachdrinkflag, setEachdrinkflag }) {
       
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
                            eachdrinkflag={eachdrinkflag}
                            setEachdrinkflag={setEachdrinkflag}
                        />
                    </Suspense>
                </ErrorBoundary>
            }

            <MainPage
                userScroll={userScroll}
                drinkDatas={drinkDatas}
                searchingDrink={searchingDrink}
                offset={offset}
                setOffset={setOffset}

            />

        </div>
    )
}

