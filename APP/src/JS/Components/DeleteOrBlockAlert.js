import React from "react";




function WindowAdminAlert({ setWindowAlert, windowAlert }) {
    const API_URL = 'http://localhost:3000/api/';



    const deleteUser = async () => {
        let userID = windowAlert.userID.ID_User
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
                alert('Success');
            } else if (response.status === 404 && data.error === 'User not found') {
                alert('User not found');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };


    return (
        <div className="bg-red ">
            <div className="d-flex justify-content-end me-2 pt-2">
                <label onClick={() => setWindowAlert(!windowAlert.isOpen)}>
                    <svg fill="red" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </label>
            </div>
            <div className="d-flex justify-content-center fs-5">Are you sure you want to delete the user?</div>
            <div className="d-flex justify-content-evenly mb-4 mt-4">
                <label onClick={deleteUser}>
                    <button className="confirming-button">Yes</button>
                </label>
                <label onClick={() => setWindowAlert(!windowAlert.isOpen)} >
                    <button className="not-confirming-button">No</button>
                </label>
            </div>

        </div>
    )
}

export default WindowAdminAlert;