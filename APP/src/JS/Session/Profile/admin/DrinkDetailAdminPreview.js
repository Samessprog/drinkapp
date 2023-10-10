//Imports
import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DrinkDetailAdminPreview({ DrinkPreview, setDrinkPreview }) {

    const [detailDrinkIMG, setDetalDrinkIMG] = useState(null);
    const [convertetIMG, setConvertedIMG] = useState('')
    const API_URL = 'http://localhost:3000/api/';

    useEffect(() => {
        if (DrinkPreview.Drink.ID_DRINK !== undefined && DrinkPreview?.Drink?.ID_DRINK !== undefined) {
            const fetchUserFavouriteDrinkImage = async () => {
                try {
                    let ID_Drink = DrinkPreview.Drink.ID_DRINK;
                    const response = await fetch(`http://localhost:3000/api/fetchDrinkIMG/${ID_Drink}`, {
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
    }, [DrinkPreview]);


    useEffect(() => {
        if (detailDrinkIMG && detailDrinkIMG.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(detailDrinkIMG.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setConvertedIMG(imageURL);
        } else {
            setConvertedIMG('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg');
        }

    }, [detailDrinkIMG]);


    const [ing, setIng] = useState([])
    //Drink Preparation
    const [prep, setPrep] = useState([])

    useEffect(() => {
        const result = DrinkPreview.Drink
        setIng(result?.Ingredients.split('.'));
        setPrep(result?.Preparation.split('.'));
    }, [DrinkPreview]);

    const [drinkNameInput, setDrinknameInput] = useState(DrinkPreview.Drink.DrinkName)
    const [drinkDescriptionInput, setDrinkDescriptionInput] = useState(DrinkPreview.Drink.Description)
    const [drinkHistoryInput, setDrinkHistoryInput] = useState(DrinkPreview.Drink.drinkHistory)
    const [drinkLevelInput, setDrinkLevelInput] = useState(DrinkPreview.Drink.DifficultyLevel)
    const [drinkTasteInput, setDrinkTasteInput] = useState(DrinkPreview.Drink.Taste)
    const [drinkTypeInput, setDrinkTypeInput] = useState(DrinkPreview.Drink.DrinkType)
    const [drinkImg, setDrinkImg] = useState(convertetIMG)


    const DrinkDateUpdate = async (event) => {
        event.preventDefault();

        const drink_ID = DrinkPreview.Drink.ID_DRINK;
        const formData = new FormData();

        const fileSizeInMB = drinkImg.size / (1024 * 1024);

        if (fileSizeInMB > 5) {
            alert('File size exceeds the limit of 5 MB!');
            return;
        }

        formData.append('drinkImg', drinkImg);
        formData.append('drinkID', drink_ID);
        formData.append('drinkNameInput', drinkNameInput);
        formData.append('drinkDescriptionInput', drinkDescriptionInput);
        formData.append('drinkHistoryInput', drinkHistoryInput);
        formData.append('drinkLevelInput', drinkLevelInput);
        formData.append('drinkTasteInput', drinkTasteInput);
        formData.append('drinkTypeInput', drinkTypeInput);
        formData.append('ing', ing);
        formData.append('prep', prep);

        // const formData = new FormData();

        // const fields = {
        //     drinkImg,
        //     drink_ID,
        //     drinkNameInput,
        //     drinkDescriptionInput,
        //     drinkHistoryInput,
        //     drinkLevelInput,
        //     drinkTasteInput,
        //     drinkTypeInput,
        //     ing,
        //     prep,
        // };

        // for (const [key, value] of Object.entries(fields)) {
        //     formData.append(key, value);
        // }

        try {
            const response = await fetch(`${API_URL}drinksDataUpdate`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                // Obsługa sukcesu
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleInputChange = (event, index) => {
        const newPrep = [...prep];
        newPrep[index] = event.target.value;
        setPrep(newPrep);
    };


    const handleIngredientsInputChange = (event, index) => {
        const newIng = [...ing];
        newIng[index] = event.target.value;
        setIng(newIng);
    };


    return (
        <div className="drink_preview_container fullscreen ">
            <div>
                <div className="close-preview-icon-holder d-flex flex-row-reverse me-4 mt-3" >
                    <svg onClick={() => setDrinkPreview(false)} className="close-preview-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></svg>
                </div>
                <form onSubmit={DrinkDateUpdate}>
                    <div className="data-drink-holder d-flex justify-content-evenly ">
                        <div className="polowa1 col-6">
                            <div className="d-flex fs-3 fw-bolder">
                                <div>
                                    <input
                                        className="drink-name-input"
                                        value={drinkNameInput}
                                        onChange={(e) => setDrinknameInput(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div className="mt-5 fs-4 fw-bolder">
                                    <label >
                                        {drinkNameInput}
                                    </label>
                                </div>
                                <div className="">

                                    <textarea
                                        className="description-holder mt-2 col-10 text-break"
                                        value={drinkDescriptionInput}
                                        onChange={(e) => setDrinkDescriptionInput(e.target.value)}
                                    />

                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="fs-3 fw-bolder">History</label>
                                <div className="">
                                    <textarea
                                        className="description-holder mt-2 col-10 text-break"
                                        value={drinkHistoryInput}
                                        onChange={(e) => setDrinkHistoryInput(e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="polowa2 col-6 align-items-center">
                            <div className="col-8">
                                <div className="photo-holder ">
                                    <LazyLoadImage
                                        src={convertetIMG}
                                        className="img-fluid"
                                        effect="blur"
                                        alt="loaging error"
                                    />

                                    <div class="overlay-user-img fw-bolder d-flex align-items-center justify-content-center fw-bolder">
                                        Click to change your img
                                        <input onChange={(e) => setDrinkImg(e.target.files[0])} type="file" name="file-upload" id="file-upload"></input>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-4 d-flex flex-column align-items-center">
                                <label className="fs-4 mb-3 fw-bolder">Specifications</label>
                                <div className="d-flex col-12">
                                    <div className="me-2">
                                        <label className="bg-light rounded-pill p-1 ps-2 pe-2 fw-bolder drink-creator me-2">{DrinkPreview.Drink.Creator}</label>
                                    </div>
                                    <div className="me-3 pe-0" >

                                        <label className={drinkLevelInput === 'Easy' ? 'easyLevelClass me-2' : drinkLevelInput === 'Medium' ? 'mediumLevelClass me-2' : drinkLevelInput === 'Hard' ? 'hardLevelClass me-2' : ''}>{drinkLevelInput}</label>
                                        <select
                                            onChange={(e) => setDrinkLevelInput(e.target.value)}
                                            className="Multi-options-holder  "
                                        >
                                            <option value={drinkLevelInput}></option>
                                            <option value='Easy'>Easy</option>
                                            <option value='Medium'>Medium</option>
                                            <option value='Hard'>Hard</option>
                                        </select>
                                    </div>

                                    <div className="me-3">
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
                                    <div >
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
                            <div className="d-flex justify-content-around mt-5 ingredients-and-preparation-holder col-12 mb-5">
                                <div className=" ">
                                    <label className="fw-bolder fs-4">Ingredients</label>
                                    <div className="d-flex flex-column ">
                                        <ul className="mt-2 fs-5 ps-2">
                                            {ing.map((elm, index) => (
                                                <li key={index}>
                                                    <input
                                                        className="drink-name-input"
                                                        value={elm}
                                                        onChange={(event) => handleIngredientsInputChange(event, index)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="">
                                    <label className="fw-bolder fs-4">Preparation</label>
                                    <div className="d-flex flex-column">
                                        <ul className="mt-2 fs-5 ps-2">
                                            {prep.map((elm, index) => (
                                                <li key={index}>
                                                    <input
                                                        className="drink-name-input"
                                                        value={elm}
                                                        onChange={(event) => handleInputChange(event, index)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <button type="submit">Change Data</button>
                    </div>
                </form>
            </div>
        </div >
    )

}

export default DrinkDetailAdminPreview;