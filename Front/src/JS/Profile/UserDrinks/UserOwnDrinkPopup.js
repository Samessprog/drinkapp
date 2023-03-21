import React from "react";
import DrinksOptions from "../../Components/DrinksOptions";

function UserOwnDrinkPopup({ setAddUserNewDrink, addUserNewDrink }) {
    //state for drinkImg
    const [imageSrc, setImageSrc] = React.useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png");

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
    };

    return (
        <div className="col-12 h-100 align-items-center own-drink-popup-holder">

            <div className="users-own-deink  col-6 p-3 mx-auto">

                <div className="d-flex justify-content-end mb-2"> 
                    <svg className="close-icon" onClick={()=>{setAddUserNewDrink(!addUserNewDrink)}} xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                        <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                    </svg>
                </div>

                <div className="d-flex justify-content-between col-12">
                    <div className="col-6">
                        <div className="mb-3">
                            <input className="col-10 own-drink-input-name p-1 ps-2" type="text" placeholder="Enter drink name"></input>
                        </div>
                        <div className="col-10">
                            <textarea className="col-12 p-2 own-drink-desc" type="text"></textarea>
                        </div>
                    </div>
                    <div className="col-6 ">
                        <div className="col-8"><img className="img-fluid own-drink-img-holder " src={imageSrc} alt="Uploaded file" /> </div>
                        <label className="mt-3">
                            <input className="" type="file" accept="image/*" capture="user" onChange={handleFileInputChange} />
                        </label>
                    </div>
                </div>
                <DrinksOptions />
            </div>
        </div>
    )
}
export default UserOwnDrinkPopup;