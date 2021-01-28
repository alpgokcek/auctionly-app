import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CustomTypography from '../../../components/CustomTypography';



const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary,
    maxHeight:'600px',
    marginBottom:'75px'
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://img.icons8.com/ios/452/realtime-protection.png"
                alt="realtime-icon"
              />
              <CustomTypography variant="h5" className={classes.title}>
                Realtime Offers
              </CustomTypography>
              <CustomTypography variant="h6" style={{textAlign:"center"}}>
                {'Join the room that is created for that specific item '}
                <br/>
                <b>{'and start bidding.'}</b>
              </CustomTypography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://solidfuels.ahkgroup.com/wp-content/uploads/2019/06/about-icon-170x186.png"
                alt="fast-reliable-icon"
              />
              <CustomTypography variant="h5" className={classes.title}>
                Fast and reliable
              </CustomTypography>
              <CustomTypography variant="h6" style={{textAlign:"center"}}>
                {'We are using Firebase Cloudfirestore for the database '}
                {'which makes us the '} <b>{'fastest.'}</b>
              </CustomTypography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://static.thenounproject.com/png/2742914-200.png"
                alt="easy-icon"
              />
              <CustomTypography variant="h5" className={classes.title}>
                Easy to Use
              </CustomTypography>
              <CustomTypography variant="h6" style={{textAlign:"center"}}>
                {'By registering, you will have access to '}
                <b>{'offering'}</b> {' and '} <b>{'selling'}</b> {'features.'}
              </CustomTypography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);