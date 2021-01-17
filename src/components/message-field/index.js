import React, {useState, useEffect, useCallback} from 'react';
import MessageList from '../message-list';

export const MessageField = (props) => {
    const [messages, setMessages] = useState([]);
    const [lastSender, setLastSender] = useState(null);

    useEffect(() => {
        if (lastSender === 1) {
            let newMessage = {
                text: 'Не приставай ко мне, я робот!', 
                sender: 2,
                date: new Date()
            };
            setTimeout(() =>
            setMessages([ ...messages, newMessage]), 1000);
            setLastSender(2);
        };
        return () => clearTimeout();
    },[messages]);

    const handleSendClick = useCallback(() => {
        let newMessage = {
            text: 'Все нормально?', 
            sender: 1,
            date: new Date()
        };
        setMessages([ ...messages, newMessage]);
        setLastSender(1);
    },[messages, lastSender]);

    return (<>    
        <MessageList messages={messages}/>

        <button onClick={handleSendClick}>Отправить сообщение</button>
        </>)
 };

 export default MessageField;