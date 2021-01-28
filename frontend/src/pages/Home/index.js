import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProductCard from '../../components/ProductCard';
import ProductValues from './ProductValues';
import CustomTypography from '../../components/CustomTypography';


const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    backgroundImage:"linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2105&q=80)",
    //backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.75), url(https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2105&q=80))",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    padding: theme.spacing(8, 0, 6),
    height:"600px"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    maxWidth:"1350px"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  heroContentText:{
    color: '#fff'
  }
}));

const cards = [1, 2, 3, 4];

function Home(props) {
    const {history, auth} = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header/>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography style={{marginTop:70}} component="h1" variant="h2" align="center" className={classes.heroContentText} gutterBottom>
              Online Real-time Auctions
            </Typography>
            <Typography variant="h5" align="center" className={classes.heroContentText} paragraph>
              This website uses Socket.io to enable safe real-time auction environment.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button onClick={(e) => history.push("/products")} variant="contained" color="secondary">
                    Check out auctions
                  </Button>
                </Grid>
                { !auth.uid &&
                <Grid item>
                  <Button onClick={(e) => {
                    history.push("/sign-up")
                  }} variant="outlined" color="secondary">
                    Sign up to participate
                  </Button>
                </Grid>
                }
              </Grid>
            </div>
          </Container>
        </div>
        <ProductValues/>
      </main>
      <Footer/>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
    return ({
      auth: state.authReducer
    });
  };
  
  export default compose(withRouter, connect(
    mapStateToProps,
    null
  ))(Home);
