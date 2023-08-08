import React, { useEffect } from "react";
import { Buffer } from 'buffer';


function UsersAdminControlerProfile({ elm }) {
    const API_URL = 'http://localhost:3000/api/';

    //User Data changer error
    const [changingUserDataError, setChangingUserDataError] = React.useState(null)
    //Take user UMG
    const [userIMGProfileAdmin, setUserIMGProfileAdmin] = React.useState('')
    const [userDataChanger, setUserDataChanger] = React.useState(false)
    const [newUserEmail, setNewUserEmail] = React.useState('')
    const [newUserPass, setNewUserPass] = React.useState('')


    useEffect(() => {
        if (elm.userIMG) {
            // Convert the image data to base64
            const base64Image = Buffer.from(elm.userIMG.data).toString('base64');
            // Create the image URL using the base64 data
            const imageURL = `data:image/jpeg;base64,${base64Image}`;
            setUserIMGProfileAdmin(imageURL);
        }

    }, []);

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
        <div className="mb-3 ms-3 d-flex  align-items-center drinks-profile-holder  me-3  justify-content-between ">
            <div className="d-flex  align-items-center">
                <div className="ms-3 me-4 fs-4">
                    {elm.ID_User}.
                </div>
                <div className="justify-content-between d-flex align-items-center position-relative">
                    <div className="d-flex align-items-center ">
                        <div className="d-flex align-items-center data-holder">
                            <div className=" mt-1 mb-1 drink-profile-holder-IMG">
                                <img className=" drink-profile-img img-fluid " src={userIMGProfileAdmin} alt="loadingErr"></img>
                            </div>
                            <div className="ms-4 d-flex align-items-center">
                                <label className="fs-5">Nick:</label>
                                <div className="drink-name-profile ms-2">{elm.Nick}</div>
                            </div>

                            <div className="ms-4 fs-5">
                                user Email:
                                <label className="drink-name-profile ms-2">{elm.email}</label>
                            </div>
                            <div className="ms-4 fs-5">
                                User phone
                                <label className="drink-name-profile ms-2">{elm.phone}</label>
                            </div>
                        </div>
                        <div className="details-button-holder ">
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
                        </div>
                    </div>
                </div>

            </div>

            <div className="d-flex delete-profile me-4">
                <div className="block-icon-profile me-3">
                    <svg lassName="block-icon-profile" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142.375 0 241.188-98.812Q820-337.625 820-480q0-60.662-21-116.831Q778-653 740-699L261-220q45 39 101.493 59.5Q418.987-140 480-140ZM221-261l478-478q-46-39-102.169-60T480-820q-142.375 0-241.188 98.812Q140-622.375 140-480q0 61.013 22 117.507Q184-306 221-261Z" /></svg>
                </div>
                <div className="delete-profile-icon">
                    <svg lassName="delete-profile-icon " xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
                </div>
            </div>

        </div >
    )

}

export default UsersAdminControlerProfile;