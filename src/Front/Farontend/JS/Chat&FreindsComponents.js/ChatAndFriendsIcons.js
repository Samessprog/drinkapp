import React from "react";

function ChatAndFriendsIcons({minimize, userSesion, setRoomFlag, setFriendsModalFlag}) {

    return (
        <>
            {
                (!minimize && userSesion !== null) &&
                <>
                    <div
                        onClick={() => setRoomFlag(true)}
                        className='position-sticky chat-holder-icon me-3 d-flex flex-row-reverse column-flex'
                    >
                        <svg
                            className="position-absolute"
                            xmlns="http://www.w3.org/2000/svg"
                            height="40" viewBox="0 -960 960 960" width="40">
                            <path d="M240-399.333h315.333V-466H240v66.667ZM240-526h480v-66.666H240V-526Zm0-126.667h480v-66.666H240v66.666ZM80-80v-733.334q0-27 19.833-46.833T146.666-880h666.668q27 0 46.833 19.833T880-813.334v506.668q0 27-19.833 46.833T813.334-240H240L80-80Zm131.333-226.666h602.001v-506.668H146.666v575.002l64.667-68.334Zm-64.667 0v-506.668 506.668Z" />
                        </svg>
                    </div>

                    <div
                        onClick={() => setFriendsModalFlag(true)}
                        className='position-sticky  firends-icon me-3 d-flex flex-row-reverse column-flex' >
                        <svg
                            className="position-absolute"
                            xmlns="http://www.w3.org/2000/svg"
                            height="40" viewBox="0 -960 960 960" width="40">
                            <path d="M38.667-160v-100q0-34.666 17.833-63.166T105.333-366Q174.667-397.666 235-412.166q60.333-14.5 123.667-14.5 63.333 0 123.333 14.5T611.333-366q31 14.334 49.167 42.834 18.167 28.5 18.167 63.166v100h-640Zm706.666 0v-102.666q0-56.667-29.5-97.167t-79.167-66.833q63 7.333 118.667 22.5 55.667 15.166 94 35.5 34 19.333 53 46.166 19 26.834 19 59.834V-160h-176ZM358.667-480.667q-66 0-109.667-43.666Q205.333-568 205.333-634T249-743.666q43.667-43.667 109.667-43.667t109.666 43.667Q512-700 512-634t-43.667 109.667q-43.666 43.666-109.666 43.666ZM731.999-634q0 66-43.666 109.667-43.667 43.666-109.667 43.666-11 0-25.667-1.833-14.666-1.833-25.666-5.5 25-27.333 38.166-64.667Q578.666-590 578.666-634t-13.167-80q-13.166-36-38.166-66 12-3.666 25.666-5.5 13.667-1.833 25.667-1.833 66 0 109.667 43.667Q731.999-700 731.999-634ZM105.333-226.666H612V-260q0-14.333-8.166-27.333-8.167-13-20.501-18.667-66-30.333-117-42.167Q415.333-360 358.667-360q-56.667 0-108 11.833Q199.333-336.333 133.333-306q-12.333 5.667-20.167 18.667-7.833 13-7.833 27.333v33.334Zm253.334-320.667q37 0 61.833-24.833Q445.333-597 445.333-634T420.5-695.833q-24.833-24.834-61.833-24.834t-61.834 24.834Q272-671 272-634t24.833 61.834q24.834 24.833 61.834 24.833Zm0 320.667Zm0-407.334Z" />
                        </svg>
                    </div>
                </>
            }
        </>
    )
}

export default ChatAndFriendsIcons