import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { TextField } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import ContentSend from 'material-ui/svg-icons/content/send';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {addChat} from '../../actions/chat-actions';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const initialState = {
    mouseX: null,
    mouseY: null,
    };

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    listItem: {
        width: '100%',
        display: "flex",
        "flex-direction": "row",
        justifyItems: "space-beetween"
    }
  });

  const defaultState = {
    input: '',
    mouseX: null,
    mouseY: null,
  };

export const ChatList = ({chats, addChat, RemoveChat}) => {
    const [state, setState] = React.useState(defaultState);
    const [stateMenu, setStateMenu] = React.useState(initialState);
    const classes = useStyles();

    const handleChange = useCallback((event) => {
        setState({ [event.target.name]: event.target.value });
    },[state]);
 
    const handleKeyUp = useCallback((event) => {
        if (event.keyCode === 13) { // Enter
            handleAddChat();
        }
    },[]);
 
    const handleAddChat = useCallback(() => {
        if (state.input.length > 0) {
            addChat(state.input);
            setState({ input: '' });
        }
    },[state]);

    const handleClick = (event) => {
        event.preventDefault();
        setStateMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setStateMenu(initialState);
    };

    const handleConfirm = (chatId) => {
        RemoveChat(chatId);
        setStateMenu(initialState);
    };

    return <List className={classes.root}>
        {chats && Object.keys(chats).map((chatId,idx) =>
        <Link key={`chat-${idx}`} to={`/chat/${chatId}`}>
            <ListItem primaryText={ chats[chatId].title }
                   leftIcon={ <ContentSend /> }
                   onContextMenu={handleClick}
                   rightIcon={ chats[chatId].attention ? <NotificationsActiveIcon fontSize={"small"} color={"secondary"}/> : null}>
            </ListItem>
            <Menu
                keepMounted
                open={stateMenu.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    stateMenu.mouseY !== null && stateMenu.mouseX !== null
                    ? { top: stateMenu.mouseY, left: stateMenu.mouseX }
                    : undefined
                }>
                    <MenuItem onClick={() => handleConfirm(chatId)}>Удалить</MenuItem>
                </Menu>
        </Link>)}
        <ListItem
                   key="Add new chat"
                   leftIcon={ <AddIcon /> }
                   onClick={ handleAddChat }
                   style={ { height: '60px' } }
                   children= {<TextField
                       key="textField"
                       fullWidth
                       name="input"
                       hintText="Добавить новый чат"
                       onChange={ handleChange }
                       value={ state.input }
                       onKeyUp={ handleKeyUp }
                   />}
               />
    </List>
}

ChatList.propTypes = {
    chats: PropTypes.object.isRequired,        
    addChat: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
 };

 const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
 });
 
 const mapDispatchToProps = dispatch => bindActionCreators({ addChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);