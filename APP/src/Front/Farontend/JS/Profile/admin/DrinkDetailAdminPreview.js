//Imports
import { useState, useEffect } from "react"
import { Buffer } from "buffer"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { API_URL } from '../../Components/Constants'

function DrinkDetailAdminPreview({ DrinkPreview, setDrinkPreview, setAnnouncementSucces }) {

    const { isOpenPrev, Drink } = DrinkPreview

    const [detailDrinkIMG, setDetalDrinkIMG] = useState(null)
    const [convertetIMG, setConvertedIMG] = useState('')
    //States for Update Drink
    const [ingredient, setIngredient] = useState([])
    const [preparation, setPreparation] = useState([])
    const [drinkNameInput, setDrinknameInput] = useState(Drink.DrinkName)
    const [drinkDescriptionInput, setDrinkDescriptionInput] = useState(Drink.Description)
    const [drinkHistoryInput, setDrinkHistoryInput] = useState(Drink.drinkHistory)
    const [drinkLevelInput, setDrinkLevelInput] = useState(Drink.DifficultyLevel)
    const [drinkTasteInput, setDrinkTasteInput] = useState(Drink.Taste)
    const [drinkTypeInput, setDrinkTypeInput] = useState(Drink.DrinkType)
    const [drinkNutritionalValues, setDrinkNutritionalValues] = useState(Drink.Drink_Nutritional_Values)

    const [drinkImg, setDrinkImg] = useState(convertetIMG)

    useEffect(() => {
        if (Drink.ID_DRINK !== undefined) {
            const fetchUserFavouriteDrinkImage = async () => {
                try {
                    let ID_Drink = Drink.ID_DRINK
                    const response = await fetch(`${API_URL}fetchDrinkIMG/${ID_Drink}`, {
                        credentials: 'include',
                    })
                    if (!response.ok) {
                        throw new Error('Failed to fetch user favorite drink image.')
                    }
                    const data = await response.json()
                    setDetalDrinkIMG(data.image)

                } catch (error) {
                    console.error(error)
                }
            }
            fetchUserFavouriteDrinkImage()
        }
    }, [DrinkPreview])

    useEffect(() => {
        if (detailDrinkIMG && detailDrinkIMG.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(detailDrinkIMG.data).toString('base64')
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`
            setConvertedIMG(imageURL)
        } else {
            setConvertedIMG('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg')
        }
    }, [detailDrinkIMG])

    useEffect(() => {
        const result = Drink
        setIngredient(result?.Ingredients.split('.'))
        setPreparation(result?.Preparation.split('.'))
    }, [DrinkPreview])

    const DrinkDateUpdate = async (event) => {
        event.preventDefault()

        const drink_ID = Drink.ID_DRINK
        const formData = new FormData()

        const fileSizeInMB = drinkImg.size / (1024 * 1024)

        if (fileSizeInMB > 5) {
            alert('File size exceeds the limit of 5 MB!')
            return
        }

        formData.append('drinkImg', drinkImg)
        formData.append('drinkID', drink_ID)
        formData.append('drinkNameInput', drinkNameInput)
        formData.append('drinkDescriptionInput', drinkDescriptionInput)
        formData.append('drinkHistoryInput', drinkHistoryInput)
        formData.append('drinkNutritionalValues', drinkNutritionalValues)
        formData.append('drinkLevelInput', drinkLevelInput)
        formData.append('drinkTasteInput', drinkTasteInput)
        formData.append('drinkTypeInput', drinkTypeInput)
        formData.append('ing', ingredient)
        formData.append('prep', preparation)

        try {
            const response = await fetch(`${API_URL}drinksDataUpdate`, {
                method: 'POST',
                body: formData,
            })
            const data = await response.json()
            if (data.success) {
                setDrinkPreview(false)
                setAnnouncementSucces(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (event, index) => {
        const newPrep = [...preparation]
        newPrep[index] = event.target.value
        setPreparation(newPrep)
    }

    const handleIngredientsInputChange = (event, index) => {
        const newIng = [...ingredient]
        newIng[index] = event.target.value
        setIngredient(newIng)
    }

    const ownDrinkImgPrev = (event) => {
        const drinkImg = event.target

        if (drinkImg.files && drinkImg.files[0]) {
            const reader = new FileReader()

            reader.onload = (e) => {
                setConvertedIMG(e.target.result)
            }
            reader.readAsDataURL(drinkImg.files[0])
        }
    }

    const [descriptionFlag, setDescriptionFlag] = useState(true)
    const [historyFlag, setHistoryFlag] = useState(false)
    const [nutritionalValues, setNutritionalValues] = useState(false)

    const [ingredientFlag, setIngredientFlag] = useState(true)

    return (
        <div className="fullscreen col-12">
            <div className="col-12">
                <div className="close-preview-icon-holder d-flex flex-row-reverse mt-3 pe-2 col-12" >
                    <svg className="close-preview-icon" onClick={() => setDrinkPreview(false)} xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m332-285.333 148-148.001 148 148.001L674.667-332 526.666-480l148.001-148L628-674.667 480-526.666 332-674.667 285.333-628l148.001 148-148.001 148L332-285.333ZM480-80q-82.333 0-155.333-31.5t-127.334-85.833Q143-251.667 111.5-324.667T80-480q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.333-31.5 155.333T763-197.333Q709-143 636-111.5T480-80Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666-619.333 146.666-480q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480-480Z" /></svg>
                </div>
                <form onSubmit={DrinkDateUpdate}>
                    <div className="data-drink-holder d-flex  flex-column flex-xxl-row align-items-center align-items-xxl-start ">
                        <div className="col-12 col-xxl-8">
                            <div className="d-flex fs-3 fw-bolder col-12  ">
                                <div className="col-12 d-flex flex-column align-items-center align-items-xxl-start ">
                                    <label className="mb-1 ms-1">Drink name</label>
                                    <input
                                        className="drink-name-input fs-5 col-xxl-5 col-10 "
                                        value={drinkNameInput}
                                        onChange={(e) => setDrinknameInput(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center align-items-xxl-start col-12">
                                <div className="mt-5 fs-4 fw-bolder mb-2">
                                    <label
                                        onClick={() => {
                                            setDescriptionFlag(true)
                                            setNutritionalValues(false)
                                            setHistoryFlag(false)
                                        }}
                                        className="ms-1">
                                        <div className={`drink-changer-data ${descriptionFlag ? 'focus' : ''}`}>
                                            Description
                                        </div>
                                    </label>
                                    <label
                                        onClick={() => {
                                            setHistoryFlag(true)
                                            setDescriptionFlag(false)
                                            setNutritionalValues(false)
                                        }}
                                        className="ms-3">
                                        <div className={`drink-changer-data ${historyFlag ? 'focus' : ''}`}>
                                            History
                                        </div>
                                    </label>
                                    <label
                                        onClick={() => {
                                            setNutritionalValues(true)
                                            setDescriptionFlag(false)
                                            setHistoryFlag(false)
                                        }}
                                        className="ms-3">
                                        <div className={`drink-changer-data ${nutritionalValues ? 'focus' : ''}`}>
                                            Nutritional values
                                        </div>
                                    </label>

                                </div>
                                <div className="col-12 d-flex justify-content-center justify-content-xxl-start">

                                    {descriptionFlag &&
                                        <textarea
                                            className="description-holder col-9 text-break fs-5"
                                            value={drinkDescriptionInput}
                                            onChange={(e) => setDrinkDescriptionInput(e.target.value)}
                                        />
                                    }
                                    {historyFlag &&
                                        <textarea
                                            className="description-holder col-9 text-break fs-5"
                                            value={drinkHistoryInput}
                                            onChange={(e) => setDrinkHistoryInput(e.target.value)}
                                        />
                                    }
                                    {nutritionalValues &&
                                        <textarea
                                            className="description-holder col-9 text-break fs-5"
                                            value={drinkNutritionalValues}
                                            onChange={(e) => drinkNutritionalValues(e.target.value)}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="d-flex t-5 ingredients-and-preparation-holder col-12 mb-5 mt-5">
                                <div className="col-12 ms-3">
                                    <div className="d-flex justify-content-center col-7 mb-3">
                                        <label className="fw-bolder fs-4 d-flex justify-content-center mb-2">
                                            <div
                                                onClick={() => setIngredientFlag(true)}
                                                className={`ing-prep-button ${ingredientFlag ? 'focus' : ''}`}>
                                                Ingredients
                                            </div>

                                        </label>
                                        <label className="fw-bolder fs-4 d-flex justify-content-center mb-2 ms-3">
                                            <div
                                                onClick={() => setIngredientFlag(false)}
                                                className={`ing-prep-button ${ingredientFlag ? '' : 'focus'}`}>
                                                Preparation
                                            </div>
                                        </label>
                                    </div>
                                    <div className="d-flex flex-column col-8  ing-prep-holder">
                                        <ul className="mt-2 fs-5 ps-2 ">
                                            {ingredientFlag ? (
                                                <ul >
                                                    {ingredient.map((ingredient, index) => (
                                                        <li key={index}>
                                                            <input
                                                                className="drink-ingredient-input col-11"
                                                                value={ingredient}
                                                                onChange={(event) => handleIngredientsInputChange(event, index)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <ul>
                                                    {preparation.map((preparation, index) => (
                                                        <li key={index}>
                                                            <input
                                                                className="drink-ingredient-input col-11"
                                                                value={preparation}
                                                                onChange={(event) => handleInputChange(event, index)}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center col-12">
                                <div className="me-2">
                                    <label className=" p-1 ps-2 pe-2 fw-bolder drink-creator me-2 fs-5">{Drink.Creator}</label>
                                </div>
                                <div className="me-3 pe-0 fs-5" >
                                    <label className={drinkLevelInput === 'Easy' ? 'easyLevelClass me-2' : drinkLevelInput === 'Medium' ? 'mediumLevelClass me-2' : drinkLevelInput === 'Hard' ? 'hardLevelClass me-2' : ''}>{drinkLevelInput}</label>
                                    <select
                                        onChange={(e) => setDrinkLevelInput(e.target.value)}
                                        className="Multi-options-holder"
                                    >
                                        <option value={drinkLevelInput}></option>
                                        <option value='Easy'>Easy</option>
                                        <option value='Medium'>Medium</option>
                                        <option value='Hard'>Hard</option>
                                    </select>
                                </div>

                                <div className="me-3 fs-5">
                                    <label className={drinkTasteInput === 'Sour' ? 'sourClass me-2' : drinkTasteInput === 'Sweet' ? 'sweetClass me-2' : drinkTasteInput === 'Bitter' ? 'bitterClass me-2' : ''}>{drinkTasteInput}</label>
                                    <select
                                        onChange={(e) => setDrinkTasteInput(e.target.value)}
                                        className="Multi-options-holder  "
                                    >
                                        <option value={drinkTasteInput}></option>
                                        <option value='Sour'>Sour</option>
                                        <option value='Sweet'>Sweet</option>
                                        <option value='Bitter'>Bitter</option>
                                    </select>
                                </div>
                                <div className="fs-5">
                                    <label className={drinkTypeInput === 'Soft' ? 'softClass me-2' : 'alkoClass me-2'}>{drinkTypeInput}</label>
                                    <select
                                        onChange={(e) => setDrinkTypeInput(e.target.value)}
                                        className="Multi-options-holder"
                                    >
                                        <option value={drinkTypeInput}></option>
                                        <option value='Soft'>Soft</option>
                                        <option value='Alcoholic'>Alcoholic</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="polowa2 col-3 align-items-center pe-3">
                            <div className="">
                                <div className="photo-holder ">
                                    <LazyLoadImage
                                        src={convertetIMG}
                                        className="drink-img-prev "
                                        effect="blur"
                                        alt="loaging error"
                                    />
                                    <div class="overlay-user-img fw-bolder d-flex align-items-center justify-content-center fw-bolder col-12">
                                        Click to change your img
                                        <input
                                            className=""
                                            onChange={(e) => {
                                                setDrinkImg(e.target.files[0])
                                                ownDrinkImgPrev(e)
                                            }}
                                            type="file" name="file-upload" id="file-upload"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center justify-content-xxl-end col-12 mt-5">
                        <button className="mb-4 me-4 change-drink-admin-button col-6 col-xxl-1" type="submit">Change Data</button>
                    </div>
                </form >
            </div >
        </div >
    )

}

export default DrinkDetailAdminPreview