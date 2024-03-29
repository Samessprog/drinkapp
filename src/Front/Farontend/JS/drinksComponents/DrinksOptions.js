//Imports
import { useSelector, useDispatch } from "react-redux"
import { setDrinkLevel, setDrinkTaste } from "../States/actions"

function DrinksOptions() {

    const dispatch = useDispatch()
    const drinkLevel = useSelector(state => state.drink.drinkLevel)
    const drinkTaste = useSelector(state => state.drink.drinkTaste)

    return (
        <div className="col-8 ms-2 multi-options mt-0 pt-0 col-12 col-lg-10 justify-content-center mt-3 mt-lg-0">
            <div className="d-flex flex-column col-sm-7 col-lg-5 col-xl-5">
                <label className="d-flex justify-content-sm-center justify-content-start mb-0 mb-sm-1">Level</label>
                <select
                    value={drinkLevel}
                    className=" ms-1 test"
                    onChange={(e) => dispatch(setDrinkLevel(e.target.value))}>
                    <option value={'All'}>All</option>
                    <option value={'Easy'}>Easy</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'Hard'}>Hard</option>
                    <option value={'Extreme'}>Extreme</option>
                </select>
            </div>

            <div className="d-flex flex-column mt-3 col-sm-7 col-lg-5 col-xl-5">
                <label className="d-flex  justify-content-sm-center justify-content-start mb-0 mb-sm-1">Taste</label>
                <select
                    value={drinkTaste}
                    className=" ms-1 test"
                    onChange={(e) => dispatch(setDrinkTaste(e.target.value))}
                >
                    <option value={'All'}>All</option>
                    <option value={'Sour'}>Sour</option>
                    <option value={'Sweet'}> Sweet</option>
                    <option value={'Bitter'}>Bitter</option>
                    <option value={'Mixed'}>Mixed</option>
                </select>
            </div>
        </div>
    )
}

export default DrinksOptions