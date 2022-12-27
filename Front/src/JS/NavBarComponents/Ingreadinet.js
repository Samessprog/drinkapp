import React from "react";


 function Ingreadinet({ ing, setingredient, ingredient }) {

    
    const deleteHandler = () => {
        setingredient(ingredient.filter((el) => el.id !== ing.id))
    }
    
    return (
        <li key={ing.id} className="ms-0 drink-ingredient d-flex rounded-pill mt-2 justify-content-between align-items-center">
            <label className="text-truncate ms-2 text-over"> {ing.text} </label>
            <button onClick={deleteHandler} type="button" className=" border-0 bg-danger">X</button>
        </li>
    )

}

export default Ingreadinet;