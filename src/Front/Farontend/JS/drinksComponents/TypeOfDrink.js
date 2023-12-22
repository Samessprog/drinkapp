//Imports
import { useDispatch, useSelector } from 'react-redux'
import { setDrinkType } from "../States/actions"

function TypeOfDrink() {

    const dispatch = useDispatch()
    const drinkType = useSelector(state => state.drink.drinkType)

    return (
        <div className=''>
            <div className="d-flex mt-1 align-items-center">
                <select
                    onChange={(e) => dispatch(setDrinkType(e.target.value))}
                    value={drinkType}
                    className='col-12'
                >
                    <option value={'All'}>All</option>
                    <option value={'Fizzy'}>Fizzy</option>
                    <option value={'Still'}>Still</option>
                    <option value={'Hot'}>Hot</option>
                    <option value={'Soft'}>Soft</option>
                    <option value={'Herbal'}>Herbal</option>
                </select>

            </div>
        </div>
    )
}

export default TypeOfDrink