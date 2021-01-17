import React from 'react';
import MessageItem from '../message-item';

export const MessageList = ({messages}) => {
    return (
    <div style={{height: 300, maxHeight: 300,
                border: "1px solid slategray", 
                padding: 20,
                boxSizing: "border-box",
                overflow: "scroll", marginBottom: 20}}>    
        {messages && messages.map((item, idx) => 
        <MessageItem key={`msg-item-${idx}`} text={item.text} />)}
    </div>
    );
}

export default MessageList;