import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { Ring } from '@uiball/loaders'
import WindowAdminAlert from "../../Components/DeleteOrBlockAlert";


function UsersAdminControlerProfile({ elm, windowAlert, setWindowAlert, setBlockedButton }) {
    //My Api URL Local
    const API_URL = 'http://localhost:3000/api/';



    //User Data changer error
    const [changingUserDataError, setChangingUserDataError] = React.useState(null)
    //Take user UMG
    const [userDataChanger, setUserDataChanger] = React.useState(false)
    const [newUserEmail, setNewUserEmail] = React.useState('')
    const [newUserPass, setNewUserPass] = React.useState('')

    const [fetchIMGCompleted, setFetchIMGCompleted] = useState(false)
    const [userConvertedIMG, setUserConvertedIMG] = useState(null)
    const [userIMG, setUserIMG] = useState(null)

    useEffect(() => {
        const fetchUserFavouriteDrinkImage = async () => {

            try {
                let ID_User = elm.ID_User
                const response = await fetch(`http://localhost:3000/api/fetchUserIMG/${ID_User}`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user favorite drink image.');
                }

                // Parsuj odpowiedź jako JSON
                const data = await response.json();
                console.log(data)
                setUserIMG(data.image);

            } catch (error) {
                console.error(error);
            }
        };
        fetchUserFavouriteDrinkImage();
    }, [elm.user_ID]);


    useEffect(() => {
        if (userIMG && userIMG.data.length > 0) {
            // Convert the image data to base64
            const base64Image = Buffer.from(userIMG.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setUserConvertedIMG(imageURL);
            setFetchIMGCompleted(true)
        } else {
            setUserConvertedIMG('https://staticsmaker.iplsc.com/smaker_production_2021_11_24/d9d5fac2c9271afdbc7205b695742eca-lg.jpg');
        }

    }, [userIMG]);

    //Function to Change User Data
    const UserDataChange = async (event) => {
        const userID = elm.ID_User;
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}userDataChangerADMIN`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newUserEmail, newUserPass, userID })
            });
            const data = await response.json();
            if (data.success) {
                setChangingUserDataError(null)
                setNewUserEmail('')
                setNewUserPass('')
                alert('User Data changes have been made')

            } else {
                setChangingUserDataError(data.message)
            }
        } catch (error) {

        }
    };


    return (
        <div className="mb-3 ms-3 d-flex align-items-center drinks-profile-holder  me-3  justify-content-between ">
            <div className="d-flex align-items-center ">
                <div className="ms-3 me-4 fs-4">
                    {elm.ID_User}.
                </div>
                <div className="justify-content-between d-flex align-items-center position-relative ">
                    <div className="d-flex align-items-center flex-xxl-row flex-column ">
                        <div className="d-flex align-items-center data-holder ">
                            <div className=" mt-1 mb-1 drink-profile-holder-IMG margin-top-12 ">
                                {fetchIMGCompleted ? (
                                    <img className=" drink-profile-img img-fluid" src={userConvertedIMG} alt="loadingErr"></img>
                                ) : (
                                    <div>
                                        <Ring
                                            size={90}
                                            lineWeight={5}
                                            speed={2}
                                            color="black"

                                        />
                                    </div>
                                )}
                            </div>
                            <div className="ms-4 d-flex  align-items-center margin-top-12">
                                <label className="fs-5">Nick:</label>
                                <div className="drink-name-profile ms-xl-2">{elm.Nick}</div>
                            </div>

                            <div className="ms-4 fs-5 margin-top-12 ">
                                <label> Email:</label>
                                <label className="drink-name-profile ms-xl-2">{elm.email}</label>
                            </div>
                            <div className="ms-4 fs-5 margin-top-12">
                                User phone
                                <label className="drink-name-profile ms-xl-2">{elm.phone} 123123123123</label>
                            </div>
                        </div>
                        <div className="details-button-holder d-flex mt-xl-3 mb-xl-0 mb-3 flex-column flex-xl-row align-items-center ">
                            <button className="details-button" onClick={() => setUserDataChanger(!userDataChanger)}>
                                Change User Data
                            </button>

                            {userDataChanger &&
                                <form onSubmit={UserDataChange}>
                                    <div className="d-flex mt-3 align-items-center">
                                        <div>
                                            <input className="user-data-input" type="email" placeholder="Email" onChange={(event) => setNewUserEmail(event.target.value)}></input>
                                        </div>
                                        <div className="ms-3">
                                            <input className="user-data-input" type="password" placeholder="Password" onChange={(event) => setNewUserPass(event.target.value)}></input>
                                        </div>

                                        <button type="submit" onClick={UserDataChange} className="submit-button">
                                            <svg className="details-change-button" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M379.333-244 154-469.333 201.666-517l177.667 177.667 378.334-378.334L805.333-670l-426 426Z" /></svg>
                                        </button>

                                    </div>
                                    <label className="userDataChangerError">
                                        {changingUserDataError != null &&
                                            changingUserDataError
                                        }
                                    </label>
                                </form>
                            }
                            <div className="d-flex delete-profile">
                                <div onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, userID: elm }); setBlockedButton(true) }} className="block-icon-profile me-3">
                                    <svg lassName="block-icon-profile" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.375 0 241.188-98.812Q820-337.625 820-480q0-60.662-21-116.831Q778-653 740-699L261-220q45 39 101.493 59.5Q418.987-140 480-140ZM221-261l478-478q-46-39-102.169-60T480-820q-142.375 0-241.188 98.812Q140-622.375 140-480q0 61.013 22 117.507Q184-306 221-261Z" /></svg>
                                </div>

                                <div onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, userID: elm }); setBlockedButton(false) }}
                                    className="delete-profile-icon">
                                    <svg lassName="delete-profile-icon " xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )

}

export default UsersAdminControlerProfile;