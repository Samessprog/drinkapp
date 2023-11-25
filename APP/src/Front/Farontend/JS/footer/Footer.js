//Imports
import drinkIMG from '../../../../Assets/drink.png'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

function Footer({ searchingDrink, drinkDatas }) {

    return (
        <footer className={`mt-5 col-12 ${searchingDrink >= 6 ? ' position-absolute top-100' : ''} `}>
            <div className="footer pt-5 ps-3 d-flex flex-column align-items-center  align-items-md-start flex-md-row   pe-4">
                <div className='col-2 d-lg-block ms-4 d-none' >
                    <div>
                        <img className='drink-footer-img img-fluid' style={{ objectFit: "cover" }} src={drinkIMG}></img>
                    </div>
                </div>
                <div className='col-12 col-lg-10 d-flex flex-column flex-lg-row align-items-center' >
                    <div className="col-12 col-lg-4 d-flex flex-column  align-items-center mb-2">
                        <label className="fs-3">𝒞𝑜𝒸𝓀𝓉𝒶𝒾𝓁 𝒫𝒶𝓇𝓉𝓎</label>
                        <div className="desc-container mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pulvinar quis est ut porttitor. Nulla porta est vitae quam tempus vulputate. Nullam imperdiet eget velit a auctor. Sed auctor aliquam tortor ut vehicula. Proin neque metus, euismod ut ex at, sodales feugiat odio. Morbi venenatis ac dolor et hendrerit.
                        </div>
                        <div className="d-flex  mt-3 justify-content-center">
                            <svg className="facebook-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="60px" height="60px">
                                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z" /></svg>
                            <svg className="instagram-icon ms-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#F58529" />
                                        <stop offset="50%" stopColor="#DD2A7B" />
                                        <stop offset="100%" stopColor="#8134AF" />
                                    </linearGradient>
                                </defs>
                                <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" fill="url(#gradient)" />
                            </svg>
                        </div>
                    </div>

                    <div className=' col-12 col-lg-4 d-flex align-items-center flex-column mt-2'>
                        <label className=' drink-count fs-4' >Total number of drinks</label>
                        <div className='drink-count-number d-flex mt-2'>
                            <CountUp end={drinkDatas} redraw={true} duration={5} start={drinkDatas + 10} >
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor onChange={start} delayedCall>
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                        </div>
                    </div>
                    <div className='col-4 d-flex justify-content-end ps-3 p mt-3'>
                        <div className=" col-6 d-flex flex-row-reverse pe-5 mb-2 ">
                            <div>
                                <label>Useful links</label>
                                <ul className="ps-0 mt-2 ">
                                    <li>
                                        <a className="footer-links" href="#">Home</a>
                                    </li>
                                    <li>
                                        <a className="footer-links" href="#">Blog</a>
                                    </li>
                                    <li>
                                        <a className="footer-links" href="#">Tips</a>
                                    </li>
                                    <li>
                                        <a className="footer-links" href="#">Tips</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="contact" className="col-6 d-flex flex-row-reverse pe-5 mb-4">
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

export default Footer;