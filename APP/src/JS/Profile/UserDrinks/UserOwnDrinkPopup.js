import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../Session/SessionContext";


function UserOwnDrinkPopup({ setAddUserNewDrink, addUserNewDrink }) {
    //state for drinkImg
    const [imageSrc, setImageSrc] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png");

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
    };

    //states for add new drink
    const [drinkName, setDrinkName] = useState("")
    const [drinkdescription, setDrinkDescription] = useState("")
    const [drinkType, setDrinkType] = useState("")
    const [drinkLevel, setDrinkLevel] = useState("")
    const [drinkTaste, setDrinkTaste] = useState("")

    //const [drinkIMG ,setDrinkIMG] = useState("")

    const userSesion = useContext(SessionContext).userSesion;


    const addNewDrinkHandler = async (event) => {

        let userID = userSesion.userID
        let userNick = userSesion.nick

        event.preventDefault();
        fetch('http://localhost:3000/api/addNewDrink', {
            method: 'POST',
            body: JSON.stringify({ drinkName, drinkdescription, drinkLevel, drinkTaste, drinkType, userID, userNick }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === false) {

                }
            })
            .catch(error => console.error(error));
    }


    return (
        <div className="col-12 h-100 align-items-center own-drink-popup-holder">

            <div className="users-own-deink  col-11 col-sm-10 col-md-8 col-lg-6 col-xl-7 p-3 mx-auto">

                <div className="d-flex justify-content-end mb-2">
                    <svg className="close-icon" onClick={() => { setAddUserNewDrink(!addUserNewDrink) }} xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                        <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                    </svg>
                </div>
                <form onSubmit={addNewDrinkHandler}>
                    <div className="d-flex justify-content-between col-12">
                        <div className="col-6">
                            <div className="mb-3 own-drink-box-input col-10">
                                <input onChange={(e) => setDrinkName(e.target.value)} className="col-10 own-drink-input-name p-1 ps-2" type="text" placeholder="Enter drink name"></input>
                            </div>
                            <div className="col-10">
                                <textarea onChange={(e) => setDrinkDescription(e.target.value)} className="col-12 p-2 own-drink-desc" type="text" placeholder="Enter a description of youyr drink, inclue history itp"></textarea>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="col-12 col-lg-12 col-xl-8 drink-img-box"><img className="img-fluid own-drink-img-holder " src={imageSrc} alt="Uploaded file" /> </div>
                            <label className="mt-3 file-upload">
                                <input className="file-drink-input" type="file" accept="image/*" capture="user" onChange={handleFileInputChange} />
                            </label>
                        </div>
                    </div>
                    <div className="ms-2 multi-options">
                        <div className="d-flex">
                            <label className="">Level: </label>
                            <select className=" ms-1 test" onChange={(e) => setDrinkLevel(e.target.value)}>
                                <option value={'All'}>All</option>
                                <option value={'Easy'}>Easy</option>
                                <option value={'Medium'}>Medium</option>
                                <option value={'Hard'}>Hard</option>
                            </select>
                        </div>


                        <div className="d-flex mt-2">
                            <label className=" ">Taste: </label>
                            <select className=" ms-1 test" onChange={(e) => setDrinkTaste(e.target.value)}>
                                <option value={'All'}>All</option>
                                <option value={'Sour'}>Sour</option>
                                <option value={'Sweet'}> Sweet</option>
                                <option value={'Bitter'}>Bitter</option>
                            </select>
                        </div>
                    </div>
                    <div className="ms-2 mt-2">
                        <div className="d-flex mt-1">
                            <input onChange={(e) => setDrinkType(e.target.value)} type="radio" name="drinks" id="alcoholic" value="Alcoholic"></input>
                            <label className="ms-1" for="alcoholic">Alcoholic</label>
                        </div>


                        <div className="d-flex mt-1">
                            <input onChange={(e) => setDrinkType(e.target.value)} type="radio" name="drinks" id="soft-drinks" value="Soft"></input>
                            <label className="ms-1" for="soft-drinks">Soft drinks</label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success">Add this drink</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UserOwnDrinkPopup;