import React, {useState, useEffect, useCallback} from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import MessageItem from '../message-item';
import {changeChatAttention} from '../../actions/chat-actions';
import {getChatMessages} from '../../utils/selectors';

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
    input: ''
  };

export const MessageField = ({chatId, messages, chats, 
        onSendMessage, onRemoveMessage,
        changeChatAttention}) => {
    const [state, setState] = useState(defaultState);
    const {input} = state;
    let textInput = React.createRef();
    const classes = useStyles();

    useEffect(() => {
        textInput.current.focus();
        if (chats && chats[chatId] && chats[chatId].attention) {
            changeChatAttention(chatId, false);
        }
    },[messages, chats, chatId]);
  
    const handleSendClick = useCallback((message, sender) => {
        onSendMessage(message, sender);
        if (sender === 'me') {
            setState({ input: '' });
        }
    },[state]);
  
    const handleInputChange = (event) => {
        setState({[event.target.name] : event.target.value});
    }
  
    const handleInputKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            handleSendClick(input, 'me');
        }
    };

    const handleRemoveMessageClick = useCallback((messageId) => {
        onRemoveMessage(messageId,chatId);
    },[messages, chats]);
    
return <div className={classes.root}>
            <div className={classes.messagesView}>    
                {chats && chats[chatId] && chats[chatId].messageList && chats[chatId].messageList.map((msgId, idx) => 
                    messages && messages[msgId] && 
                    <MessageItem key={`msg-item-${idx}`} 
                        RemoveMessage={() => handleRemoveMessageClick(msgId)}
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
                    onKeyUp={ (event) => handleInputKeyUp(event) }
                />
                <FloatingActionButton onClick={ () => handleSendClick(input, 'me') }>
                    <SendIcon />
                </FloatingActionButton>
            </div>
        </div>
 };

 MessageField.propTypes = {
    chatId: PropTypes.number.isRequired,
    messages: PropTypes.object,
    chats: PropTypes.object,
    onSendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
    messages: chatReducer.messages,
 });
 
 const mapDispatchToProps = dispatch => bindActionCreators({changeChatAttention}, dispatch);

 export default connect(mapStateToProps, mapDispatchToProps)(MessageField);