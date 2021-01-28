import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from '../../components/ProductCard';
import './products.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {API_URL} from '../../app-constants'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`${API_URL}/products`).then(res=>{
            setProducts(res.data.products)
        })
    }, [])
    return (
        <>
            <Header/>
            <div className="products">
                <div className="products__items-container">
                    <Grid container className={classes.root} spacing={2}>
                        {products.map((product) => (
                            <Grid key={product.id} item xs={6} sm={3}>
                                <ProductCard product={product}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <Footer/>
        </>
    )
}

Products.propTypes = {
    prop: PropTypes
}


export default Products;
