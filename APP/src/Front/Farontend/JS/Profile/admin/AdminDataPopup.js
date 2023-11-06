import React, { useState } from "react";

function AdminDataPopup({ setChangeUserDataPopup, changeUserDataPopup }) {

    const { ID_User, Nick, Password, email, phone } = changeUserDataPopup?.userData;

    console.log(ID_User)

    const API_URL = 'http://localhost:3000/api/';
    //User Data changer error
    const [changingUserDataError, setChangingUserDataError] = useState(null)
    const [newUserEmail, setNewUserEmail] = useState(email)
    const [newUserPass, setNewUserPass] = useState(Password)
    const [newUserNick, setNewUserNick] = useState(Nick)
    const [newUserPhone, setNewUserPhone] = useState(phone)
    const [userRole, setUserRole] = useState('')

    //Function to Change User Data
    const UserDataChange = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}userDataChangerADMIN`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newUserEmail, newUserPass, ID_User, newUserNick, newUserPhone, userRole })
            });
            const data = await response.json();
            if (data.success) {
                setChangingUserDataError(null)
                alert('User Data changes have been made')

            } else {
                setChangingUserDataError(data.message)
            }
        } catch (error) {
        }
    };

    return (
        <div className="userDataChangeHolder col-12 col-md-10 col-lg-9 col-xl-6 col-xxl-4">
            <form onSubmit={UserDataChange}>
                <div className="d-flex flex-row-reverse me-3 mt-2 mb-3" onClick={() => setChangeUserDataPopup(false)}>
                    <svg
                        className="close-icon"
                        xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                </div>
                <div className="col-12 d-flex align-items-center flex-column mb-5">
                    <div className="fs-5">User {ID_User}  ID data Changer</div>
                    <div className="col-9 d-flex mt-4 justify-content-center">
                        <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                            <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" /></svg>
                        </div>
                        <input onChange={(e) => setNewUserEmail(e.target.value)} className="col-8 ps-2  login-register-input-data" type="Email" value={newUserEmail} placeholder="Email"></input>
                    </div>
                    <div className="col-9 d-flex mt-4 justify-content-center">
                        <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                            <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M264 1008q-29.7 0-50.85-21.15Q192 965.7 192 936V216q0-29.7 21.15-50.85Q234.3 144 264 144h432q29.7 0 50.85 21.15Q768 186.3 768 216v720q0 29.7-21.15 50.85Q725.7 1008 696 1008H264Zm0-216v144h432V792H264Zm215.789 108Q495 900 505.5 889.711q10.5-10.29 10.5-25.5Q516 849 505.711 838.5q-10.29-10.5-25.5-10.5Q465 828 454.5 838.289q-10.5 10.29-10.5 25.5Q444 879 454.289 889.5q10.29 10.5 25.5 10.5ZM264 720h432V336H264v384Zm0-456h432v-48H264v48Zm0 528v144-144Zm0-528v-48 48Z" /></svg>
                        </div>
                        <input onChange={(e) => setNewUserPhone(e.target.value)} className="col-8 ps-2  login-register-input-data" type="Phone" placeholder="user phone" value={newUserPhone}></input>
                    </div>
                    <div className="col-9 d-flex mt-4 justify-content-center">
                        <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                            <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M360.113 648Q340 648 326 634.113q-14-13.888-14-34Q312 580 325.887 566q13.888-14 34-14Q380 552 394 565.887q14 13.888 14 34Q408 620 394.113 634q-13.888 14-34 14Zm240 0Q580 648 566 634.113q-14-13.888-14-34Q552 580 565.887 566q13.888-14 34-14Q620 552 634 565.887q14 13.888 14 34Q648 620 634.113 634q-13.888 14-34 14ZM480.458 888q130.458 0 221-91T792 576.24q0-23.24-5-52.74-5-29.5-13-51.5-21 5-38 6.5t-40 1.5q-85.964 0-162.482-33.5T397 350q-37 78-93.5 129T170 556q-1 4-1.5 10t-.5 10q0 130 91 221t221.458 91ZM480 960q-79.376 0-149.188-30Q261 900 208.5 847.5T126 725.042q-30-69.959-30-149.5Q96 496 126 426t82.5-122q52.5-52 122.458-82 69.959-30 149.5-30 79.542 0 149.548 30.24 70.007 30.24 121.792 82.08 51.786 51.84 81.994 121.92T864 576q0 79.376-30 149.188Q804 795 752 847.5T629.869 930Q559.738 960 480 960Zm-55-691q46 63 117 101t154 38q12 0 21-.5t23-2.472Q691 336 625 300t-144.51-36q-12.49 0-26.465 1.5T425 269ZM187 471q57-29 95-71.5T342 298q-63 37-100 78t-55 95Zm238-202Zm-83 29Z" /></svg>
                        </div>
                        <input onChange={(e) => setNewUserNick(e.target.value)} className="col-8 ps-2  login-register-input-data" type="text" placeholder="user nick" value={newUserNick}></input>
                    </div>
                    <div className="col-9 d-flex mt-4 justify-content-center">
                        <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                            <svg className="login-register-icon" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M263.717 960Q234 960 213 938.85T192 888V504q0-29.7 21.15-50.85Q234.3 432 264 432h24v-96q0-79.68 56.226-135.84t136-56.16Q560 144 616 200.16T672 336v96h24q29.7 0 50.85 21.15Q768 474.3 768 504v384q0 29.7-21.162 50.85Q725.676 960 695.96 960H263.717Zm.283-72h432V504H264v384Zm216.212-120Q510 768 531 746.788q21-21.213 21-51Q552 666 530.788 645q-21.213-21-51-21Q450 624 429 645.212q-21 21.213-21 51Q408 726 429.212 747q21.213 21 51 21ZM360 432h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Zm-96 456V504v384Z" /></svg>
                        </div>
                        <input onChange={(e) => setNewUserPass(e.target.value)} className="col-8 ps-2  login-register-input-data" type="password" placeholder="password" value={newUserPass}></input>
                    </div>
                    <div className="mt-3">
                        <select onChange={(e) => setUserRole(e.target.value)}>
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                        {changingUserDataError}
                    </div>
                </div>
                <div className="d-flex col-12 flex-row-reverse mb-3 pe-3 ">
                    <input className="user-submit-user-data" type="submit" value='Save'></input>
                </div>
            </form>
        </div>
    )
}

export default AdminDataPopup;