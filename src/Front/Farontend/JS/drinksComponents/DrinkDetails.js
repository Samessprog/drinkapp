//Imports
import { useState, useEffect, useContext } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useParams } from "react-router-dom"
import { Buffer } from 'buffer'
import Pagination from 'react-paginate'
import { SessionContext } from "../Session/SessionContext"
import { Ring } from "@uiball/loaders"
import { API_URL } from '../Components/Constants'
import axios from 'axios'
import getIconForPreparation from "../Components/FilterIconsAlgo"
import shakeIcon from '../../../../Assets/Normal/shaker.png'
import Rating from '@mui/material/Rating'
import localhost from "../../../../config/config"

function DrinkDetails() {

    let { id } = useParams()
    const [drinkDetail, setDrinkDetail] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    //Drink ingredients 
    const [ingredient, setIngredient] = useState([])
    //Drink Preparation
    const [preparation, setPreparation] = useState([])
    //WAS THE INGREDIENT BEEN PRESSED
    const [ingChecked, setIngChecked] = useState([])
    const [loadingImgCompleted, setLoginImgCompleted] = useState()
    const [RateStar, setRateStar] = useState('')

    const [showDrinkDescription, setShowDrinkDescription] = useState(true)
    const [nutritionalValues, setNutritionalValues] = useState([])
    const [showNutritionalValues, setShowNutritionalValues] = useState(false)
    const [showDrinkHistory, setShowDrinkHistory] = useState(false)

    const [detailDrinkIMG, setDetailDrinkIMG] = useState(null)
    const [convertedIMG, setConvertedIMG] = useState('')

    const [rateSuccess, setRateSuccess] = useState(false)

    let userSession = useContext(SessionContext).userSesion

    useEffect(() => {
        const fetchDrinkDetails = async () => {
            try {
                const { data } = await axios.get(`${API_URL}drinkDetails/${id}`)
                setDrinkDetail(data[0])
                setIngredient(data[0]?.Ingredients.split('.'))
                setPreparation(data[0]?.Preparation.split('.'))
                setRateStar(data[0]?.Rate)
                setNutritionalValues(data[0]?.Drink_Nutritional_Values.split('.'))
            } catch (err) {
                console.log(err)
            }
        }
        fetchDrinkDetails()
    }, [id])

    const {
        DrinkName,
        Description,
        DifficultyLevel,
        DrinkType,
        Taste,
        drinkHistory,
        ID_DRINK,
    } = drinkDetail

    {/*Pagination*/ }
    const itemPerPage = 1
    const pageCount = Math.ceil(preparation?.length / itemPerPage)
    const currentData = preparation?.slice(currentPage, currentPage + itemPerPage)

    // Function to handle page click
    const handlePageClick = (data) => {
        const selectedPage = data.selected
        const currentPage = selectedPage * itemPerPage
        setCurrentPage(currentPage)
    }

    function crossOutIng(key) {
        const checkedIndex = ingChecked.indexOf(key)
        const newIngChecked = [...ingChecked]
        if (checkedIndex === -1) {
            newIngChecked.push(key)
        } else {
            newIngChecked.splice(checkedIndex, 1)
        }
        setIngChecked(newIngChecked)
    }

    const sendARating = async (newValue) => {
        let userID = userSession?.userID

        if (!userSession) {
            return 0
        }

        try {
            const response = await fetch(`${API_URL}drinkRating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID_DRINK, newValue, userID }),
            })
            setRateSuccess(true)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (ID_DRINK) {
            const fetchUserFavoriteDrinkImage = async () => {
                try {
                    const response = await fetch(`http://${localhost}:3000/api/fetchDrinkIMG/${ID_DRINK}`, {
                        credentials: 'include',
                    })
                    if (!response.ok) {
                        throw new Error('Failed to fetch user favorite drink image.')
                    }

                    const data = await response.json()
                    setDetailDrinkIMG(data.image)

                } catch (error) {
                    console.error(error)
                }
            }
            fetchUserFavoriteDrinkImage()
        }
    }, [ID_DRINK])

    useEffect(() => {
        if (detailDrinkIMG && detailDrinkIMG.data.length > 0) {
            const base64Image = Buffer.from(detailDrinkIMG.data).toString('base64')
            const imageURL = `data:image/jpeg;base64,${base64Image}`
            setConvertedIMG(imageURL)
            setLoginImgCompleted(true)
        }
    }, [detailDrinkIMG])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setRateSuccess(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [rateSuccess])

    return (
        <main>
            <div className="col-12 drink-holder">
                <div className="col-12 drink-main-container mt-5">
                    <div className="col-12 d-flex me-0 pe-4 ps-4  flex-contain " >
                        <div className="col-12 col-xxl-7 col-xl-6">
                            <div className="d-flex align-items-center name-rating-holder">
                                <header className="d-flex align-items-center ">
                                    <div
                                        className="drink-name fs-2 fw-bolder ps-3  me-4 me-sm-0"
                                        style={{ fontFamily: 'cursive' }}
                                    >
                                        {DrinkName}
                                    </div>
                                </header>
                                <div className="d-flex ms-4 align-items-center rating-holder pt-2 pt-sm-0 me-5 me-sm-0">
                                    <Rating
                                        name="simple-controlled"
                                        value={RateStar}
                                        onChange={userSession ?
                                            (event, newValue) => {
                                                sendARating(newValue)
                                            } : null
                                        }
                                        readOnly={!userSession}
                                        size={"large"}
                                    />
                                </div>
                            </div>
                            <div className="col-12 mt-5">
                                <article>
                                    <div className="col-12 col-sm-11">
                                        <div className="d-flex mb-2 button-detail-holder col-11" >
                                            <div
                                                className={` ms-3 fw-bolder drink-detail-button ${showDrinkDescription ? 'activ-detail' : ''}`}
                                                onClick={() => {
                                                    setShowDrinkDescription(true)
                                                    setShowNutritionalValues(false)
                                                    setShowDrinkHistory(false)
                                                }}
                                            >
                                                Description
                                            </div>
                                            <div
                                                className={` ms-3 fw-bolder drink-detail-button ${showDrinkHistory ? 'activ-detail' : ''}`}
                                                onClick={() => {
                                                    setShowDrinkHistory(true)
                                                    setShowDrinkDescription(false)
                                                    setShowNutritionalValues(false)
                                                }}
                                            >
                                                History
                                            </div>
                                            <div
                                                className={` ms-3 fw-bolder drink-detail-button ${showNutritionalValues ? 'activ-detail' : ''}`}
                                                onClick={() => {
                                                    setShowNutritionalValues(true)
                                                    setShowDrinkDescription(false)
                                                    setShowDrinkHistory(false)
                                                }}
                                            >
                                                Nutritional Values
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-10 description-holder overflow-y-auto p-3 ps-4 pe-4 ">
                                            <section className="">
                                                <div className="d-flex ">

                                                    {showNutritionalValues &&
                                                        <div>
                                                            {nutritionalValues ? (
                                                                <section className="d-flex flex-column">
                                                                    {nutritionalValues.map((elm) =>
                                                                        <div className="d-flex column-flex">
                                                                            <label>{elm}</label>
                                                                        </div>
                                                                    )}
                                                                </section>
                                                            ) : (
                                                                <div>
                                                                    drink has no nutritional value wait until they are added
                                                                </div>
                                                            )}
                                                        </div>
                                                    }

                                                    {showDrinkDescription &&
                                                        <div>
                                                            {Description ? (
                                                                <section className="line-spaced">
                                                                    {Description}
                                                                </section>
                                                            ) : (
                                                                <div>
                                                                    The drink has no Description
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {showDrinkHistory &&
                                                        <div>
                                                            {drinkHistory ? (
                                                                <section className="line-spaced">{drinkHistory}</section>

                                                            ) : (
                                                                <div>
                                                                    The drink has no History
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </article>
                                <div className="col-xl-9 col-12 d-flex flex-column d-flex  basic-information-drink align-items-center">
                                    <label className=" font-size-19 fw-bolder mt-5">Specifications</label>
                                    <div className="d-flex  mt-3 fs-5">
                                        <label
                                            className={` me-2 fs-4 ${DifficultyLevel === 'Easy' ? 'easyLevelClass ' : DifficultyLevel === 'Medium' ? 'mediumLevelClass ' : DifficultyLevel === 'Hard' ? 'hardLevelClass ' : 'extreme-Level-Class'}`}>
                                            {DifficultyLevel}
                                        </label>
                                        <label
                                            className={`me-2 fs-4 ${Taste === 'Sour' ? 'sourClass ' : Taste === 'Sweet' ? 'sweetClass ' : Taste === 'Bitter' ? 'bitterClass' : 'mixed-class'}`} >
                                            {Taste}
                                        </label>
                                        <label
                                            className={` me-2 fs-4 ${DrinkType === 'Soft' ? 'softClass' : DrinkType === 'Fizzy' ? 'fizzyClass' : DrinkType === 'Hot' ? 'hotClass' : DrinkType === 'Herbal' ? 'herbalClass' : DrinkType === 'Still' ? 'stillClass' : ''}`}>
                                            {DrinkType}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-9 mt-5 flex-column d-flex justify-content-center ingredient-details-holder">
                                    <label className="fs-4 fw-bolder ms-1 mb-2">Ingredients:</label>
                                    <ul className="col-12 mt-2 ingrediets-list overflow-auto flex-column d-flex  justify-content-start align-items-start ps-0 ps-sm-5">
                                        {ingredient.map((ingredient, key) => (
                                            <li
                                                className={ingChecked.includes(key) ? 'crossedOut' : 'ing'}
                                                onClick={() => crossOutIng(key)} key={key}>
                                                <span>{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <figure className="col-12 col-xl-6 col-xxl-5 img-holder-details mb-0 mb-sm-5 d-flex justify-content-center align-items-center">
                            {loadingImgCompleted ? (
                                <LazyLoadImage
                                    src={convertedIMG}
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
                        </figure>
                    </div >
                    {/* Sposów przygotowania drinku */}
                    <div className="d-flex mt-4  justify-content-center fs-3 fw-bolder mt-5">Preparation</div >
                    <div className="col-12 d-flex  justify-content-center mt-2 align-items-center preparation-holder ">
                        <div className="col-11 col-xl-8 mt-2 border rounded pt-4 ps-4 pe-4 d-flex justify-content-center align-items-center">
                            <div className=" position-relative overflow-auto preparation-holder fs-5 d-flex align-items-center flex-column col-12">
                                <div>
                                    {currentData.map((preparation, key) => (
                                        <div key={key}>
                                            <label className="preparation-text">{preparation}</label>
                                            <div className=" mt-5 d-flex justify-content-center align-items-center">
                                                <img
                                                    src={getIconForPreparation(preparation)}
                                                    alt="loading-error"
                                                    className={`${getIconForPreparation(preparation) === shakeIcon ? 'testKE' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="d-flex justify-content-center col-12">
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
                {rateSuccess &&
                    <div className="announcements d-flex flex-column align-items-end pt-3">
                        <div className="announcements-succes d-flex justify-content-end p-3 fs-4 text-black">
                            The rating has been added
                        </div>
                    </div>
                }
            </div >
        </main >
    )
}

export default DrinkDetails