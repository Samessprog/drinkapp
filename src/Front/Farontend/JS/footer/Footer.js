//Imports
import drinkIMG from '../../../../Assets/drink.png'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import facebookIcon from '../../../../Assets/facebook.png'
import instagramIcon from '../../../../Assets/instagram.png'
import tikTok from '../../../../Assets/tik-tok.png'

function Footer({ searchingDrink, drinkDatas }) {

    return (
        <footer className={`mt-5 col-12 ${searchingDrink >= 6 ? ' position-absolute top-100' : ''} `}>
            <div className="footer pt-5 ps-3 d-flex flex-column align-items-center  align-items-md-start flex-md-row   pe-4">
                <div className='col-2 d-lg-block ms-4 d-none' >
                    <div>
                        <img
                            className='drink-footer-img img-fluid'
                            style={{ objectFit: "cover" }}
                            src={drinkIMG}
                            alt='loading error'
                        ></img>
                    </div>
                </div>
                <div className='col-12 col-lg-10 d-flex flex-column flex-lg-row align-items-center' >
                    <div className="col-12 col-lg-4 d-flex flex-column  align-items-center mb-3">
                        <label className="fs-3">𝒞𝑜𝒸𝓀𝓉𝒶𝒾𝓁 𝒫𝒶𝓇𝓉𝓎</label>
                        <div className="desc-container mt-2">
                            Witaj w naszej aplikacji do zaawansowanego tworzenia i odkrywania napojów! Naszym celem jest zapewnienie użytkownikom możliwości tworzenia, eksplorowania oraz dzielenia się swoimi ulubionymi recepturami na koktajle, lemoniady i wiele innych napojów.
                        </div>
                        <div className="d-flex mt-4 justify-content-center">
                            <img
                                className='col-4'
                                src={facebookIcon}
                                alt='loading error'
                            >
                            </img>
                            <img
                                className='col-4 ms-4'
                                src={instagramIcon}
                                alt='loading error'
                                >
                            </img>
                            <img
                                className='col-4 ms-4'
                                src={tikTok}
                                alt='loading error'
                                >
                            </img>
                        </div>
                    </div>

                    <div className='col-12 col-lg-4 d-flex align-items-center flex-column justify-content-start'>
                        <label className=' drink-count fs-4 d-flex ' >Total number of drinks</label>
                        <div className='drink-count-number d-flex mt-2'>
                            <CountUp
                                end={drinkDatas}
                                redraw={true}
                                duration={5}
                                start={drinkDatas + 10}
                            >
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor
                                        onChange={start}
                                        delayedCall
                                    >
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                        </div>
                    </div>
                    <div className='col-12 col-sm-4 d-flex justify-content-end ps-3 p mt-3'>
                        <div className=" col-6 d-flex flex-row-reverse pe-5 mb-2 ">
                            <div className='d-flex flex-column align-items-center align-items-sm-start'>
                                <label className='fw-bolder'>Useful links</label>
                                <ul className="ps-0 mt-2 ">
                                    <li>
                                        <a
                                            className="footer-links"
                                            href="#">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="footer-links"
                                            href="#"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="footer-links"
                                            href="#"
                                        >
                                            Tips
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="footer-links"
                                            href="#"
                                        >
                                            Tips
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            id="contact"
                            className="col-6 d-flex flex-row-reverse pe-5 mb-4"
                        >
                            <div>
                                <div className="fw-bolder">contact:</div>
                                <div className="contact mt-2">test@dom.pl</div>
                                <div className="contact mt-1">xxx-xxx-xxx</div>
                                <div className="contact mt-1">Facebook</div>
                                <div className="contact mt-1">instagram</div>
                                <a className='footer-links' href="https://github.com/Samessprog" target="_blank">Github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center p-1 copyright ">
                © 2022 - Sames All rights reserved
            </div>
        </footer>
    )
}

export default Footer