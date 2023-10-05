import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DrinkDetailAdminPreview({ DrinkPreview, setDrinkPreview }) {

    const [detailDrinkIMG, setDetalDrinkIMG] = useState(null);
    const [convertetIMG, setConvertedIMG] = useState('')


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


    return (
        <div className="drink_preview_container fullscreen ">
            <div>
                <div className="close-preview-icon-holder d-flex flex-row-reverse me-4 mt-3" >
                    <svg onClick={() => setDrinkPreview(false)} className="close-preview-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></svg>
                </div>
                <div className="data-drink-holder d-flex justify-content-evenly ">
                    <div className="polowa1 col-6">
                        <div className="d-flex fs-3 fw-bolder">
                            <div>
                                {DrinkPreview.Drink.DrinkName}
                            </div>
                            <div className="d-flex ms-3 align-items-center ">
                                2  <label>{DrinkPreview.Drink.Rate}</label>
                                <svg className="star ms-1 mb-1" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                            </div>
                        </div>
                        <div>
                            <div className="mt-5 fs-4 fw-bolder">
                                {DrinkPreview.Drink.DrinkName}
                            </div>
                            <div className="description-holder mt-2 col-10 text-break pe-3">
                                {DrinkPreview.Drink.Description} dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd   dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  asdas dasdas dasd asd asd as dasd as dadasd v  dadasd asdasdas asd asasdas asd asdasdasd asdasdasdasd asdasdas das asdasd asdasddabkhbasdfjkhsbdajfkshdbfkjhasbdfsdhajfbsdafhjdsabfdsjhkfsabfajdshdbasfkdjashf bdaskfjhdasbfayhje rfbsadhjfbdsakfjyrebfkaEJHFO BASWUYIFBNeluaifbheqwrioyfgbvsdhfijbdsafjhokdsbf
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bolder">History</label>
                            <div className="description-holder mt-2 col-10 text-break pe-3">
                                {DrinkPreview.Drink.drinkHistory}
                                dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd   dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd dasdsadsa asdasdas asdas dasdas dasd asd asd as dasd as dadasd  asdas dasdas dasd asd asd as dasd as dadasd v  dadasd asdasdas asd asasdas asd asdasdasd asdasdasdasd asdasdas das asdasd asdasddabkhbasdfjkhsbdajfkshdbfkjhasbdfsdhajfbsdafhjdsabfdsjhkfsabfajdshdbasfkdjashf bdaskfjhdasbfayhje rfbsadhjfbdsakfjyrebfkaEJHFO BASWUYIFBNeluaifbheqwrioyfgbvsdhfijbdsafjhokdsbf
                            </div>
                        </div>
                    </div>

                    <div className="polowa2 col-6 align-items-center">
                        <div className="photo-holder col-8">
                            <div>
                                <LazyLoadImage
                                    src={convertetIMG}
                                    className="img-fluid"
                                    effect="blur"
                                    alt="loaging error"
                                />
                            </div>
                        </div>
                        <div className="mt-4 d-flex flex-column align-items-center">
                            <label className="fs-4 mb-3 fw-bolder">Specifications</label>
                            <div className="d-flex">
                                <div >
                                    <label className="bg-light rounded-pill p-1 ps-2 pe-2 fw-bolder drink-creator me-2">{DrinkPreview.Drink.Creator}</label>
                                </div>
                                <div >
                                    <label className={DrinkPreview.Drink.DifficultyLevel === 'Easy' ? 'easyLevelClass me-2' : DrinkPreview.Drink.DifficultyLevel === 'Medium' ? 'mediumLevelClass me-2' : DrinkPreview.Drink.DifficultyLeve === 'Hard' ? 'hardLevelClass me-2' : ''}>{DrinkPreview.Drink.DifficultyLevel}</label>
                                </div>
                                <div >
                                    <label className={DrinkPreview.Drink.Taste === 'Sour' ? 'sourClass me-2' : DrinkPreview.Drink.Taste === 'Sweet' ? 'sweetClass me-2' : DrinkPreview.Drink.Taste === 'Bitter' ? 'bitterClass me-2' : ''}>{DrinkPreview.Drink.Taste}</label>
                                </div>
                                <div >
                                    <label className={DrinkPreview.Drink.DrinkType === 'Soft' ? 'softClass me-2' : 'alkoClass me-2'}>{DrinkPreview.Drink.DrinkType}</label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around mt-5 ingredients-and-preparation-holder col-12 mb-5">
                            <div className=" ">
                                <label className="fw-bolder fs-4">Ingredients</label>
                                <div className="d-flex flex-column ">
                                    <ul className="mt-2 fs-5 ps-2">
                                        {ing.map((elm) => (
                                            <li>{elm}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="">
                                <label className="fw-bolder fs-4">Preparation</label>
                                <div className="d-flex flex-column">
                                    <ul className="mt-2 fs-5 ps-2">
                                        {prep.map((elm) => (
                                            <li>{elm}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )

}

export default DrinkDetailAdminPreview;