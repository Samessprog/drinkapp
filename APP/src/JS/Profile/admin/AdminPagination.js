import React from "react";
import ReactPaginate from 'react-paginate';

function AdminPagination({ showNewsFlag, currentPaginationItem, hiddenElements, setWindowAlert, windowAlert, setBlockedButton, pageCountItem, setCurrentPage, ComponentRender, setAnnouncementSucces }) {

    console.log(currentPaginationItem)

    return (
        <>
            {currentPaginationItem &&
                currentPaginationItem.map((elm) => (
                    <ComponentRender key={elm.id} elm={elm} showNewsFlag={showNewsFlag} hiddenElements={hiddenElements} setAnnouncementSucces={setAnnouncementSucces} setWindowAlert={setWindowAlert} windowAlert={windowAlert} setBlockedButton={setBlockedButton} />
                ))
            }
            {
                currentPaginationItem.length !== 0 &&
                <div className="d-flex justify-content-center align-items-center">
                    <ReactPaginate
                        nextLabel={
                            <svg
                                className="arroPagi"
                                xmlns="http://www.w3.org/2000/svg"
                                height="40"
                                width="40"
                            >
                                <path
                                    className="arrowPagination"
                                    d="m15.625 30-1.958-1.958 8.041-8.084-8.041-8.041 1.958-1.959 10.042 10Z"
                                />
                            </svg>
                        }
                        previousLabel={
                            <svg
                                className="arroPagi"
                                xmlns="http://www.w3.org/2000/svg"
                                height="40"
                                width="40"
                            >
                                <path
                                    className="arrowPagination"
                                    d="M23.375 30 13.333 19.958l10.042-10 1.958 1.959-8.041 8.041 8.041 8.084Z"
                                />
                            </svg>
                        }
                        pageCount={pageCountItem}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            }

            {
                currentPaginationItem.length === 0 &&
                <div className="d-flex align-items-center justify-content-center fs-4">Not found</div>
            }
        </>
    )

}

export default AdminPagination;