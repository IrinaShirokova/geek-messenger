import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: "100%",
        textAlign: "center",
        color: "rgba(0, 0, 0, 0.26)",
    }
});

export const EmptyPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SentimentVeryDissatisfiedIcon color="disabled" style={{ fontSize: 150 }}/>
            <Typography variant="h2" component="h2">NO CHAT SELECTED...</Typography>
        </div>
    )
}

export default EmptyPage;