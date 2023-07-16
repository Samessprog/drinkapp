import React from "react";


function Admin() {

    const [driksFlag, setDrinksFlag] = React.useState(true)
    const [usersFlag, setUsersFlag] = React.useState(false)


    return (
        <div className="admin-container p-3 p-sm-4 ">

            <div className="admin-header-holder">
                <header className="fs-2 admin-header">Hello admin NAME</header>
            </div>

            <div className="users-chart-holder mt-5 d-flex justify-content-center align-items-center ms-sm-1  m-md-3">
                <div className="">
                    miejsce na wykres od usera i opcje jego zmiany
                </div>

            </div>
            <div className="fs-2 white header-admin ms-3 ">
                <header>Database of users and drinks</header>
            </div>

            <div className="users-AND-drinks-db-holder  ms-sm-1  m-md-3 ">
                <div className="d-sm-flex justify-content-between col-12 mb-5 d-flex-column align-items-center">
                    <div className="d-flex ms-3 mt-0 optional-buttons-holder mt-2 col-6 ">
                        <div className="pb-0 me-2">
                            <button className="optional-buttons" onClick={() => { setDrinksFlag(true); setUsersFlag(false) }}>Drinks</button>
                        </div>
                        <div className="">
                            <button className="optional-buttons" onClick={() => { setDrinksFlag(false); setUsersFlag(true) }}>Users</button>
                        </div>
                    </div>

                    <div className="d-flex mt-3 me-3  d-flex justify-content-center  justify-content-sm-end ">
                        <div className="me-4 col-8 col-sm-12">
                            <input className="searching-items-admin ps-3 pe-3 col-12" type="text" placeholder="enter the name you are looking for"></input>
                        </div>
                        <div className="data-filtering-holder">
                            <svg className="data-filtering-icon" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L163.333-742q-14.333-18-4.166-38 10.166-20 32.833-20h576q22.667 0 32.833 20 10.167 20-4.166 38L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-286.666 226.001-286.668H253.999L480-446.666Zm0 0Z" /></svg>
                        </div>
                    </div>

                </div>
                <div className="d-flex justify-content-center align-items-center">
                    {usersFlag &&
                        <div >
                            BRAK USERÓW
                        </div>
                    }

                    {driksFlag &&
                        <div>
                            BRAK DRINKÓW
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Admin;