import React, { useState, useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom"

function Chat({ socket, chatID, setShowChat, minimize, setMinimize, userSesion }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    console.log(chatID)

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                chat: chatID,
                author: userSesion.nick,
                message: currentMessage,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            }
            await socket.emit("sendMessage", messageData)
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data])
        }

        socket.on("receiveMessage", handleReceiveMessage)

        return () => {
            socket.off("receiveMessage", handleReceiveMessage)
        }
    }, [socket])

    return (
        <section>
            <div className={`${minimize ? 'minimalize-holder' : 'chat-holder'}`}>
                <header>
                    <div className="chat-header col-12 ">
                        <div className="col-9 d-flex align-items-center ">
                            <label>Live Chat</label>
                            <label className="ms-3 overflow-hidden">Nr. {chatID}</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <svg
                                onClick={() => setMinimize(!minimize)}
                                className="minimalize-icon me-2 pb-3"
                                xmlns="http://www.w3.org/2000/svg"
                                height="48" viewBox="0 -960 960 960" width="48">
                                <path d="M240-120v-60h481v60H240Z" />
                            </svg>
                            <div className="flex-grow-1">
                                <div className="text-center">
                                    <div
                                        className="close-icons-chat"
                                        onClick={() => {
                                            setShowChat(false)
                                            setMinimize(false)
                                        }
                                        }>X</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={`${minimize ? 'd-none' : ''}`}>
                    <div className={`chat-body`} >
                        <ScrollToBottom className="message-container ">
                            {messageList.map((currentMess) =>
                                <div className={`${currentMess.author === userSesion.nick ? 'own-mess pt-2' : 'other-mess pt-2'}`}  >
                                    <div>
                                        <span className="message-context text-break">{currentMess.message}</span>
                                    </div>
                                    <div className="message-data d-flex mt-1">
                                        <time>
                                            <p className="me-2 ms-2 ">{currentMess.time}</p>
                                        </time>
                                        <p className="fw-bolder">{currentMess.author}</p>
                                    </div>
                                </div>
                            )}
                        </ScrollToBottom>
                    </div>
                    <div className="chat-footer col-12">
                        <input
                            className="col-10 col-md-11 input-chat"
                            type="text"
                            placeholder="Enter a message"
                            onChange={(event) => {
                                setCurrentMessage(event.currentTarget.value)
                            }}
                            onKeyDown={(event) => {
                                event.key === 'Enter' && sendMessage()
                            }}
                            value={currentMessage}
                        >
                        </input>
                        <button
                            className="col-2 col-md-1 button-chat"
                            onClick={sendMessage}
                        >&#9658;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Chat