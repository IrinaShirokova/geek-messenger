import React from 'react';
import MessageItem from '../message-item';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: "flex",
        zIndex: 1000
    }
  });

export const ChatList = (props) => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        chat list
    </div>
    );
}

export default ChatList;