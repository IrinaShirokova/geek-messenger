import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

  const initialState = {
    mouseX: null,
    mouseY: null,
    };

export const MessageItem = ({text, sender, RemoveMessage}) => {
    const classes = useStyles();
    const [state, setState] = React.useState(initialState);

    const handleClick = (event) => {
        event.preventDefault();
        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setState(initialState);
    };

    const handleConfirm = () => {
        RemoveMessage();
        setState(initialState);
    };

    return (
        <div className={classes.root}
        onContextMenu={handleClick} style={{ cursor: 'context-menu' }}
                style={ { alignSelf: sender === 'bot' ? 'flex-start' : 'flex-end', 
                backgroundColor: sender === 'bot' ? 'lightblue' : 'lightgreen'} }>
                <div>{text}</div>
                <div className={classes.sender}>{sender}</div>
            <Menu
            keepMounted
            open={state.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
            state.mouseY !== null && state.mouseX !== null
                ? { top: state.mouseY, left: state.mouseX }
                : undefined
            }>
                <MenuItem onClick={handleConfirm}>Удалить</MenuItem>
            </Menu>
        </div>
    )
}

export default MessageItem;