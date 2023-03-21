import React from "react";


function DrinksOptions({ tasteHandler, levelHandler }) {

    return (
        <div className="ms-2 multi-options">
            <div className="d-flex">
                <label className="">Level: </label>
                <select className=" ms-1 test" onChange={levelHandler}>
                    <option value={'All'}>All</option>
                    <option value={'Easy'}>Easy</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'Hard'}>Hard</option>
                </select>
            </div>


            <div className="d-flex mt-2">
                <label className=" ">Taste: </label>
                <select className=" ms-1 test" onChange={tasteHandler}>
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