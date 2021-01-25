import React from 'react';
import Header from '../header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

export const Layout = ({chatlist, currentchat}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header/>
            <div className={classes.chatContainer}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        {chatlist}
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        {currentchat}
                    </Paper>
                </Grid>
             </Grid>                
            </div>
        </div>
    )
}

export default Layout;