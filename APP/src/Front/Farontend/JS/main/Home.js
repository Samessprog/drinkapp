//Imports
import { Suspense, lazy, useEffect } from "react";
import MainPage from "./MainPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorsComponents/ErrorBoundary";

const SpecialDrinks = lazy(() => import("../NavBarComponents/SpecialDrinks"))

export default function Home({ searchingDrink, specialOptionsPopup, setSearchingDrink,
    drinkDatas, userScroll, setSpecialOptionsPopup, offset, setOffset, setFriendsProfile }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                userScroll={userScroll}
                drinkDatas={drinkDatas}
                searchingDrink={searchingDrink}
                offset={offset}
                setOffset={setOffset}
                setFriendsProfile={setFriendsProfile}
            />
        </div>
    )
}

