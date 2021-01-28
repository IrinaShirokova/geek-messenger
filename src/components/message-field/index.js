import React, {useState, useEffect, useCallback} from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import { makeStyles } from '@material-ui/core/styles';
import MessageItem from '../message-item';

const useStyles = makeStyles({
    root: {
        width: "100%",
        "& input": {
            fontSize: '22px'
        }
    },
    messagesView: {
        "background-color": "#e2e2e2",
        height: "80%",
        padding: "20px",
        "overflow-y": "scroll",
        display: "flex",
        "flex-direction": "column"
    },
    messageFieldBlock: {
        marginTop: "20px",
        width: "100%",
        display: "flex",
        "flex-direction": "row",
        justifyItems: "space-beetween"
    }
  });

  const defaultState = {
    messages: {},
    input: '',
    chats: {
        1: {title: 'Чат 1', messageList: []},
        2: {title: 'Чат 2', messageList: []},
        3: {title: 'Чат 3', messageList: []},
    },
  };

export const MessageField = ({chatId}) => {
    const [state, setState] = useState(defaultState);
    const {messages, input, chats} = state;
    let textInput = React.createRef();
    const classes = useStyles();

    useEffect(() => {
        textInput.current.focus();
        const messageId = Object.keys(messages).length > 0 ? Object.keys(messages).length : -1;
        if (messages[messageId] && messages[messageId].sender === 'me') {
            setTimeout(() =>
            {
                sendMessage('Не приставай ко мне, я робот!', 'bot');
            }, 1000);
        }
    },[messages, chats]);
  
    const handleSendClick = useCallback((message) => {
        sendMessage(message, 'me');
    },[state]);
  
    const handleInputChange = (event) => {
        setState({...state, [event.target.name] : event.target.value});
    }
  
    const handleInputKeyUp = useCallback((event, message) => {
        if (event.keyCode === 13) { // Enter
            sendMessage(message, 'me');
        }
    }, [state]);
  
    const sendMessage = (message, sender) => {
            const messageId = Object.keys(messages).length + 1;
            let newMessage = {
                text: message, 
                sender: sender,
                date: new Date()
            };

            let currentChat = chats[chatId];
            let currentMessageList = currentChat.messageList;

            let newChats = {...chats,
                [chatId]: { 
                    ...currentChat,
                    messageList: [...currentMessageList, messageId]
                }
            };

            let newState = {
                input: sender === 'me' ? '' : input,
                messages: {...messages, [messageId]: newMessage},
                chats: newChats
            };            
            setState(newState); 
    };
    
return <div className={classes.root}>
            <div className={classes.messagesView}>    
                {chats[chatId] && chats[chatId].messageList && chats[chatId].messageList.map((msgId, idx) => 
                messages[msgId] && <MessageItem key={`msg-item-${idx}`} 
                            text={messages[msgId].text} 
                            sender={messages[msgId].sender}/>)}
            </div>
            <div className={classes.messageFieldBlock}>
                <TextField
                    name="input"
                    ref={ textInput }
                    fullWidth={ true }
                    hintText="Введите сообщение"
                    onChange={ handleInputChange }
                    value={ input }
                    onKeyUp={ (event) => handleInputKeyUp(event, input) }
                />
                <FloatingActionButton onClick={ () => handleSendClick(input) }>
                    <SendIcon />
                </FloatingActionButton>
            </div>
        </div>
 };

 export default MessageField;