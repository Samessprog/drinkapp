//Imports
import { useDispatch, useSelector } from 'react-redux'
import { setAlcocholic, setSoftDrinks } from "../States/actions"

function TypeOfDrink() {

    const dispatch = useDispatch()

    const alcocholic = useSelector(state => state.drink.alcocholic)
    const softDrinks = useSelector(state => state.drink.softDrinks)

    return (
        <div>
            <div className="d-flex mt-1 pe-2 align-items-center">
                <div
                    id="alcoholicCheckBox"
                    onClick={() => dispatch(setAlcocholic(!alcocholic))}
                    value={alcocholic}
                    className={`checkBoxFilter ${alcocholic ? 'checked' : 'unchecked'}`}
                >
                </div>
                <label
                    htmlFor="alcoholicCheckBox"
                    className="ms-2"
                >Alcoholic
                </label>
            </div>

            <div className="d-flex mt-1 align-items-center">
                <div
                    id="softCheckBox"
                    onClick={() => dispatch(setSoftDrinks(!softDrinks))}
                    value={softDrinks}
                    className={`checkBoxFilter ${softDrinks ? 'checked' : 'unchecked'}`}
                >
                </div>
                <label
                    htmlFor="softCheckBox"
                    className="ms-2"
                >Soft drinks
                </label>
            </div>
        </div>
    )
}

export default TypeOfDrink