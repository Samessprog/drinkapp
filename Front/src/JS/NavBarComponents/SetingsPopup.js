import React from "react";

function SetingsPopup(props) {

    {/* Settings Handler */ }
    {/* Settings States  */ }

    const [alcocholic, setAlcocholic] = React.useState(false)
    const [softDrinks, setSoftDrinks] = React.useState(false)
    const [highlyRated, setHighlyRated] = React.useState(false)

    const [drinkLevel, setDrinkLevel] = React.useState('All')
    const [drinkTaste, setDrinkTaste] = React.useState('All')


    // const [state, setState] = React.useState({
    //     alcocholic: false,
    //     softDrinks: false,
    //     writtenRated: true,
    //     drinkLevel: 'All',
    //     drinkTaste: 'All',
    // });

   
   
    React.useEffect(() => {
        const results = props.drinkDatas.filter((elm) => {
            if (
                (alcocholic && elm.DrinkType === 'Alcocholic') ||
                (softDrinks && elm.DrinkType === 'Soft') ||
                (!alcocholic && !softDrinks)
            ) {
                if (drinkLevel === 'All' || drinkLevel === elm.DifficultyLevel) {
                    if (drinkTaste === 'All' || drinkTaste === elm.Taste) {
                        return elm;
                    }
                }
            }
        });

        const sort = highlyRated
            ? results.sort((firstDrink, secDrink) => secDrink.Rate - firstDrink.Rate)
            : results.sort(() => 0.5 - Math.random());

        props.setSearchingDrink(sort);
    }, [alcocholic, softDrinks, highlyRated, drinkLevel, drinkTaste]);

    React.useEffect(() => {
        if (props.searchingDrink.length === 0) {
            props.setDrinkNotFound(true);
        } else {
            props.setDrinkNotFound(false);
        }
    }, [props.searchingDrink, props.setDrinkNotFound]);


    const levelHandler = (event) => { setDrinkLevel(event.target.value) }
    const tasteHandler = (event) => { setDrinkTaste(event.target.value) }

    return (
        <div className="position-absolute SetingsPopupHolder  mt-5 ">
            <div className="d-flex flex-row-reverse me-2 mt-2">
                <svg className="close-icon" onClick={() => props.setPopupSetings(false)} xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                    <path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Zm0-1.5q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" />
                </svg>
            </div>
            <div className="ms-2 mt-1 p-2 pe-3">

                <div className="d-flex justify-content-center">Settings</div>

                <form >
                    <div className="options-holder mt-3 d-flex font ">
                        <div className="">
                            <div className="d-flex mt-1">
                                <input type="checkbox" ></input>
                                <label className="ms-1">Favorite</label>
                            </div>

                            <div className="d-flex mt-1">
                                <input onClick={() => setAlcocholic(!alcocholic)} type="checkbox" ></input>
                                <label className="ms-1">Alcoholic</label>
                            </div>

                            <div className="d-flex mt-1">
                                <input type="checkbox" onClick={() => setSoftDrinks(!softDrinks)} ></input>
                                <label className="ms-1">Soft drinks</label>
                            </div>

                            <div className="d-flex mt-1">
                                <input type="checkbox" onClick={() => setHighlyRated(!highlyRated)} ></input>
                                <label className="ms-1">Highly rated </label>
                            </div>

                        </div>

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
                    </div>

                </form>
                <div className="d-flex justify-content-center mt-3">
                    <button onClick={() => {

                        props.setSpecialOptionsPopup(!props.specialOptionsPopup)
                        props.setPopupSetings(false)
                    }}

                        type="button" className=" special-button rounded">
                        Provide the ingredients
                    </button>
                </div>
            </div>
        </div>

    )

}


export default SetingsPopup;