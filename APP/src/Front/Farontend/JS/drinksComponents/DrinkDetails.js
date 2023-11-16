//Imports
import { useState, useEffect, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { Buffer } from 'buffer';
import Pagination from 'react-paginate';
import { SessionContext } from "../Session/SessionContext";
import { Ring } from "@uiball/loaders";
import { API_URL } from '../Components/Constants';
import axios from 'axios';
import getIconForPreparation from "../Components/FilterIconsAlgo";

function DrinkDetails() {

    let { id } = useParams()
    const [drinkDetail, setDrinkDetail] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    //Drink ingredients 
    const [ingredient, setIngredient] = useState([])
    //Drink Preparation
    const [preparation, setPreparation] = useState([])
    //WAS THE INGREDIENT BEEN PRESSED
    const [ingChecked, setIngChecked] = useState([]);
    const [loadingImgCompleated, setLoginImgCompleated] = useState()
    const [clickedStar, setClickedStar] = useState('')

    const [showDrinkDescription, setShowDrinkDescription] = useState(true)

    useEffect(() => {
        const fetchDrinkDetails = async () => {
            try {
                const { data } = await axios.get(`${API_URL}drinkDetails/${id}`);
                setDrinkDetail(data[0]);
                setIngredient(data[0]?.Ingredients.split('.'));
                setPreparation(data[0]?.Preparation.split('.'));
                setClickedStar(data[0]?.Rate)

            } catch (err) {
                console.log(err);
            }
        };
        fetchDrinkDetails();
    }, [id]);

    const {
        DrinkName,
        Description,
        DifficultyLevel,
        DrinkType,
        Rate,
        Taste,
        drinkHistory,
        ID_DRINK,
    } = drinkDetail


    {/*Paginacja*/ }
    const itemPerPage = 1;
    const pageCount = Math.ceil(preparation?.length / itemPerPage);
    const currentData = preparation?.slice(currentPage, currentPage + itemPerPage);

    // Function to handle page click
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        const currentPage = selectedPage * itemPerPage;

        setCurrentPage(currentPage);
    };

    function crossOutIng(key) {
        const checkedIndex = ingChecked.indexOf(key);
        const newIngChecked = [...ingChecked];
        if (checkedIndex === -1) {
            newIngChecked.push(key);
        } else {
            newIngChecked.splice(checkedIndex, 1);
        }
        setIngChecked(newIngChecked);
    }

    const [detailDrinkIMG, setDetalDrinkIMG] = useState(null);
    const [convertetIMG, setConvertedIMG] = useState('')

    const handleStarClick = (starNumber) => {
        setClickedStar(starNumber);
    };

    let userSession = useContext(SessionContext).userSesion
    const sendARating = async () => {
        let userID = userSession.userID

        try {
            const response = await fetch(`${API_URL}drinkRating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID_DRINK, clickedStar, userID }),
            });
            const data = await response.json();
            if (response.status === 200 || data.message === 'User block successfully') {

            } else if (response.status === 404 && data.error === 'User not found') {
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        if (ID_DRINK !== undefined) {
            const fetchUserFavouriteDrinkImage = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/fetchDrinkIMG/${ID_DRINK}`, {
                        credentials: 'include',
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user favorite drink image.');
                    }
                    // Parsuj odpowiedź jako JSON
                    const data = await response.json();
                    setDetalDrinkIMG(data.image)

                } catch (error) {
                    console.error(error);
                }
            };
            fetchUserFavouriteDrinkImage();
        }
    }, [ID_DRINK]);

    useEffect(() => {
        if (detailDrinkIMG && detailDrinkIMG.data.length > 0) {
            const base64Image = Buffer.from(detailDrinkIMG.data).toString('base64');
            const imageURL = `data:image/jpeg;base64,${base64Image}`;

            setConvertedIMG(imageURL);
            setLoginImgCompleated(true)
        }
    }, [detailDrinkIMG]);

    return (
        <div className="col-12 drink-holder">
            <div className="col-12 drink-main-container mt-5">
                <div className="col-12 d-flex me-0 pe-4 ps-4  flex-contain " >
                    <div className="col-12 col-xxl-7 col-xl-6">
                        <div className="d-flex align-items-center mb-5 name-rating-holder">
                            <header className="d-flex align-items-center ">
                                <div className="drink-name fs-3 fw-bolder" style={{ fontFamily: 'cursive' }} >{DrinkName}</div>
                            </header>
                            <div className="d-flex ms-4 align-items-center rating-holder">

                                {/* Wygeneruj 5 gwiazdek */}
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <svg
                                        key={starNumber}
                                        className={`star ${starNumber <= Rate ? 'gold' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        width="24"
                                        onClick={() => { handleStarClick(starNumber); sendARating() }} // Add an onClick handler
                                        style={{ cursor: 'pointer' }} // Add pointer cursor to indicate it's clickable
                                    >
                                        <path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        {/*Opis i składniki do drinku  */}
                        <div className="col-12 mt-5">
                            <article>
                                <div className="col-12">
                                    <button
                                        className="fs-5 ms-3 drink-detail-button"
                                        onClick={() => {
                                            setShowDrinkDescription(true);
                                        }}
                                    >
                                        Description
                                    </button>
                                    <button
                                        className="fs-5 ms-3 drink-detail-button"
                                        onClick={() => {
                                            setShowDrinkDescription(false);
                                        }}
                                    >
                                        History
                                    </button>
                                    <div className="col-12 col-xl-10 description-holder overflow-y-auto p-3 ps-4 pe-4">
                                        <section>
                                            <div className="d-flex fs-5">
                                                <p className="line-spaced">
                                                    {showDrinkDescription ? (
                                                        <> {Description} </>
                                                    ) : (
                                                        <> {drinkHistory} </>
                                                    )}
                                                </p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </article>
                            <div className="col-xl-9 col-12 d-flex flex-column d-flex  basic-information-drink align-items-center">
                                <label className="fs-3 fw-bolder mt-5">Specifications</label>
                                <div className="d-flex  mt-3 fs-5">
                                    <label className={` me-2 ${DifficultyLevel === 'Easy' ? 'easyLevelClass ' : DifficultyLevel === 'Medium' ? 'mediumLevelClass ' : DifficultyLevel === 'Hard' ? 'hardLevelClass ' : ''}`}>{DifficultyLevel}</label>
                                    <label className={`me-2 ${Taste === 'Sour' ? 'sourClass ' : Taste === 'Sweet' ? 'sweetClass ' : Taste === 'Bitter' ? 'bitterClass ' : ''}`} >{Taste}</label>
                                    <label className={DrinkType === 'Soft' ? 'softClass me-2' : 'alkoClass me-2'}>{DrinkType}</label>
                                </div>
                            </div>
                            <div className="col-xl-9 col-12 mt-5 flex-column d-flex justify-content-center ingredient-details-holder">
                                <label className="fs-4 fw-bolder ms-1 mb-2">Ingredients:</label>
                                <ul className="mt-2 ingrediets-list overflow-auto flex-column fs-5 ">
                                    {ingredient.map((ingredient, key) => (
                                        <li className={ingChecked.includes(key) ? 'crossedOut' : 'ing'} onClick={() => crossOutIng(key)} key={key}> <span>{ingredient}</span></li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-6 col-xxl-5 img-holder-details mb-5 d-flex justify-content-center align-items-center">

                        {loadingImgCompleated ? (
                            <LazyLoadImage
                                src={convertetIMG}
                                effect="blur"
                                className="img-helper img-fluid"
                                alt="Img error"
                            />

                        ) : (
                            <div className="col-12 d-flex justify-content-center">
                                <Ring
                                    size={90}
                                    lineWeight={5}
                                    speed={2}
                                    color="black"
                                    className="col-12"
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* Sposów przygotowania drinku */}
                <div className="d-flex mt-4  justify-content-center  fs-3 fw-bolder  mt-5">Preparation</div>
                <div className="col-12 d-flex  justify-content-center mt-2 align-items-center preparation-holder ">
                    <div className="col-11 col-xl-10 mt-2 border rounded pt-4 ps-4 pe-4 d-flex justify-content-center align-items-center">
                        <div className=" position-relative overflow-auto preparation-holder fs-5 d-flex align-items-center flex-column col-12">
                            <div>
                                {currentData.map((preparation, key) => (
                                    <div key={key}>
                                        {preparation}
                                        {/* Wyświetlenie ikony na podstawie tekstu przygotowania */}
                                        <div className="col mt-5 d-flex justify-content-center align-items-center">
                                            <img src={getIconForPreparation(preparation)} alt="Icon" />
                                        </div>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        pageCount={pageCount}
                                        onPageChange={handlePageClick}
                                        forcePage={currentPage / itemPerPage}
                                        className="position-absolute bottom-0 d-flex pagination align-items-center"
                                        nextLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z" /></svg>}
                                        previousLabel={<svg className="arroPagi" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path className="arrowPagination" d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z" /></svg>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default DrinkDetails;