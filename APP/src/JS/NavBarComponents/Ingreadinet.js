import React from "react";
import { useDispatch } from "react-redux";

function Ingreadinet({ ing, setingredient, ingredient, key }) {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(setingredient(ingredient.filter((el) => el.id !== ing.id)))
    }

    return (
        <li className="ms-0 drink-ingredient d-flex rounded-pill mt-2 justify-content-between align-items-center" key={key}>
            <label className="text-truncate ms-2 text-over" > {ing.text} </label>
            <button onClick={deleteHandler} type="button" className=" border-0 bg-danger">X</button>
        </li>
    )
}

export default Ingreadinet;