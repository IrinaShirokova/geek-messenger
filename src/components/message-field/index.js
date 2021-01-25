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
    }
  });

  const defaultState = {
    messages: [],
    input: ''
  };

export const MessageField = (props) => {
    const [state, setState] = useState(defaultState);
    const {messages, input} = state;
    let textInput = React.createRef();
    const classes = useStyles();

    useEffect(() => {
        textInput.current.focus();
        if (messages && messages.length > 0 && messages[messages.length - 1].sender === 'me') {
            setTimeout(() =>
            {
                sendMessage('Не приставай ко мне, я робот!', 'bot');
            }, 1000);
        }
    },[state]);
  
    const handleSendClick = (message) => {
        sendMessage(message, 'me');
    };
  
    const handleInputChange = (event) => {
        setState({...state, [event.target.name] : event.target.value});
    }
  
    const handleInputKeyUp = (event, message) => {
        if (event.keyCode === 13) { // Enter
            sendMessage(message, 'me');
        }
    };
  
    const sendMessage = (message, sender) => {
        let newMessage = {
            text: message, 
            sender: sender,
            date: new Date()
        };
        setState({ 
            messages: [ ...messages, newMessage ],
            input: ''
        });
        console.log('123456');
    };
    
return <div className={classes.root}>
            <div className={classes.messagesView}>    
                {messages && messages.map((item, idx) => 
                <MessageItem key={`msg-item-${idx}`} text={item.text} sender={item.sender}/>)}
            </div>
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
 };

 export default MessageField;