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
    input: ''
  };

export const ChatList = ({chats, addChat}) => {
    const [state, setState] = React.useState(defaultState);
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

    return <List className={classes.root}>
        {chats && Object.keys(chats).map((chatId,idx) =>
        <Link key={`chat-${idx}`} to={`/chat/${chatId}`}>
            <ListItem 
                   primaryText={ chats[chatId].title }
                   leftIcon={ <ContentSend /> }>
            </ListItem>
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
    addChat: PropTypes.func.isRequired
 };

 const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
 });
 
 const mapDispatchToProps = dispatch => bindActionCreators({ addChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);