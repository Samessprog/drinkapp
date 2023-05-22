import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAlcocholic, setSoftDrinks } from "../States/actions";


function TypeOfDrink() {

    const dispatch = useDispatch();

    const alcocholic = useSelector(state => state.drink.alcocholic);
    const softDrinks = useSelector(state => state.drink.softDrinks);


    return (
        <div>
            <div className="d-flex mt-1">
                <input onClick={() => dispatch(setAlcocholic(!alcocholic))} type="checkbox" ></input>
                <label className="ms-1">Alcoholic</label>
            </div>

            <div className="d-flex mt-1">
                <input type="checkbox" onClick={() => dispatch(setSoftDrinks(!softDrinks))} ></input>
                <label className="ms-1">Soft drinks</label>
            </div>
        </div>
    )

}

export default TypeOfDrink;