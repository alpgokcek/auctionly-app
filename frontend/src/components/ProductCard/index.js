import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Countdown from 'react-countdown';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ProductCard = (props) => {
    const {product, isEditVisible} = props;
    const {id, name, currentPrice} = product || {};
    const classes = useStyles();


  return (
    <Card className={classes.root}>
        <Link to={`/products/${id}`}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={product?.images[0]}
                title={name}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name || "Product Name"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Current Price: {(currentPrice || "0,00") + "₺"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Time Left: <Countdown date={product?.endTime} />
                </Typography>
                </CardContent>
            </CardActionArea>
        </Link>
      { isEditVisible &&
          <CardActions>
        <Button size="small" color="secondary">
          Edit the listing
        </Button>
      </CardActions>
      }
    </Card>
  );
}

export default ProductCard;
