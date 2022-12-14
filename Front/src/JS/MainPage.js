import React, { Suspense } from "react";
import Drink from "./drinksComponents/Drink";
import { ErrorBoundary } from "react-error-boundary";
import Pagination from 'react-paginate';


import ErrorFallback from "./Components/ErrorBoundary";
const DDE = React.lazy(() => import("./drinksComponents/DDE"))
//const Drink = React.lazy(() => import("./drinksComponents/Drink"))

function MainPage({ searchingDrink, setDrinkDetailsPopup, userScroll, drinkNotFound, offset, setOffset}) {

    const itemsPerPage = 4; // ilość elementów na stronie
    const pageCount = Math.ceil(searchingDrink.length / itemsPerPage);  // ilość stron
    const currentData = searchingDrink.slice(offset, offset + itemsPerPage);
    
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * itemsPerPage;
        window.scrollTo(0, 0);
        setOffset(offset);
    };


return (

    <main className="main d-flex row justify-content-center me-0 ">

        <div className={userScroll ? 'position-sticky position-sticky arrowUP-holder me-3 d-flex flex-row-reverse' : 'd-none'}>
            <a href="#">
                <svg className="arrow-up " xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M18.625 26.333h2.75v-7.375l2.958 2.917 1.959-1.917L20 13.667l-6.292 6.291 1.959 1.917 2.958-2.917ZM20 36.667q-3.417 0-6.458-1.313-3.042-1.312-5.313-3.583t-3.583-5.313Q3.333 23.417 3.333 20q0-3.458 1.313-6.5 1.312-3.042 3.583-5.292t5.313-3.562Q16.583 3.333 20 3.333q3.458 0 6.5 1.313 3.042 1.312 5.292 3.562t3.562 5.292q1.313 3.042 1.313 6.5 0 3.417-1.313 6.458-1.312 3.042-3.562 5.313T26.5 35.354q-3.042 1.313-6.5 1.313Zm0-2.792q5.792 0 9.833-4.042 4.042-4.041 4.042-9.833t-4.042-9.833Q25.792 6.125 20 6.125t-9.833 4.042Q6.125 14.208 6.125 20t4.042 9.833q4.041 4.042 9.833 4.042ZM20 20Z" /></svg>
            </a>
        </div>

        <>
            {currentData.map((elm) => (
                <Drink
                    key={elm.ID_Drink}
                    setDrinkDetailsPopup={setDrinkDetailsPopup}
                    elm={elm}
                />
            ))}

            <Pagination
                pageCount={pageCount}
                onPageChange={handlePageClick}
                forcePage={offset / itemsPerPage}
                className=" d-flex align-items-center justify-content-center pagination pt-5"
                nextLabel={<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="nextPageArrow" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
                previousLabel={<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="nextPageArrow" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
            />
        </>


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
