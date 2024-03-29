//Imports
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { Ring } from '@uiball/loaders'
import { API_URL } from '../../Components/Constants'

function UserDetails({ userSesion, userIMG, fetchIMGCompleted, freindsProfile }) {

    const dispatch = useDispatch()

    const [Nick, setUserNick] = useState(userSesion.nick)
    const [email, setUserMain] = useState(userSesion.email)
    const [phone, setUserPhone] = useState(userSesion.phone)

    const userID = userSesion.userID

    const [userChangesErrors, setUserChangesErrors] = useState('')

    const [isSuccesChnage, setIsSuccesChnage] = useState(false)

    const setContentTypeHeader = () => {
        return {
            'Content-Type': 'application/json'
        }
    }
    //Function to change User Data
    const UserDataChange = async (event) => {
        event.preventDefault()

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const phoneRegex = /^\d{9}$/
        const nickRegex = /^[a-zA-Z0-9_-]+$/

        if (!emailRegex.test(email)) {
            setUserChangesErrors(['Email is valid'])
            return
        } else if (!phoneRegex.test(phone)) {
            setUserChangesErrors(['Phone is valid'])
            return
        } else if (!nickRegex.test(Nick)) {
            setUserChangesErrors(['Nick is valid'])
            return
        }

        try {
            const response = await fetch(`${API_URL}userDataChange`, {
                method: 'POST',
                headers: setContentTypeHeader(),
                body: JSON.stringify({ email, phone, Nick, userID })
            })
            const data = await response.json()
            if (data.success) {
                setIsSuccesChnage(true)
                setUserChangesErrors('')
            } else {
                setIsSuccesChnage(false)
                setUserChangesErrors([data.message])
            }
        } catch (error) {
            setUserChangesErrors([error.message])
        }
    }
    //Changer user img
    const handleImgChange = async (event) => {

        const file = event.target.files[0]
        const fileSizeInMB = file.size / (1024 * 1024)

        if (fileSizeInMB > 5) {
            setUserChangesErrors('File size exceeds the limit of 5 MB!')
            return
        }

        const formData = new FormData()
        formData.append('imageData', file)
        formData.append('userID', userID)

        try {
            const response = await fetch(`${API_URL}uploadImage`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            alert('your photo has been changed, please log out to view it')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="col-12 mt-3 ">
            <div class="d-flex justify-content-between p-5 flex-column flex-xxl-row align-items-center col-12 mt-4">
                <div className=" d-flex align-items-center flex-column flex-xl-row justify-content-center col-12 col-xxl-5">
                    <div class="d-flex col-xxl-8  ms-5" >
                        <div className="user-img-holder d-flex ">
                            {fetchIMGCompleted ? (
                                <img src={userIMG} alt="Img error" class="img-fluid user-img "></img>
                            ) : (
                                <Ring
                                    size={150}
                                    lineWeight={5}
                                    speed={2}
                                    color="black"
                                />
                            )}
                            {freindsProfile.friendID === null &&
                                < div class="overlay-user-img d-flex align-items-center justify-content-center fw-bolder">
                                    Click to change your img
                                    <input
                                        onChange={handleImgChange}
                                        type="file"
                                        name="file-upload"
                                        id="file-upload"
                                    >
                                    </input>
                                </div>
                            }

                        </div>
                    </div>

                    {freindsProfile.friendID === null &&
                        <div className="d-flex flex-column align-items-center col-12 col-xxl-5 ms-4 mt-5 col-md-5 col-xl-3 col-sm-7">
                            <label className="fs-4 mb-4"> User Personal Data</label>
                            <form
                                onSubmit={UserDataChange}
                                className="col-12"
                            >
                                <div className="user-data-box d-flex justify-content-between align-items-center ">
                                    <input
                                        type="email"
                                        onChange={(event) => dispatch(setUserMain(event.target.value))}
                                        className="user-data-box-input ps-2 col-11"
                                        value={email}
                                    />
                                    <svg
                                        style={{ fill: "white", marginRight: "5px" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20" viewBox="0 96 960 960" width="20"
                                    >
                                        <path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" />
                                    </svg>
                                </div>
                                <div className="user-data-box d-flex justify-content-between align-items-center mt-3">
                                    <input
                                        type="tel"
                                        onChange={(event) => dispatch(setUserPhone(event.target.value))}
                                        className="user-data-box-input ps-2 col-11"
                                        value={phone}
                                    />
                                    <svg
                                        style={{ fill: "white", marginRight: "5px" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20" viewBox="0 96 960 960" width="20">
                                        <path d="M264 1008q-29.7 0-50.85-21.15Q192 965.7 192 936V216q0-29.7 21.15-50.85Q234.3 144 264 144h432q29.7 0 50.85 21.15Q768 186.3 768 216v720q0 29.7-21.15 50.85Q725.7 1008 696 1008H264Zm0-216v144h432V792H264Zm215.789 108Q495 900 505.5 889.711q10.5-10.29 10.5-25.5Q516 849 505.711 838.5q-10.29-10.5-25.5-10.5Q465 828 454.5 838.289q-10.5 10.29-10.5 25.5Q444 879 454.289 889.5q10.29 10.5 25.5 10.5ZM264 720h432V336H264v384Zm0-456h432v-48H264v48Zm0 528v144-144Zm0-528v-48 48Z" />
                                    </svg>
                                </div>
                                <div className="user-data-box  d-flex justify-content-between align-items-center mt-3">
                                    <input
                                        type="text"
                                        className=" user-data-box-input ps-2 col-11"
                                        value={Nick}
                                        onChange={(event) => dispatch(setUserNick(event.target.value))}
                                    />
                                    <svg
                                        style={{ fill: "white", marginRight: "5px" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="20" viewBox="0 96 960 960" width="20"
                                    >
                                        <path d="M360.113 648Q340 648 326 634.113q-14-13.888-14-34Q312 580 325.887 566q13.888-14 34-14Q380 552 394 565.887q14 13.888 14 34Q408 620 394.113 634q-13.888 14-34 14Zm240 0Q580 648 566 634.113q-14-13.888-14-34Q552 580 565.887 566q13.888-14 34-14Q620 552 634 565.887q14 13.888 14 34Q648 620 634.113 634q-13.888 14-34 14ZM480.458 888q130.458 0 221-91T792 576.24q0-23.24-5-52.74-5-29.5-13-51.5-21 5-38 6.5t-40 1.5q-85.964 0-162.482-33.5T397 350q-37 78-93.5 129T170 556q-1 4-1.5 10t-.5 10q0 130 91 221t221.458 91ZM480 960q-79.376 0-149.188-30Q261 900 208.5 847.5T126 725.042q-30-69.959-30-149.5Q96 496 126 426t82.5-122q52.5-52 122.458-82 69.959-30 149.5-30 79.542 0 149.548 30.24 70.007 30.24 121.792 82.08 51.786 51.84 81.994 121.92T864 576q0 79.376-30 149.188Q804 795 752 847.5T629.869 930Q559.738 960 480 960Zm-55-691q46 63 117 101t154 38q12 0 21-.5t23-2.472Q691 336 625 300t-144.51-36q-12.49 0-26.465 1.5T425 269ZM187 471q57-29 95-71.5T342 298q-63 37-100 78t-55 95Zm238-202Zm-83 29Z" />
                                    </svg>
                                </div>
                                <div className="d-flex justify-content-center mt-4 align-items-center ">
                                    <button className="mb-md-2 ms-1 rounded-pill btn btn-secondary border rounded d-flex p-2 change-data-input-user">
                                        <svg
                                            className="me-1  ms-2 me-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24" width="24"
                                            style={{ fill: "white" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24" viewBox="0 -960 960 960" width="24">
                                                <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" />
                                            </svg>
                                        </svg>
                                        <div className="pe-2">change data</div>
                                    </button>
                                </div>
                            </form>
                            <div className="d-flex align-items-center justify-content-center mt-2">  {isSuccesChnage === true ? 'your details have been changed' : userChangesErrors} </div>
                        </div>
                    }
                </div>
                <div className="badges-holder col-12 col-xxl-5 p-3 col-5 rounded">
                    <label className="badges-start">Your badges:</label>
                    <div className="d-flex justify-content-center ">
                        No badges :c
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UserDetails







