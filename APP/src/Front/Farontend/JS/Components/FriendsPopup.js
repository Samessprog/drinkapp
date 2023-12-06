import React, { useState, useEffect, useContext } from "react";
import { Buffer } from "buffer";

import UserFriendsIMG from "./UserFriendsIMG";
import { SessionContext } from '../Session/SessionContext'
import { API_URL } from "./Constants";

function FriendsPopup({ setFriendsModalFlag }) {

    const [nickName, setNickName] = useState('')
    const [userResults, setUsersResults] = useState(undefined)

    const searchUser = (e) => {
        if (e.key === 'Enter') {
            fetch(`${API_URL}searchUsers`, {
                method: 'POST',
                body: JSON.stringify({ nickName, }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === false) {
                        setUsersResults([])
                    } else {
                        setUsersResults(data.user)
                    }
                })
                .catch(error => console.error(error));
        }
    };

    const [userIMGres, setUserIMGres] = useState('')
    useEffect(() => {
        if (userResults) {
            if (userResults.userIMG) {
                const base64Image = Buffer.from(userResults.userIMG).toString('base64');
                // Create the image URL using the base64 data
                const imageURL = `data:image/jpeg;base64,${base64Image}`;
                setUserIMGres(imageURL);
            } else {

            }
        }
    }, [userResults]);

    const userSession = useContext(SessionContext).userSesion

    const addToFriend = () => {
        let friendID = userResults.ID_User
        let userID = userSession.userID

        fetch(`${API_URL}addFreind`, {
            method: 'POST',
            body: JSON.stringify({ friendID, userID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === false) {
                    setUsersResults([])
                } else {
                    setUsersResults(data.user)
                    setNickName('')
                }
            })
            .catch(error => console.error(error));
    }

    const [userFriendsFlag, setUserFriendsFlag] = useState(true)
    const [userWaitingFriendsFlag, setUserWaitingFriendsFlag] = useState(false)

    const [waitingUsers, setWaitingUsers] = useState(undefined)

    useEffect(() => {
        const getWaitingUsers = async () => {
            let userID = userSession.userID
            try {
                const response = await fetch(`${API_URL}getPendingFriendRequests/${userID}`);
                const data = await response.json();

                if (data.success) {
                    setWaitingUsers(data.pendingFriendRequests);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getWaitingUsers();
    }, []);

    const [userFreinds, setUserFriends] = useState([])

    useEffect(() => {
        const getUserFriends = async () => {
            let userID = userSession.userID
            try {
                const response = await fetch(`${API_URL}getUserFreinds/${userID}`);
                const data = await response.json();

                if (data.success) {
                    setUserFriends(data.pendingFriendRequests);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserFriends();
    }, []);

    const confirmFriend = (ID_User) => {
        let session_ID = userSession.userID
        const data = { ID_User, session_ID };

        fetch(`${API_URL}confirmFriend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
            })
            .catch(error => {
                console.error('Błąd:', error);
            });
    };

    const deleteFriend = (ID_User) => {
        let session_ID = userSession.userID
        const data = { ID_User, session_ID };

        fetch(`${API_URL}deleteFriend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
            })
            .catch(error => {
                console.error('Błąd:', error);
            });
    }

    const hideElement = (event) => {
        event.target.closest('.user-data').classList.add('d-none');
    }
    const hideElementConfirm = (event) => {
        event.target.closest('.user-data').classList.add('d-none');
    }


    return (
        <div className="friends-modal-holder">
            <div onClick={() => setFriendsModalFlag(false)} className="d-flex justify-content-end fs-4 me-2 mt-1 close-friends-modal-icon" > X</div>
            <div className="d-flex fs-3 justify-content-center brand-friend">Friends List</div>
            <div>
                <div className="col-12 friend-input-holder">
                    <input
                        className="col-12 input-friend"
                        placeholder="enter friend's nick"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        onKeyDown={searchUser}
                    >
                    </input>
                </div>
                <div className="freinds-button-holder col-12 mt-3">
                    <label onClick={() => {
                        setUserFriendsFlag(true)
                        setUserWaitingFriendsFlag(false)
                    }

                    } className="button-holder">
                        <div className="button-friend-holder border-l-1">
                            Friends
                        </div>
                    </label>
                    <label onClick={() => {
                        setUserWaitingFriendsFlag(true)
                        setUserFriendsFlag(false)
                    }} className="button-holder ms-2">
                        <div className="button-friend-holder">
                            Invitations
                        </div>
                    </label>
                </div>
                <div>
                    {(userResults && userResults.userIMG) &&
                        <div>
                            <div className="d-flex justify-content-center mt-4 fs-4 result-header">
                                Search Result
                            </div>
                            <div className="mt-3 mb-3 d-flex user-data justify-content-between align-items-center ">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <img src={userIMGres} className="user-friend-img" ></img>
                                    </div>
                                    <div className="ms-5 fs-5">
                                        {userResults.Nick}
                                    </div>
                                    <div className="ms-5 fs-5">
                                        {userResults.Role}
                                    </div>
                                </div>
                                <div onClick={addToFriend} className="me-2">
                                    <svg className="add-icon" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M422-297.333 704.667-580l-49.334-48.667L422-395.333l-118-118-48.667 48.666L422-297.333ZM480-80q-82.333 0-155.333-31.5t-127.334-85.833Q143-251.667 111.5-324.667T80-480q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.333-31.5 155.333T763-197.333Q709-143 636-111.5T480-80Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666-619.333 146.666-480q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480-480Z" /></svg>
                                </div>
                            </div>
                            <div className="border-white-1"></div>
                        </div>
                    }
                    <div>
                        {userFriendsFlag &&
                            <div className="user-friends-holder">
                                <div className="d-flex justify-content-center mt-3 fs-4 users-friend">
                                    Your friends
                                </div>
                                <div className="user-friends-content">
                                    {userFreinds.map((elm) =>
                                        <div key={elm.ID_User} className="mt-3 mb-3 d-flex user-data justify-content-between align-items-center items-holder ">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <UserFriendsIMG elm={elm.userIMG} />
                                                </div>
                                                <div className="ms-5 fs-5">
                                                    {elm.Nick}
                                                </div>
                                                <div className="ms-5 fs-5">
                                                    {elm.Role}
                                                </div>
                                            </div>
                                            <div onClick={() => {
                                                deleteFriend(elm.ID_User);
                                                hideElement(event);
                                            }} className="me-2">
                                                <svg className="del-friend" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m332-285.333 148-148.001 148 148.001L674.667-332 526.666-480l148.001-148L628-674.667 480-526.666 332-674.667 285.333-628l148.001 148-148.001 148L332-285.333ZM480-80q-82.333 0-155.333-31.5t-127.334-85.833Q143-251.667 111.5-324.667T80-480q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.333-31.5 155.333T763-197.333Q709-143 636-111.5T480-80Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666-619.333 146.666-480q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480-480Z" /></svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        {userWaitingFriendsFlag &&
                            <div className="user-friends-holder">
                                <div className="d-flex justify-content-center mt-3 fs-4 users-friend">
                                    Waitings
                                </div>
                                <div className="user-friends-content">
                                    {waitingUsers.map((elm) =>
                                        <div key={elm.ID_User} className="mt-3 mb-3 d-flex user-data justify-content-between align-items-center items-holder">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <UserFriendsIMG elm={elm.userIMG} />
                                                </div>
                                                <div className="ms-5 fs-5">
                                                    {elm.Nick}
                                                </div>
                                                <div className="ms-5 fs-5">
                                                    {elm.Role}
                                                </div>
                                            </div>
                                            <div onClick={() => {
                                                hideElementConfirm(event);
                                                confirmFriend(elm.ID_User)
                                            }} className="me-2">
                                                <svg className="add-icon" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M422-297.333 704.667-580l-49.334-48.667L422-395.333l-118-118-48.667 48.666L422-297.333ZM480-80q-82.333 0-155.333-31.5t-127.334-85.833Q143-251.667 111.5-324.667T80-480q0-83 31.5-156t85.833-127q54.334-54 127.334-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.333-31.5 155.333T763-197.333Q709-143 636-111.5T480-80Zm0-66.666q139.333 0 236.334-97.334 97-97.333 97-236 0-139.333-97-236.334-97.001-97-236.334-97-138.667 0-236 97Q146.666-619.333 146.666-480q0 138.667 97.334 236 97.333 97.334 236 97.334ZM480-480Z" /></svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )

}

export default FriendsPopup;