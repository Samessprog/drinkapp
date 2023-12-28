import { useState, useContext, useEffect } from "react"
import { v4 as uuid } from 'uuid'

import { SessionContext } from "../../../Session/SessionContext"
import { API_URL } from '../../../Components/Constants'

function UserOwnDrinkPopup({ setAddUserNewDrink, addUserNewDrink, setDrinkAddedFlag }) {

    //fetch user session to fetch needed data
    const userSession = useContext(SessionContext).userSesion

    //states for add new drink // drink details
    const [drinkName, setDrinkName] = useState("")
    const [drinkDescription, setDrinkDescription] = useState("")
    const [drinkHistory, setDrinkHistory] = useState("")
    const [drinkType, setDrinkType] = useState("")
    const [drinkLevel, setDrinkLevel] = useState("")
    const [drinkTaste, setDrinkTaste] = useState("")

    //arr for drinks err
    const [drinkErrors, setDrinkErrors] = useState(null)
    //flag that checks for errors while adding a drink
    const [isSuccess, setIsSuccess] = useState(false)
    //ingredient of a new drink
    const [ingredientsOfNewDrink, setIngredientsOfNewDrink] = useState([])
    const [ingredientsOfNewDrinkText, setIngredientsOfNewDrinkText] = useState('')
    //preparing for a drink
    const [preparationOfNewDrink, setPreparationOfNewDrink] = useState([])
    const [preparationOfNewDrinkText, setPreparationOfNewDrinkText] = useState('')

    //sending data from user as data to new drink
    const addNewDrinkHandler = async (event) => {
        event.preventDefault()
        const selectedFile = event.target.querySelector('input[type="file"]').files[0]
        const fileSizeInMB = selectedFile.size / (1024 * 1024)

        if (fileSizeInMB > 5) {
            setDrinkErrors('File size exceeds the limit of 5 MB!')
            return
        }

        if (selectedFile === undefined) {
            setDrinkErrors('No photo selected! ')
            return
        }

        const formData = new FormData()
        formData.append('imageData', selectedFile)
        formData.append('userID', userSession.userID)
        formData.append('drinkName', drinkName)
        formData.append('drinkDescription', drinkDescription)
        formData.append('drinkLevel', drinkLevel)
        formData.append('drinkTaste', drinkTaste)
        formData.append('drinkType', drinkType)
        formData.append('userNick', userSession.nick)
        formData.append('drinkHistory', drinkHistory)
        formData.append('ingredientsOfNewDrink', JSON.stringify(ingredientsOfNewDrink))
        formData.append('preparationOfNewDrink', JSON.stringify(preparationOfNewDrink))

        try {
            const response = await fetch(`${API_URL}addNewDrink`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            if (data.error) {
                setDrinkErrors(data.error)
                setIsSuccess(false)
            } else {
                //resetting the data to the initial state when adding a drink is successful
                setDrinkName('')
                setDrinkDescription('')
                setDrinkHistory('')
                setDrinkType('')
                setDrinkLevel('All')
                setDrinkTaste('All')
                setIsSuccess(true)
                setIngredientsOfNewDrink([])
                setPreparationOfNewDrink([])
                setDrinkAddedFlag(true)
                setAddUserNewDrink(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    //adding a dot at the end when adding
    const submitIngreadinetsHandler = () => {
        const newIngredientText = ingredientsOfNewDrinkText.trim() + '.'
        setIngredientsOfNewDrink([
            ...ingredientsOfNewDrink,
            { text: newIngredientText, id: uuid() }
        ])
        setIngredientsOfNewDrinkText('')
    }
    //component removal ingred
    const submitIngredientsDeleteHandler = (id) => {
        setIngredientsOfNewDrink(ingredientsOfNewDrink.filter((elm) => elm.id !== id))
    }

    //adding a dot at the end when adding
    const submitPreparationHandler = () => {
        const newPreparationText = preparationOfNewDrinkText.trim() + '.'
        setPreparationOfNewDrink([
            ...preparationOfNewDrink,
            { text: newPreparationText, id: uuid() }
        ])
        setPreparationOfNewDrinkText('')
    }
    //component removal Preparation
    const submitPreparationDeleteHandler = (id) => {
        setPreparationOfNewDrink(preparationOfNewDrink.filter((elm) => elm.id !== id))
    }
    const [previewImageUrl, setPreviewImageUrl] = useState("")

    const ownDrinkImgPrev = (event) => {
        const drinkImg = event.target

        if (drinkImg.files && drinkImg.files[0]) {
            const reader = new FileReader()

            reader.onload = (e) => {
                setPreviewImageUrl(e.target.result)
            }
            reader.readAsDataURL(drinkImg.files[0])
        }
    }
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setDrinkAddedFlag(false)
        }, 3000)
        return () => clearTimeout(timer)
    })

    return (
        <div className="col-11 col-sm-12 col-md-8 h-100 align-items-center own-drink-popup-holder ">
            <div className=" col-xl-11 col-12  users-own-deink p-2 ps-sm-3 mx-auto">
                <div className="d-flex justify-content-end mb-2 col-12 ">
                    <svg
                        className="close-icon"
                        onClick={() => { setAddUserNewDrink(!addUserNewDrink) }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="24" viewBox="0 -960 960 960" width="24">
                        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                </div>
                <form
                    onSubmit={addNewDrinkHandler}
                    className="col-sm-12 col-11 d-flex flex-column"
                >
                    <div className="col-12 d-flex flex-column flex-lg-row ">
                        <div className="col-lg-5 col-12">
                            <div className="d-flex justify-content-between col-12">
                                <div className="col-12 col-lg-11 d-flex flex-column align-items-center d-lg-block">
                                    <div className="mb-3 own-drink-box-input col-lg-10 col-12">
                                        <div className="col-11 d-flex align-items-center  align-items-lg-start mt-4">
                                            <div className="log-reg-icon-holder d-flex align-items-center justify-content-center">
                                                <svg
                                                    className="login-register-icon"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24" viewBox="0 -960 960 960" width="24">
                                                    <path d="M240-120v-80h200v-200L120-760v-80h720v80L520-400v200h200v80H240Zm58-560h364l72-80H226l72 80Zm182 204 111-124H369l111 124Zm0 0Z" /></svg>
                                            </div>
                                            <div className="col-11 col-sm-12 input-box ">
                                                <input
                                                    onChange={(e) => setDrinkName(e.target.value)}
                                                    className="col-11 ps-2 rounded login-register-input-data"
                                                    type="text"
                                                    placeholder="Drink Name"
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 ms-3 ms-sm-0">
                                        <textarea
                                            onChange={(e) => setDrinkDescription(e.target.value)}
                                            className="col-12  own-drink-desc"
                                            type="text"
                                            placeholder="Enter a description of youyr drink"
                                            value={drinkDescription}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="col-12 ms-3 ms-sm-0">
                                        <textarea
                                            onChange={(e) => setDrinkHistory(e.target.value)}
                                            className="col-12 own-drink-desc"
                                            type="text"
                                            placeholder="Enter a history of youyr drink (Unnecessary)"
                                            value={drinkHistory}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-lg-4 ms-2 d-flex mt-3 col-12 col-lg-10 justify-content-center justify-content-lg-start flex-column flex-sm-row options-holder-own-drink align-items-center">
                                <div className="d-flex mb-4 mb-sm-0">
                                    <div className="d-flex flex-column align-items-center">
                                        <label className="fs-5">Level: </label>
                                        <select
                                            className=" "
                                            onChange={(e) => setDrinkLevel(e.target.value)} value={drinkLevel}
                                        >
                                            <option value={'All'}>All</option>
                                            <option value={'Easy'}>Easy</option>
                                            <option value={'Medium'}>Medium</option>
                                            <option value={'Hard'}>Hard</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column align-items-center ms-4 ms-xl-4">
                                        <label className="fs-5">Taste: </label>
                                        <select className="" onChange={(e) => setDrinkTaste(e.target.value)} value={drinkTaste}>
                                            <option value={'All'}>All</option>
                                            <option value={'Sour'}>Sour</option>
                                            <option value={'Sweet'}> Sweet</option>
                                            <option value={'Bitter'}>Bitter</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="ms-4">
                                    <label className="fs-5">Select a type</label>
                                    <div >
                                        <input
                                            onChange={(e) => setDrinkType(e.target.value)}
                                            type="radio"
                                            name="drinks"
                                            id="alcoholic"
                                            value="Fizzy"
                                        >
                                        </input>
                                        <label className="ms-1" for="alcoholic">Fizzy</label>
                                    </div>
                                    <div >
                                        <input
                                            onChange={(e) => setDrinkType(e.target.value)}
                                            type="radio"
                                            name="drinks"
                                            id="soft-drinks"
                                            value="Still"
                                        >
                                        </input>
                                        <label className="ms-1" for="soft-drinks">Still</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="mt-3 file-upload d-flex flex-column justify-content-center col-12 align-items-center ">
                                <div className={`${previewImageUrl ? 'drink-img-holder col-9 d-flex' : 'd-none'}`}>
                                    <img className="own-img-holder col-12" src={previewImageUrl} alt='loading error'>
                                    </img>
                                </div>
                                <input
                                    className="file-drink-input mt-2"
                                    type="file"
                                    accept="image/*"
                                    capture="user"
                                    onChange={(event) => {
                                        addNewDrinkHandler(event)
                                        ownDrinkImgPrev(event)
                                    }}
                                />
                            </div>
                            <div className="d-flex mt-4 col-12 justify-content-center flex-column flex-sm-row align-items-center">
                                <div className="col-11 col-sm-5 col-xl-6 me-sm-4 ms-4 ms-sm-0" >
                                    <div className="col-12">
                                        <div className="d-flex mt-3 align-items-center">
                                            <input
                                                className="col-11  ing-input"
                                                onInput={(e) => {
                                                    const inputValue = e.target.value
                                                    if (/^[a-zA-Z0-9 ]{0,20}$/.test(inputValue)) {
                                                        setIngredientsOfNewDrinkText(inputValue)
                                                    }
                                                }}
                                                value={ingredientsOfNewDrinkText}
                                                placeholder="type your ingredients"
                                            />
                                            <svg
                                                onClick={submitIngreadinetsHandler}
                                                className="addison-button"
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24" viewBox="0 -960 960 960" width="24"
                                            >
                                                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                        </div>
                                        <div className="d-flex flex-column mt-1 ing-container">
                                            {ingredientsOfNewDrink.map((elm) => (
                                                <div className=" d-flex col-1align-items-center d-flex mt-2 ">
                                                    <label className="ing col-11 mt-3 ps-2 p-1 d-flex ">{elm.text}</label>
                                                    <svg onClick={() => submitIngredientsDeleteHandler(elm.id)} className="delete-icon mt-3" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-11 col-sm-5 col-xl-6 ms-4 ms-sm-0">
                                    <div className="col-12">
                                        <div className="d-flex mt-3 align-items-center">
                                            <input
                                                className="col-11  ing-input"
                                                onInput={(e) => {
                                                    const inputValue = e.target.value
                                                    if (/^[a-zA-Z0-9 ]{0,20}$/.test(inputValue)) {
                                                        setPreparationOfNewDrinkText(inputValue)
                                                    }
                                                }}
                                                value={preparationOfNewDrinkText}
                                                placeholder="Enter preparation"
                                            />
                                            <svg onClick={submitPreparationHandler} className="addison-button" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                        </div>
                                        <div className="d-flex flex-column mt-1 ing-container">
                                            {preparationOfNewDrink.map((elm) => (
                                                <div className=" d-flex col-1align-items-center d-flex mt-2">
                                                    <label className="ing col-11 mt-3 ps-2 p-1 d-flex">{elm.text}</label>
                                                    <svg onClick={() => submitPreparationDeleteHandler(elm.id)} className="delete-icon mt-3" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-row-reverse col-12 mb-5 mb-sm-1 mt-3">
                        <div className="d-flex justify-content-center  justify-content-xxl-end align-items-center col-12" >
                            <label className=" text-danger fw-bolder me-4 fs-5">{isSuccess === true ? 'you have successfully added a drink to the database wait for admin to approve it' : drinkErrors} </label>
                            <button className="col-10 col-xxl-1  mb-md-2 rounded-pill btn btn-secondary border rounded d-flex p-2 change-data-input-user">
                                <div className="pe-2 ps-2">Create!</div>
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
export default UserOwnDrinkPopup