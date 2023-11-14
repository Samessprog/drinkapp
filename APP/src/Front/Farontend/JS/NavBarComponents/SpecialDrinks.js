//Imports
import { Suspense, lazy, useState, useRef, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';

import { setEachdrinkflag, setingredient } from "../States/actions";
import Searching from "../Components/Searching";
import ErrorFallback from "../ErrorsComponents/ErrorBoundary";
const Ingreadinet = lazy(() => import("../drinksComponents/Ingreadinet"))

function SpecialDrinks({ setSearchingDrink, setSpecialOptionsPopup, drinkDatas, setDrinkNotFound }) {

    const dispatch = useDispatch();

    const eachdrinkflag = useSelector(state => state.drink.eachdrinkflag)
    const drinkCounter = useSelector(state => state.drink.drinkCounter)
    const ingredient = useSelector(state => state.drink.ingredient)
    const [ingredientText, setIngredientText] = useState("")

    const submitIngreadinetsHandler = () => {
        dispatch(setingredient([
            ...ingredient,
            { text: ingredientText, id: uuid() }
        ]))
        setIngredientText("")
    }


    let settingsRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!settingsRef.current.contains(e.target)) {
                dispatch(setSpecialOptionsPopup(false))
            }
        };
    
        document.addEventListener("mousedown", handler);
    
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);


    return (
        <div ref={settingsRef} className="col-12 special-drinks-holder position-fixed mt-5 " style={{ textAlign: "center" }}>

            <Searching
                ingredient={ingredient}
                setDrinkNotFound={setDrinkNotFound}
                eachdrinkflag={eachdrinkflag}
                drinkDatas={drinkDatas}
                setSearchingDrink={setSearchingDrink}
            />

            <div className="col-12 col-sm-10 col-xxl-6  helper rounded p-3" style={{ margin: "auto" }}>
                <div className="d-flex flex-row-reverse ">
                    <svg
                        className="close-icon d-flex flex-row-reverse " onClick={() => dispatch(setSpecialOptionsPopup(false))}
                        xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                </div>
                <div className="flex-column mt-1 d-none d-sm-flex">
                    <label className="d-flex justify-content-center fs-4 fw-bolder">Note:</label>
                    <div className="fs-5">Please enter the ingredients you have and then click
                        <label className="ms-1 me-1">
                            <svg style={{ fill: 'white' }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                        </label>
                        .If you want to delete a component, click
                        <label>
                            <label className="ms-1 me-1">
                                <svg style={{ fill: 'red' }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                            </label>
                        </label>
                        .</div>
                </div>
                <div className="col-12 d-flex justify-content-center mb-3 align-items-center mt-3 mb-3">
                    <input value={ingredientText} onChange={(event) => setIngredientText(event.target.value)} className="col-6 ingredients-input  ps-3 " type="text" placeholder="Enter your ingredients"></input>
                    <button onClick={submitIngreadinetsHandler} className="ing-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                    </button>
                </div>
                <div className="d-flex justify-content-center  align-items-center  mb-2">
                    <input type="checkbox" onClick={() => dispatch(setEachdrinkflag(!eachdrinkflag))} />
                    {
                        !eachdrinkflag ? (
                            <label className="ms-2  special-options-holder">Search for ALL drinks with the given ingredients</label>
                        ) : (
                            <label className="ms-2  special-options-holder">Search for ONLY drinks with the given ingredients</label>
                        )
                    }
                </div>
                <div className="col-12 justify-content-between align-items-center d-flex">
                    <div className="col-12 col-lg-9 test overflow-auto pe-2">
                        <label className="d-flex ms-5 mb-3 fs-5 fs-lg-4"> Your ingredients:</label>
                        <ul className="col-12 ms-0">
                            {ingredient.map((ing) => (
                                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }} key={ing.id}>
                                    <Suspense>
                                        <Ingreadinet ing={ing} key={ing.id} setingredient={setingredient} ingredient={ingredient} />
                                    </Suspense>
                                </ErrorBoundary>
                            ))}
                        </ul>
                    </div>
                    <div className="col-2 d-none d-lg-block">
                        <svg className="special-drink-ing-icon" height="150px" width="150px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.862 314.862" link="http://www.w3.org/1999/xlink" enable-background="new 0 0 314.862 314.862">
                            <path d="m111.964,160.37c0.841,10.703 11.333,17.847 21.558,14.789 8.885-2.657 13.934-12.015 11.277-20.9-4.504-15.064-12.983-44.946-31.316-69.222l2.629-6.734 .458-6.887 .639-.337c3.783-2.002 6.457-5.553 7.338-9.749l2.181-10.425c0.617-2.95 0.302-5.967-0.912-8.723l-12.685-28.922c-4.474-10.203-16.361-14.852-26.568-10.37l-74.486,32.662c-10.207,4.476-14.849,16.36-10.371,26.568l23.293,53.119c4.467,10.186 16.388,14.835 26.568,10.369l50.561-22.173c6.888,21.949 8.168,32.289 9.836,56.935zm-10.865-109.055l-1.462,.772c-4.436,2.344-7.283,6.73-7.618,11.738l-.598,8.974-3.782,9.692-41.686,18.28-19.41-44.265 65.633-28.781 9.382,21.395-.459,2.195z" />
                            <path d="m302.786,77.107l-74.484-32.663c-10.183-4.466-22.101,0.184-26.57,10.369l-12.687,28.935c-1.211,2.757-1.524,5.771-0.908,8.71l2.179,10.412c0.874,4.203 3.553,7.764 7.348,9.768l.631,.333 .458,6.887 2.806,7.188c-30.768,39.907-33.418,72.477-33.672,73.524h-101.664c-6.903,0-12.5,5.597-12.5,12.5 0,30.735 14.743,58.121 37.594,75.61h-2.528c-6.903,0-12.5,5.597-12.5,12.5s5.597,12.5 12.5,12.5h122.951c6.903,0 12.5-5.597 12.5-12.5s-5.597-12.5-12.5-12.5h-2.528c22.85-17.489 37.594-44.876 37.594-75.61 0-6.903-5.597-12.5-12.5-12.5h-33c1.574-19.151 3.964-37.019 11.25-55.658l50.739,22.25c10.187,4.467 22.103-0.187 26.569-10.37l23.293-53.117c4.475-10.207-0.161-22.094-10.371-26.568zm-82.105,148.462c-6,32.957-35.292,58.044-70.416,58.044s-64.417-25.087-70.417-58.044h140.833zm48.229-83.244l-41.686-18.279-3.783-9.692-.597-8.96c-0.323-4.933-3.239-9.435-7.618-11.752l-1.462-.772-.46-2.195 9.382-21.394 65.634,28.781-19.41,44.263z" />
                        </svg>
                    </div>
                </div>

                <div className="d-flex flex-column  justify-content-between align-items-center mt-3">
                    <label className="special-options-holder">The amount of drinks we have with these ingredients:</label>
                    <label className={`drink-results mt-1 mb-1 d-flex justify-content-center align-items-center fs-2 fw-bold ${drinkCounter === 0 && 'text-danger'}`}>
                        <CountUp
                            start={drinkCounter + 10}
                            end={drinkCounter}
                            duration={4}
                        >
                        </CountUp>
                        {drinkCounter === 0 &&
                            <svg className="ms-2" fill="red" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40">
                                <path d="M480-418q-67.333 0-122.167 37.833Q303-342.333 277.333-280h405.334q-25-63-80.167-100.5T480-418Zm-178-68 48-44 44 44 34.666-38-44-44 44-44.667-34.666-38-44 44-48-44-34.667 38 44 44.667-44 44L302-486Zm264.667 0L610-530l48.667 44 34.666-38-44-44 44-44.667-34.666-38-48.667 44-43.333-44-34.667 38L575.334-568 532-524l34.667 38ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 333.334q139.333 0 236.334-97 97-97.001 97-236.334t-97-236.334q-97.001-97-236.334-97t-236.334 97q-97 97.001-97 236.334t97 236.334q97.001 97 236.334 97Z" />
                            </svg>
                        }
                    </label>
                </div>
                <div className="col-12 d-flex flex-row-reverse search-special-holder" onClick={() => dispatch(setSpecialOptionsPopup(false))}>
                    <button className="col-12 col-lg-2 rounded-pill btn btn-secondary bg-transparent border rounded d-flex p-2 ps-3 pe-3 mt-2 justify-content-center">
                        <svg className="me-1 ms-2 me-2 search-special-icon" xmlns="http://www.w3.org/2000/svg"
                            height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q-54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29-71q0 42 29 71t71 29Z" />
                        </svg>
                        <div className="pe-2">Search</div>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default SpecialDrinks;