import React, { useEffect, useRef } from "react"

function AdminFilter({ showDrinksOptions, drinksFlag, usersFlag, showNewsFlag, setShowDrinksOptions, setAlphabeticalOrder,
    setUnAlphabeticalOrder, unAlphabeticalOrder, setIsBlocked, isBlocked, setFilterByDate, filterByDate, alphabeticalOrder }) {


    let filterRef = useRef()

    useEffect(() => {
        let handler = (e) => {
            if (!filterRef.current.contains(e.target) ) {
                setShowDrinksOptions(showDrinksOptions)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])


    return (
        <div ref={filterRef} className="data-filtering-holder  ms-3 pt-2">
            <div className="options-holder d-none d-md-flex " onClick={() => setShowDrinksOptions(!showDrinksOptions)}>
                <button className="mb-md-2 ms-1 btn btn-secondary bg-transparent border d-flex p-2" style={{ borderRadius: '15px' }} >
                    <svg className="me-1 fill-color-212 ms-2 me-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z" />
                    </svg>
                    <div className="pe-2">Filter</div>
                </button>
            </div>
            {showDrinksOptions && (drinksFlag || usersFlag || showNewsFlag) &&
                <div className="multi-options-holder-admin col-2">
                    <div className="ps-3 pt-3 pb-3">
                        <div className="mt-1">
                            <input type="checkbox" onChange={() => setAlphabeticalOrder(!alphabeticalOrder)} ></input>
                            <label className="ms-2"  >Alphabetic order</label>
                        </div>
                        <div className="mt-1">
                            <input type="checkbox" onChange={() => setUnAlphabeticalOrder(!unAlphabeticalOrder)} ></input>
                            <label className="ms-2">Unalphabetic order</label>
                        </div>
                        {usersFlag &&
                            <div className="mt-1">
                                <input type="checkbox" onChange={() => setIsBlocked(!isBlocked)}></input>
                                <label className="ms-2">Show blocked</label>
                            </div>
                        }
                        {showNewsFlag &&
                            <div className="mt-1">
                                <input type="checkbox" onChange={() => setFilterByDate(!filterByDate)}></input>
                                <label className="ms-2">Order by date</label>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminFilter