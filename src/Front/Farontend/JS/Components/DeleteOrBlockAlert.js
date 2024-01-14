//Imports
import io from 'socket.io-client'
import { useRef, useEffect, useContext } from 'react'
import { SessionContext } from '../Session/SessionContext'
import localhost from '../../../../config/config'
import { useDispatch } from 'react-redux'

function WindowAdminAlert({ setWindowAlert, hiddenDrinkElements, setHiddenDrinkElements, setHiddenElements,
    hiddenElements, windowAlert, blockedButton, setBlockedButton, setAnnouncementSuccess,
    setAnnouncementsUserDoesntExist, setAnnouncementsError, setUsers }) {

    const dispatch = useDispatch()
    const socket = io(`http://${localhost}:4002`)
    const userData = useContext(SessionContext).userSesion

    const deleteDrink = async () => {
        let ID_Drink = windowAlert.ObjectID.ID_DRINK
        socket.emit('deleteDrink', { ID_Drink })

    }

    const deleteUser = async () => {
        let userID = windowAlert.ObjectID.ID_User
        if (userData.userID === userID) {
            return alert('you can not ban yourself')
        }
        socket.emit('deleteUser', { userID })
    }

    const blockUser = () => {
        let userID = windowAlert.ObjectID.ID_User
        if (userData.userID === userID) {
            return alert('you can not block yourself')
        }
        socket.emit('blockUser', { userID })
    }

    socket.on('blockUserResponse', (data) => {
        if (data.success) {
            dispatch(setAnnouncementSuccess(true))

            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) => {
                    if (user.ID_User === data.userID) {
                        return { ...user, IsBlocked: !user.IsBlocked }
                    }
                    return user
                })
                return updatedUsers
            })
        } else if (data.error === 'User not found') {
            setAnnouncementsUserDoesntExist(true)
        } else {
            setAnnouncementsError(true)
        }
    })

    socket.on('deleteUserResponse', (data) => {
        if (data.success) {
            dispatch(setAnnouncementSuccess(true))

            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.filter((user) => user.ID_User !== data.userID)
                return updatedUsers
            })
        } else if (data.error === 'User not found') {
            setAnnouncementsUserDoesntExist(true)
        } else {
            setAnnouncementsError(true)
        }
    })

    const hideElement = (elementId, drinkElementID) => {
        if (elementId) {
            setHiddenElements([...hiddenElements, elementId])
        } else {
            setHiddenDrinkElements([...hiddenDrinkElements, drinkElementID])
        }
    }

    let alertWindow = useRef()

    useEffect(() => {
        let handler = (e) => {
            if (!alertWindow.current.contains(e.target)) {
                setWindowAlert(!windowAlert.isOpen)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    return (
        <div ref={alertWindow} className="bg-red">
            <div className="d-flex justify-content-end me-2 pt-2">
                <label onClick={() => {
                    setWindowAlert(!windowAlert.isOpen)
                    setBlockedButton(false)
                }}>
                    <svg fill="red" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </label>
            </div>
            <div className="d-flex justify-content-center fs-5 ps-4 pe-4" >Are you sure you want to make this operation?</div>
            <div className="d-flex justify-content-evenly mb-4 mt-4">
                {blockedButton === false &&
                    <label onClick={windowAlert.ObjectID.ID_User !== undefined ? deleteUser : deleteDrink} >
                        <button
                            className="confirming-button"
                            onClick={() => hideElement(windowAlert.ObjectID.ID_User, windowAlert.ObjectID.ID_DRINK)}
                        >Yes
                        </button>
                    </label>
                }
                {blockedButton === true &&
                    <label onClick={() => {
                        blockUser()
                        setWindowAlert(false)
                    }}>
                        <button className="confirming-button">Yes</button>
                    </label>
                }
                <label onClick={() => {
                    setWindowAlert(!windowAlert.isOpen)
                    setBlockedButton(false)
                }} >
                    <button className="not-confirming-button">No</button>
                </label>
            </div>
        </div>
    )
}

export default WindowAdminAlert