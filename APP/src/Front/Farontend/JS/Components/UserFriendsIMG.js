import React, { useState, useEffect } from "react"
import { Buffer } from "buffer"
import { Ring } from '@uiball/loaders'

function UserFriendsIMG({ elm }) {

    const [userIMGres, setUserIMGres] = useState('')
    const [loadingFlag, setLoadingFlag] = useState(false)

    useEffect(() => {
        if (elm) {
            const base64Image = Buffer.from(elm).toString('base64')
            const imageURL = `data:image/jpegbase64,${base64Image}`
            setUserIMGres(imageURL)
            setLoadingFlag(true)
        } else {
            setLoadingFlag(false)
            return 0
        }
    }, [elm])

    return (
        <>
            {!loadingFlag ? (
                <Ring />
            ) : (
                <img
                    src={userIMGres}
                    alt="img errr"
                    className="user-friend-img"
                />
            )
            }
        </>
    )
}

export default UserFriendsIMG