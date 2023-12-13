//Imports
import { useDispatch } from "react-redux"

function Ingreadinet({ ing, setingredient, ingredient, key }) {
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(setingredient(ingredient.filter((el) => el.id !== ing.id)))
    }

    return (
        <li
            className="ms-0 drink-ingredient d-flex rounded-pill mt-3 justify-content-between align-items-center"
            key={key}
        >
            <label className="text-truncate ps-3 text-over" > {ing.text} </label>
            <button
                onClick={deleteHandler}
                type="button"
                className=" border-0 bg-danger delete-searching-ingredient"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </button>
        </li>
    )
}

export default Ingreadinet