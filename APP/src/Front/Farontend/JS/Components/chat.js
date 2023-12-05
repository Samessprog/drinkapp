import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from '../Session/SessionContext'
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, chatID, setShowChat, minimalize, setMinimalize }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const userSession = useContext(SessionContext).userSesion;

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                chat: chatID,
                author: userSession.nick,
                message: currentMessage,
                time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
            };
            await socket.emit("sendMessage", messageData);
            setCurrentMessage('')
        }
    };

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [socket]);

    return (
        <div className={`${minimalize ? 'minimalize-holder' : 'chat-holder'}`}>
            <div className="chat-header col-12 ">
                <div className="col-9 d-flex align-items-center">Live Chat</div>
                <div className="d-flex align-items-center">
                    <svg onClick={() => setMinimalize(!minimalize)} className="minimalize-icon me-2 pb-3" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M240-120v-60h481v60H240Z" /></svg>
                    <div className="flex-grow-1">
                        <div className="text-center">
                            <div className="close-icons-chat" onClick={() => {
                                setShowChat(false)
                                setMinimalize(false)
                            }
                            }>X</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${minimalize ? 'd-none' : ''}`}>
                <div className={`chat-body`} >
                    <ScrollToBottom className="message-container">
                        {messageList.map((currentMess) =>
                            <div className={`${currentMess.author === userSession.nick ? 'own-mess' : 'other-mess'}`}  >
                                <div>
                                    <div className="message-context text-break">{currentMess.message}</div>
                                </div>
                                <div className="message-data d-flex mt-1">
                                    <p className="me-2 ms-2 ">{currentMess.time}</p>
                                    <p className="fw-bolder">{currentMess.author}</p>
                                </div>
                            </div>
                        )}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer col-12">
                    <input
                        className="col-11 input-chat"
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
                    <button className="col-1 button-chat" onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        </div>
    )
}

export default Chat