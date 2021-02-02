import React, {useCallback } from 'react';
import Header from '../header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MessageField from '../message-field';
import ChatList from '../chat-list';
import EmptyPage from '../empty-page';
import { withRouter } from "react-router-dom";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { sendMessage, removeMessage } from "../../actions/message-actions";
import { removeChat } from "../../actions/chat-actions";

const useStyles = makeStyles({
    root: {
        height: "100vh",
        width: "100%",
        margin: "auto",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "flex-direction": "column",
        "& .MuiGrid-container": {
            height: "100%"
        }
    },
    chatContainer: {
        height: "100%",
        width: "100%"
    },
    paper: {
        height: "100%",
        padding: 20
      },
  });

export const Layout = ({match, sendMessage, removeMessage, removeChat}) => {
    const { chatId } = match.params;
    const classes = useStyles();

    const onSendMessage = useCallback((message, sender) => { 
        sendMessage(message, sender, chatId);
    },[]);

    const onRemoveMessage = useCallback((messageId, chatId) => {
        removeMessage(messageId, chatId);
    },[]);

    const onRemoveChat = useCallback((id) => {
        removeChat(id);
    },[]);

    return (
        <div className={classes.root}>
            <Header chatId={chatId}/>
            <div className={classes.chatContainer}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <ChatList RemoveChat={onRemoveChat}/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        {chatId ? <MessageField  chatId={chatId}
                           onSendMessage={onSendMessage}
                           onRemoveMessage={onRemoveMessage}/> : <EmptyPage/>}
                    </Paper>
                </Grid>
             </Grid>                
            </div>
        </div>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, removeMessage, removeChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));