import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        "background-color": "lightblue",
        padding: "5px 15px",
        "border-radius": "20px",
        "font-size": "18px",
        margin: "5px",
    },
    sender: {
        color: "gray",
        "font-size": "14px"
     }
  });

export const MessageItem = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}
        style={ { alignSelf: props.sender === 'bot' ?
                'flex-start' : 'flex-end', 
                backgroundColor: props.sender === 'bot' ? 
                'lightblue' : 'lightgreen'} }><div>{ props.text }</div>
                <div className={classes.sender}>{ props.sender }</div>
        </div>
    )
}

export default MessageItem;