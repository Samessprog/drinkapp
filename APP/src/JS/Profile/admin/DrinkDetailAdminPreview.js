import React from "react";


function DrinkDetailAdminPreview({ DrinkPreview, setDrinkPreview }) {


    console.log(DrinkPreview.Drink.DrinkName)

    return (
        <div className="drink_preview_container fullscreen">
            <div>
                <div className="close-preview-icon-holder d-flex flex-row-reverse me-4 mt-4" >
                    <svg onClick={() => setDrinkPreview(false)} className="close-preview-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></svg>
                </div>
                <div>
                    <div>
                        <div>
                            <div>
                                {DrinkPreview.Drink.DrinkName}
                            </div>
                            <div>
                                {DrinkPreview.Drink.Rate}
                            </div>
                        </div>
                        <div>
                            <div>
                                {DrinkPreview.Drink.DrinkName}
                            </div>
                            <div>
                                {DrinkPreview.Drink.Description}
                            </div>
                        </div>
                        <div>
                            {DrinkPreview.Drink.drinkHistory}
                        </div>
                        <div>
                            Spec
                            <div>
                                SPECYFIKACJE TUTAJ
                            </div>
                        </div>
                        <div>
                            INGREDIENTS
                        </div>
                        <div>
                            PREP
                        </div>
                    </div>
                    <div>
                        ZDJECIE

                    </div>

                </div>


            </div>
        </div>
    )

}

export default DrinkDetailAdminPreview;