import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Ring } from '@uiball/loaders'
import { Buffer } from 'buffer'
import { API_URL } from '../Components/Constants'

function FetchingDrinkIMG({ ID_DRINK, classNameHolder, classNameIMG }) {

    const [drinkIMGs, setDrinkIMG] = useState(null)
    const [convertedIMG, setConvertedIMG] = useState('')
    const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)

    useEffect(() => {
        const getDrinkIMG = async () => {
            try {
                const response = await fetch(`${API_URL}fetchDrinkIMG/${ID_DRINK}`, {
                    credentials: 'include',
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch user favorite drink image.')
                }
                const data = await response.json()
                setDrinkIMG(data.image)

            } catch (error) {
                console.error(error)
            }
        }
        getDrinkIMG()
    }, [ID_DRINK])

    useEffect(() => {
        if (drinkIMGs && drinkIMGs.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(drinkIMGs.data).toString('base64')
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`
            setConvertedIMG(imageURL)
            setFetchIMGCompleted(true)
        } else {
            setFetchIMGCompleted(false)
        }

    }, [drinkIMGs])

    return (
        <figure className={classNameHolder} >
            {fetchIMGCompleted ? (
                <LazyLoadImage
                    src={convertedIMG}
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
        </figure>
    )
}
export default FetchingDrinkIMG
