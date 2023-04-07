// import React, { Suspense, useState } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "../Components/ErrorBoundary";
// import SettingsOfDrinkNavbarComp from "../Components/SettingsOfDrinkNavbarComp";
// <SettingsOfDrinkNavbarComp
// loginPopup={loginPopup}
// setLoginPopup={setLoginPopup}
// setSpecialOptionsPopup={setSpecialOptionsPopup}
// Popupsetings={Popupsetings}
// setPopupSetings={setPopupSetings}
// specialOptionsPopup={specialOptionsPopup}
// searchingDrink={searchingDrink}
// drinkDatas={drinkDatas}
// setSearchingDrink={setSearchingDrink}
// setDrinkNotFound={setDrinkNotFound}
// drinkDetailsPopup={drinkDetailsPopup}
// />

// function SettingsOfDrinkNavbarComp({ loginPopup,
//     setLoginPopup,
//     setSpecialOptionsPopup,
//     Popupsetings,
//     setPopupSetings, specialOptionsPopup,
//     searchingDrink,
//     drinkDatas,
//     setSearchingDrink,
//     setDrinkNotFound, drinkDetailsPopup}) {



//     const setingsMenu = () => {
//         if (loginPopup || specialOptionsPopup) {
//             setLoginPopup(false)
//             setSpecialOptionsPopup(false)
//         }
//         setPopupSetings(!Popupsetings)
//     }


//     return (
//         <div className="options-holder d-flex ms-4 mb-2 ">
//             { /*loginPopup || specialOptionsPopup === true ?  setSpecialOptionsPopup(false) && setLoginPopup(false) : setPopupSetings(!Popupsetings) */}
//             {!drinkDetailsPopup &&
//                 <button className="settings-button border-0 " onClick={setingsMenu}>
//                     <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
//                         <path d="M11.25 20.75v-5.5h1.5v2h8v1.5h-8v2Zm-8-2v-1.5h5.5v1.5Zm4-4v-2h-4v-1.5h4v-2h1.5v5.5Zm4-2v-1.5h9.5v1.5Zm4-4v-5.5h1.5v2h4v1.5h-4v2Zm-12-2v-1.5h9.5v1.5Z" />
//                     </svg>
//                 </button>
//             }

//             {Popupsetings && (
//                 <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
//                     <Suspense fallback={<div>Loading...</div>}>
//                         <SetingsPopup
//                             Popupsetings={Popupsetings}
//                             setPopupSetings={setPopupSetings}
//                             setSpecialOptionsPopup={setSpecialOptionsPopup}
//                             specialOptionsPopup={specialOptionsPopup}
//                             searchingDrink={searchingDrink}
//                             drinkDatas={drinkDatas}
//                             setSearchingDrink={setSearchingDrink}
//                             setDrinkNotFound={setDrinkNotFound}
//                         />
//                     </Suspense>
//                 </ErrorBoundary>
//             )}
//         </div>

//     )

// }

// export default SettingsOfDrinkNavbarComp;