import React from "react";

function ChatRoomPopup({userSesion, socket, chatID, setShowChat, roomFlag, setRoomFlag, setChatID }) {

    const joinChat = () => {
        if (userSesion) {
            socket.emit("joinChatRoom", chatID)
            setShowChat(true)
        }
    }

    return (
        <>
            {roomFlag &&
                <div className='col-10 col-sm-5 col-md-4 col-xl-2 chat-room-holder d-flex'>
                    <div className="d-flex flex-column col-12">
                        <div
                            onClick={() => setRoomFlag(false)}
                            className="d-flex justify-content-end close-room-IDs"
                        >X
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <label className="fs-5">Join to chat room</label>
                            <div>
                                <input
                                    className="room-id-input"
                                    type="number"
                                    placeholder="chat ID"
                                    onChange={(e) => setChatID(e.target.value)}
                                >

                                </input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 ">
                            <div
                                onClick={() => {
                                    joinChat()
                                    setRoomFlag(false)
                                }} className="join-to-room-button" >
                                Join
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatRoomPopup