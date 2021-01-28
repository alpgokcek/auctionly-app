import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import './product-detail.scss';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { API_URL } from '../../app-constants';
import Countdown from 'react-countdown';


export const ProductDetail = (props) => {
    const { history, match } = props;
    const [state, setState] = useState({})

    useEffect(() => {
      axios.get(`${API_URL}/products/${match.params.id}`).then(res=>{
        setState(res.data)

        if(new Date(res.data.endTime) < new Date()) history.push('/')
      }).catch(err=>{
        history.push('/')
      })
      }, []);

    return (
        <>
            <Header/>
            <div className="product-detail">
              <div className="product-detail__info">
                <div className="product-detail__carousel">
                    <Carousel className="product-detail__carousel-img">
                        {
                            state.images?.map((image, index) => {
                                return (
                                    <Paper key={index}>
                                        <img className="product-detail__carousel-img" src={image} alt="photo"/>
                                    </Paper>
                                )
                            })
                        }
                    </Carousel>
                  </div>
                  <div className="product-detail__info__text">
                    <h1>{state.name}</h1>
                    <h3>{state.description}</h3>
                    <p><b>Starting Price:</b> {state.startPrice} ₺</p>
                    <p><b>Remaining Time:</b><Countdown date={new Date(state?.endTime)} /></p>
                  </div>
                </div>
                { props.auth.uid ?
                <div>
                    <iframe height="768px" width="1080px" style={{border: 'none'}}
                    //username, productid, userid, productname
                    src={`http://localhost:8000/chat.html?username=${props.auth?.name}&productid=${props.match.params.id}&userid=${props.auth?.uid}&productname=${state.name}`} 
                    title="Auctionly "
                    />
                </div>:
                <div>
                  <h1>Please log in to start or watch bidding</h1>
                </div>
                }
            </div>
        </>
    )
}

ProductDetail.propTypes = {
}


const mapStateToProps = state => {
    return ({
      auth: state.authReducer
    });
  };
  
  export default compose(withRouter, connect(
    mapStateToProps,
    null
  ))(ProductDetail);
