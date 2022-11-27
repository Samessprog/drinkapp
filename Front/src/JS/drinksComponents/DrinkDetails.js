import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DrinkDetails({elm}) {
   
    console.log(elm) 
    



    return (
        <div className="drink-holder">
           
            <div className="drink-main-container mt-5 ms-4 me-4">
                <div className="d-flex justify-content-between flex-lg-row flex-column">
                    <div className=" ">
                        <div className="d-flex  align-items-center">
                            <header>
                                <div className="drink-name fs-3 fw-bolder">drinkDatas</div>
                            </header>
                            <div className="d-flex ms-4">

                                <svg className="star " xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                                <svg className="star" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                                <svg className="star" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                                <svg className="star" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>
                                <svg className="star" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m8.85 17.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275ZM12 13.25Z" /></svg>

                            </div>
                        </div>

                        {/*Opis i składniki do drinku  */}

                        <div className="mt-5">
                            <article>
                                <div className="description-holder overflow-auto">
                                    <section>
                                        <label className="fs-5 fw-bolder">Sex on the beach</label>
                                        <p> Jeden z ciekawych smakowo i popularnych drinków z wódką. Możliwy do wykonania w wersji dwu warstwowej na dole sok żurawinowy, a nad nim pomarańczowy. Przepis zawiera nutkę brzoskwini, dzięki użyciu likieru.
                                            Aby utworzyć drink Sex on the beach w dwóch warstwach należy użyć sporo kostek lodu (niecałą połowę szklanki). Możecie również zmienić kolejność warstw, nalewając najpierw sok pomarańczowy a następnie po kostkach lodu żurawinowy wraz z alkoholami.</p>
                                    </section>
                                </div>
                            </article>
                            <div className="d-flex flex-column d-flex  align-items-center">

                                <label className="fs-4 fw-bolder">Specifications</label>

                                <div className="d-flex  mt-3 basic-information-drink">

                                    <label className="bg-light rounded-pill p-1  fw-bolder drink-creator">Albert</label>
                                    <label className="diff-level rounded-pill p-1 ms-2 fw-bolder ">Easy</label>
                                    <label className="drink-taste rounded-pill p-1  ms-2 fw-bolder ">Sour</label>
                                    <label className="bg-primary rounded-pill p-1  ms-2 fw-bolder ">Alkoholic</label>

                                </div>

                            </div>

                            <div className="mt-5">
                                <label className="fs-5 fw-bolder">Ingredients:</label>
                                <ul className="mt-2 ingrediets-list overflow-auto">
                                    {/*Wyświuetlanie z Bazy danych będzie*/}

                                    <li className="ingrediets-list-elm">wódka - 80 ml</li>
                                    <li className="ingrediets-list-elm">likier brzoskwiniowy - 40 ml</li>
                                    <li className="ingrediets-list-elm">sok pomarańczowy - 80 ml</li>
                                    <li className="ingrediets-list-elm">sok żurawinowy - 80 ml</li>
                                    <li className="ingrediets-list-elm">kostki lodu</li>

                                </ul>

                            </div>

                        </div>

                    </div>
        
                    <div className=" img-holder ">
                        <LazyLoadImage
                            src={"https://www.acouplecooks.com/wp-content/uploads/2021/06/Strawberry-Water-006.jpg"}
                            effect="blur"
                            className="drink-img" alt="Img error"

                        />
                    </div>

                </div>

                {/* Sposów przygotowania drinku */}

                <div className="d-flex  justify-content-center mt-5 fs-3 fw-bolder">Preparation</div>
                <div className="mt-2 border rounded pt-4 ps-4 pe-4">
                    <div className="overflow-auto preparation-holder fs-5 d-flex align-items-center flex-column">


                        <div>5.Przed wypiciem drink warstwowy należy pomieszać. Kolor ma ciekawy również wtedy, widoczny na 3 zdjęciu.</div>

                        <div className="mt-4">
                            <img alt="ERR"></img>

                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">

                        <ul className="pagination mb-1 ">
                            <li className="page-item " ><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>

                    </div>


                </div>


            </div>
         
        </div>
    )

}

export default DrinkDetails;