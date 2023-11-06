//Imports
import { useDispatch, useSelector } from 'react-redux';
import { setAlcocholic, setSoftDrinks } from "../States/actions";

function TypeOfDrink() {

    const dispatch = useDispatch();

    const alcocholic = useSelector(state => state.drink.alcocholic);
    const softDrinks = useSelector(state => state.drink.softDrinks);

    return (
        <div>
            <div className="d-flex mt-1 pe-2">
                <input
                    id="alcoholicCheckBox"
                    onClick={() => dispatch(setAlcocholic(!alcocholic))}
                    type="checkbox"
                    value={alcocholic}
                    className={alcocholic ? 'checked' : 'unchecked'}
                ></input>
                <label htmlFor="alcoholicCheckBox" className="ms-2">Alcoholic</label>
            </div>

            <div className="d-flex mt-1">
                <input
                    id="softCheckBox"
                    onClick={() => dispatch(setSoftDrinks(!softDrinks))}
                    type="checkbox"
                    value={softDrinks}
                    className={softDrinks ? 'checked' : 'unchecked'}
                ></input>
                <label htmlFor="softCheckBox" className="ms-2">Soft drinks</label>
            </div>
        </div>
    )

}

export default TypeOfDrink;