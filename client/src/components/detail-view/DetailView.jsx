import React , { useState , useEffect , useContext } from 'react';
import Button from '../button/Button';
import { FiShoppingCart } from 'react-icons/fi';
import {GlobalState} from '../../GlobalState'

import './detail-view.scss'

const DetailView = props => {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;

    const product = props.product ;

    const [imgMain , setImgMain ] = useState('');

    const priceSale = product.price + product.price * 20 / 100 ;

    // if(product.length === 0) return null
   
  return (
    <div className="detail-view">
        <div className="detail-view__imgs">
            <div className="detail-view__imgs-list">
                <div className="detail-view__imgs-list--item" onClick={() => setImgMain(product.images1.url)}>
                    <img src={product.images1.url} alt="" />
                </div>
                <div className="detail-view__imgs-list--item" onClick={() => setImgMain(product.images2.url)}>
                    <img src={product.images2.url} alt="" />
                </div>
            </div>

            <div className="detail-view__imgs-main">
                <img src={imgMain === '' ? product.images1.url : imgMain} alt="" />
            </div>


        </div>

        <div className="detail-view__info">
            <div className="detail-view__info-title">
                {product.title}
            </div>

            <div className="detail-view__info-des">
                {product.description}
            </div>

            <div className="detail-view__info-price">
                <b>Price : {product.price} </b> <span>-</span>
                <del>{priceSale.toFixed(0)}</del>
            </div>

            <Button
                animation= {true}
                icon = {<FiShoppingCart />}
                 onClick={() => addCart(product)}
            >
                buy now
            </Button>


        </div>


    </div>
  )
}

export default DetailView