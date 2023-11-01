//Imports
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { Ring } from '@uiball/loaders'


function UsersAdminControlerProfile({ elm, windowAlert, setWindowAlert, setBlockedButton, hiddenElements, setChangeUserDataPopup }) {
    //My Api URL Local
    const API_URL = 'http://localhost:3000/api/';
    //User Data changer error
    const [changingUserDataError, setChangingUserDataError] = useState(null)
    //Take user UMG
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPass, setNewUserPass] = useState('')

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
        } else {
            setUserConvertedIMG('https://ponadwszystko.com/wp-content/uploads/2016/08/anonim.jpg');
        }
        setFetchIMGCompleted(true)
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
        <div className={`mb-4 ms-3 me-3 p-2 d-flex align-items-center drinks-profile-holder col-12 ${hiddenElements.includes(elm.ID_User) ? 'd-none' : ''}`}>
            <div className="d-flex align-items-center col-12">
                <div className="ms-3 me-4 fs-4 col-1">
                    {elm.ID_User}.
                </div>
                <div className="justify-content-between d-flex align-items-center position-relative col-11">
                    <div className="d-flex align-items-center flex-xxl-row flex-column col-11">
                        <div className="d-flex align-items-center data-holder col-10">
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
                            <div className="d-flex flex-column col-6 ms-5">
                                <div className="ms-4 d-flex  align-items-center ">
                                    <label className="fs-5">Nick:</label>
                                    <div className="drink-name-profile ms-xl-2">{elm.Nick}</div>
                                </div>
                                <div className="ms-4 fs-5 d-flex  align-items-center ">
                                    <label> Email:</label>
                                    <label className="drink-name-profile ms-xl-2">{elm.email}</label>
                                </div>
                                <div className="ms-4 fs-5 d-flex  align-items-center ">
                                    User phone
                                    <label className="drink-name-profile ms-xl-2">{elm.phone} 123123123123</label>
                                </div>
                            </div>
                        </div>
                        <div className="details-button-holder d-flex align-items-center ">
                            <div className=" me-3 d-flex justify-content-center align-items-center ms-5" onClick={() => setChangeUserDataPopup(true)}>
                                <button className="ms-1 rounded-pill btn btn-secondary border rounded d-flex p-2 change-data-input-user">
                                    <svg className="me-1  ms-2 me-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24" style={{ fill: "white" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" /></svg>                                    </svg>
                                    <div className="pe-2">Details</div>
                                </button>
                            </div>
                            <div className="d-flex ">
                                <div onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, ObjectID: elm }); setBlockedButton(true) }} className="block-icon-profile me-3">

                                    {elm.IsBlocked ? (
                                        <svg className='block-drink-icon-no-block' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M220-80q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634h70v-96q0-78.85 55.606-134.425Q401.212-920 480.106-920T614.5-864.425Q670-808.85 670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220Zm0-60h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350-634h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730v96ZM220-140v-434 434Z" /></svg>
                                        ) : (
                                        <svg className="block-drink-icon-block" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M220-634h390v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426-860 388-822.083 350-784.167 350-730h-60q0-79 55.606-134.5t134.5-55.5Q559-920 614.5-864.425T670-730v96h70q24.75 0 42.375 17.625T800-574v434q0 24.75-17.625 42.375T740-80H220q-24.75 0-42.375-17.625T160-140v-434q0-24.75 17.625-42.375T220-634Zm0 494h520v-434H220v434Zm260.168-140Q512-280 534.5-302.031T557-355q0-30-22.668-54.5t-54.5-24.5Q448-434 425.5-409.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM220-140v-434 434Z" /></svg>
                                    )}

                                </div>
                                <div onClick={() => { setWindowAlert({ isOpen: !windowAlert.isOpen, ObjectID: elm }); setBlockedButton(false) }}
                                    className="delete-profile-icon">
                                    <svg className="delete-profile-icon " xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" /></svg>
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