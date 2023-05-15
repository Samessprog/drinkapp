import React from "react";

import { setDrinkLevel, setDrinkTaste } from "../States/actions";
import { useDispatch } from 'react-redux';

function DrinksOptions() {

    const dispatch = useDispatch();

    return (
        <div className="ms-2 multi-options">
            <div className="d-flex">
                <label className="">Level: </label>
                <select className=" ms-1 test"  onChange={(e) => dispatch(setDrinkLevel(e.target.value))}>
                    <option value={'All'}>All</option>
                    <option value={'Easy'}>Easy</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'Hard'}>Hard</option>
                </select>
            </div>


            <div className="d-flex mt-2">
                <label className=" ">Taste: </label>
                <select className=" ms-1 test" onChange={(e) => dispatch(setDrinkTaste(e.target.value))}>
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