import React from 'react';
import Header from '../header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MessageField from '../message-field';
import ChatList from '../chat-list';
import EmptyPage from '../empty-page';
import { withRouter } from "react-router-dom";

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

export const Layout = ({match,history}) => {
    const { id } = match.params;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header chatId={id}/>
            <div className={classes.chatContainer}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <ChatList/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        {id ? <MessageField chatId={id}/> : <EmptyPage/>}
                    </Paper>
                </Grid>
             </Grid>                
            </div>
        </div>
    )
}

export default withRouter(Layout);