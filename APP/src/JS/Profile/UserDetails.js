import React, { useState, useEffect, userDataChange } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function UserDetails({ userSesion }) {


    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/session')
            .then(response => response.json())
            .then(data => {
                console.log(data); // sprawdzenie czy data zawiera poprawną wartość
                const sessionId = data.sessionId;
                setSessionId(sessionId);
              })
            .catch(error => console.error(error));
    }, []);

    console.log("Sesion ID: " + sessionId)




    return (
        <div className=" col mt-3 ">
            <div class="d-flex justify-content-between p-5 flex-column flex-xl-row align-items-center">
                <div className=" d-flex align-items-center flex-column flex-md-row justify-content-center">
                    <div className="d-flex justify-content-center  align-items-center col-md-7 col-10 mb-4 me-4 col-xl-6 user-img-holder">
                        <LazyLoadImage
                            src="https://assets.puzzlefactory.pl/puzzle/302/116/original.jpg"
                            effect="blur"
                            className="img-fluid user-img" alt="Img error"
                        />
                    </div>

                    <div className="d-flex flex-column col-7">

                        <div className="user-data-box d-flex justify-content-between align-items-center">
                            <input className="user-data-box-input ps-2" placeholder={userSesion.email} ></input>
                            <svg style={{ fill: "white", marginRight: "5px" }} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M168 864q-29.7 0-50.85-21.162Q96 821.676 96 791.96V359.717Q96 330 117.15 309T168 288h624q29.7 0 50.85 21.162Q864 330.324 864 360.04v432.243Q864 822 842.85 843T792 864H168Zm312-240L168 445v347h624V445L480 624Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" /></svg>
                        </div>
                        <div className="user-data-box d-flex justify-content-between align-items-center mt-3">
                            <input className=" user-data-box-input ps-2" placeholder={userSesion.phone}></input>
                            <svg style={{ fill: "white", marginRight: "5px" }} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M264 1008q-29.7 0-50.85-21.15Q192 965.7 192 936V216q0-29.7 21.15-50.85Q234.3 144 264 144h432q29.7 0 50.85 21.15Q768 186.3 768 216v720q0 29.7-21.15 50.85Q725.7 1008 696 1008H264Zm0-216v144h432V792H264Zm215.789 108Q495 900 505.5 889.711q10.5-10.29 10.5-25.5Q516 849 505.711 838.5q-10.29-10.5-25.5-10.5Q465 828 454.5 838.289q-10.5 10.29-10.5 25.5Q444 879 454.289 889.5q10.29 10.5 25.5 10.5ZM264 720h432V336H264v384Zm0-456h432v-48H264v48Zm0 528v144-144Zm0-528v-48 48Z" /></svg>
                        </div>
                        <div className="user-data-box  d-flex justify-content-between align-items-center mt-3">
                            <input className=" user-data-box-input ps-2" placeholder={userSesion.nick}></input>
                            <svg style={{ fill: "white", marginRight: "5px" }} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M360.113 648Q340 648 326 634.113q-14-13.888-14-34Q312 580 325.887 566q13.888-14 34-14Q380 552 394 565.887q14 13.888 14 34Q408 620 394.113 634q-13.888 14-34 14Zm240 0Q580 648 566 634.113q-14-13.888-14-34Q552 580 565.887 566q13.888-14 34-14Q620 552 634 565.887q14 13.888 14 34Q648 620 634.113 634q-13.888 14-34 14ZM480.458 888q130.458 0 221-91T792 576.24q0-23.24-5-52.74-5-29.5-13-51.5-21 5-38 6.5t-40 1.5q-85.964 0-162.482-33.5T397 350q-37 78-93.5 129T170 556q-1 4-1.5 10t-.5 10q0 130 91 221t221.458 91ZM480 960q-79.376 0-149.188-30Q261 900 208.5 847.5T126 725.042q-30-69.959-30-149.5Q96 496 126 426t82.5-122q52.5-52 122.458-82 69.959-30 149.5-30 79.542 0 149.548 30.24 70.007 30.24 121.792 82.08 51.786 51.84 81.994 121.92T864 576q0 79.376-30 149.188Q804 795 752 847.5T629.869 930Q559.738 960 480 960Zm-55-691q46 63 117 101t154 38q12 0 21-.5t23-2.472Q691 336 625 300t-144.51-36q-12.49 0-26.465 1.5T425 269ZM187 471q57-29 95-71.5T342 298q-63 37-100 78t-55 95Zm238-202Zm-83 29Z" /></svg>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button onClick={userDataChange} type="submit" className="user-data-button-submit mt-3">Change your Data</button>
                        </div>

                    </div>

                </div>

                <div className="badges-holder col-4 p-3 mt-5 col col-12 col-xl-5 rounded">
                    <label className="badges-start">Your badges:</label>
                    <div className="d-flex  justify-content-center ">
                        No badges :c
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;

