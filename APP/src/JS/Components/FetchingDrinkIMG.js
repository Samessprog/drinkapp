import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Ring } from '@uiball/loaders'
import { Buffer } from 'buffer';

function FetchingDrinkIMG({ elm, classNameHolder, classNameIMG }) {

    const [drinkIMGs, setDrinkIMG] = useState(null);
    const [convertetIMG, setConvertedIMG] = useState('')
    const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)

    useEffect(() => {
        const fetchUserFavouriteDrinkImage = async () => {
            try {
                let ID_Drink = elm.ID_DRINK;
                const response = await fetch(`http://localhost:3000/api/fetchDrinkIMG/${ID_Drink}`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user favorite drink image.');
                }
                // Parsuj odpowiedź jako JSON
                const data = await response.json();
                setDrinkIMG(data.image);

            } catch (error) {
                console.error(error);
            }
        };
        fetchUserFavouriteDrinkImage();
    }, [elm.ID_DRINK]);

    useEffect(() => {
        if (drinkIMGs && drinkIMGs.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(drinkIMGs.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setConvertedIMG(imageURL);
            setFetchIMGCompleted(true)
        } else {
            setConvertedIMG('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg');
        }

    }, [drinkIMGs]);

    return (
        <div className={classNameHolder} >
            {fetchIMGCompleted ? (
                <LazyLoadImage
                    src={convertetIMG}
                    effect="blur"
                    className={classNameIMG}
                    alt="Loading error"
                />
            ) : (
                <div className={`d-flex justify-content-center align-items-center ${classNameIMG}`}>
                    <Ring
                        size={90}
                        lineWeight={5}
                        speed={2}
                        color="black"
                    />
                </div>
            )}
        </div>
    )
}
export default FetchingDrinkIMG;
