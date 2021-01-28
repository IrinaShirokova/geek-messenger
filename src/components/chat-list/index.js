import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';

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

export const ChatList = (props) => {
    const classes = useStyles();
    return <List className={classes.root}>
        <Link to="/chat/1/">
            <ListItem className={classes.listItem}>
                <CommentIcon /><span>Чатик раз</span>
            </ListItem>
        </Link>
        <Link to="/chat/2/">
            <ListItem className={classes.listItem}>
                <CommentIcon /><span>Чатик два</span>
            </ListItem>
        </Link>
        <Link to="/chat/3/">
            <ListItem className={classes.listItem}>
                <CommentIcon /><span>Чатик три</span>
            </ListItem>
        </Link>
    </List>
}

export default ChatList;