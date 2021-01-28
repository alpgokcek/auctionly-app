import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  
function Footer(props) {
    const classes = useStyles();

    
    return (
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            Auctionly | {new Date().getFullYear()}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
            Online Real-time Auction System
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            COMP421 - Computer Networks Project
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Alp Gokcek - Dilay Sapmaz - Muhammed Rahmetullah Kartal
        </Typography>
    </footer>
    )
}


export default Footer

