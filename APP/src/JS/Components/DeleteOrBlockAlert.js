import React from "react";


function WindowAdminAlert({ setWindowAlert, hiddenDrinkElements, setHiddenDrinkElements, setHiddenElements, hiddenElements, windowAlert, blockedButton, setBlockedButton, setAnnouncementSucces, setAnnouncementsUserDoesntExist, setAnnouncementsError, setIsHidden }) {
    const API_URL = 'http://localhost:3000/api/';

    const deleteDrink = async () => {
        let ID_Drink = windowAlert.ObjectID.ID_DRINK

        try {
            const response = await fetch(`${API_URL}deleteDrink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID_Drink }),
            });

            const data = await response.json();

            if (response.status === 200 || data.message === 'Drink deleted successfully') {
                setAnnouncementSucces(true)
            } else if (response.status === 404 || data.error === 'Drink not found') {
                setAnnouncementsUserDoesntExist(true)
            }
        } catch (error) {
            console.error(
                setAnnouncementsError(true)
            );
        }
    };

    const deleteUser = async () => {
        setWindowAlert(!windowAlert.isOpen)
        let userID = windowAlert.ObjectID.ID_User
        try {
            const response = await fetch(`${API_URL}deleteUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });

            const data = await response.json();

            if (response.status === 200 && data.message === 'User deleted successfully') {
                setAnnouncementSucces(true)
            } else if (response.status === 404 && data.error === 'User not found') {
                setAnnouncementsUserDoesntExist(true)
            }
        } catch (error) {
            console.error(error);
            setAnnouncementsError(true)
        }
    };

    const blockUser = async () => {
        let userID = windowAlert.ObjectID.ID_User

        try {
            const response = await fetch(`${API_URL}blockUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            console.log(response.status)
            if (response.status === 200 || data.message === 'User block successfully') {
                setAnnouncementSucces(true)
            } else if (response.status === 404 && data.error === 'User not found') {
                setAnnouncementsUserDoesntExist(true)
            }
        } catch (error) {
            console.error(error);
            setAnnouncementsError(true)
        }
    };

    const hideElement = (elementId, drinkElementID) => {
        if (elementId) {
            setHiddenElements([...hiddenElements, elementId]);
        } else {
            setHiddenDrinkElements([...hiddenDrinkElements, drinkElementID])
        }
    }

    return (
        <div className="bg-red">
            <div className="d-flex justify-content-end me-2 pt-2">
                <label onClick={() => { setWindowAlert(!windowAlert.isOpen); setBlockedButton(false) }}>
                    <svg fill="red" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </label>
            </div>
            <div className="d-flex justify-content-center fs-5" >Are you sure you want to make this operation?</div>
            <div className="d-flex justify-content-evenly mb-4 mt-4">
                {blockedButton === false &&
                    <label onClick={windowAlert.ObjectID.ID_User !== undefined ? deleteUser : deleteDrink} >
                        <button className="confirming-button" onClick={() => hideElement(windowAlert.ObjectID.ID_User, windowAlert.ObjectID.ID_DRINK)} >Yes</button>
                    </label>
                }
                {blockedButton === true &&
                    <label onClick={blockUser}>
                        <button className="confirming-button">Yes</button>
                    </label>
                }
                <label onClick={() => { setWindowAlert(!windowAlert.isOpen); setBlockedButton(false) }} >
                    <button className="not-confirming-button">No</button>
                </label>
            </div>
        </div>
    )
}

export default WindowAdminAlert;