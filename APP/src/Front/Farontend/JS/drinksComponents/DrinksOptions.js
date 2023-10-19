//Imports
import { useSelector, useDispatch } from "react-redux";
import { setDrinkLevel, setDrinkTaste } from "../States/actions";

function DrinksOptions() {

    const dispatch = useDispatch();
    const drinkLevel = useSelector(state => state.drink.drinkLevel);
    const drinkTaste = useSelector(state => state.drink.drinkTaste);

    return (
        <div className="ms-2 multi-options mt-0 pt-0">
            <div className="d-flex flex-column ">
                <label className="d-flex justify-content-center mb-1">Level</label>
                <select value={drinkLevel} className=" ms-1 test"  onChange={(e) => dispatch(setDrinkLevel(e.target.value))}>
                    <option value={'All'}>All</option>
                    <option value={'Easy'}>Easy</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'Hard'}>Hard</option>
                </select>
            </div>


            <div className="d-flex flex-column mt-3 ">
                <label className="d-flex  justify-content-center mb-1">Taste</label>
                <select value={drinkTaste} className=" ms-1 test" onChange={(e) => dispatch(setDrinkTaste(e.target.value))}>
                    <option value={'All'}>All</option>
                    <option value={'Sour'}>Sour</option>
                    <option value={'Sweet'}> Sweet</option>
                    <option value={'Bitter'}>Bitter</option>
                </select>
            </div>
        </div>
    )
}

export default DrinksOptions;