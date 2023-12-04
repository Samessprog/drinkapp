import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from '../Session/SessionContext'
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, chatID, setShowChat }) {
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
        <div className="chat-holder col-xxl-2">
            <div className="chat-header col-12">
                <div className="col-10">Live Chat</div>
                <div className="d-flex">
                    <div className="me-3">--</div>
                    <div className="close-icons-chat" onClick={() => setShowChat(false)}>X</div>
                </div>

            </div>
            <div className="chat-body ">
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
    )
}

export default Chat