import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PetsIcon from '@material-ui/icons/Pets';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '10px 30px',
      width: "100%",
      zIndex: 1000
    },
  });

export const Header = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Chip
            icon={<PetsIcon />}
            label={`GEEK CHAT # ${props.chatId}`}
            color="secondary"
          />
        </div>
    )
}

export default Header;