import React from "react";


function TypeOfDrink({ alcocholic, setAlcocholic, softDrinks, setSoftDrinks }) {


    return (
        <div>
            <div className="d-flex mt-1">
                <input onClick={() => setAlcocholic(!alcocholic)} type="checkbox" ></input>
                <label className="ms-1">Alcoholic</label>
            </div>

            <div className="d-flex mt-1">
                <input type="checkbox" onClick={() => setSoftDrinks(!softDrinks)} ></input>
                <label className="ms-1">Soft drinks</label>
            </div>
        </div>
    )

}

export default TypeOfDrink;