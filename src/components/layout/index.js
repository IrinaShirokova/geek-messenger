import React, {useState, useEffect } from 'react';
import Header from '../header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MessageField from '../message-field';
import ChatList from '../chat-list';
import EmptyPage from '../empty-page';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { sendMessage } from "../../actions/message-actions";

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

export const Layout = (props) => {
    const { chatId } = props.match.params;
    const classes = useStyles();

    useEffect(() => {
        let msgs = props.messages;
        const messageId = msgs && Object.keys(msgs).length > 0 ? Object.keys(msgs).length : -1;
        if (messageId !== -1 && msgs[messageId] && msgs[messageId].sender === 'me') {
            setTimeout(() =>
            {
                const newMessageId = Object.keys(props.messages).length + 1;
                props.sendMessage(newMessageId, 'Не приставай ко мне, я робот!', 'bot', chatId);
            }, 1000);
        }
    },[props.messages]);

    const onSendMessage = (message, sender) => { 
        const messageId = Object.keys(props.messages).length + 1;
        props.sendMessage(messageId, message, sender, chatId);
    };

    return (
        <div className={classes.root}>
            <Header chatId={chatId}/>
            <div className={classes.chatContainer}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <ChatList/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        {chatId ? <MessageField  chatId={chatId}
                           onSendMessage={onSendMessage}/> : <EmptyPage/>}
                    </Paper>
                </Grid>
             </Grid>                
            </div>
        </div>
    )
}

Layout.propTypes = {
    chatId: PropTypes.number
};

const mapStateToProps = ({ chatReducer }) => ({
    messages: chatReducer.messages,
 });

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));