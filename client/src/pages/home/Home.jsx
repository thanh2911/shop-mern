import React , {useState , useEffect, useContext} from 'react';

import Slider from '../../components/slider/Slider'
import ProductCard from '../../components/product-card/ProductCard';
import { GlobalState } from '../../GlobalState';

import './home.scss'

const Home = () => {


  const state = useContext(GlobalState);

  const [products] = state.productsAPI.productsAll;


  // console.log(products);

  return (
    <div className="home">

      <Slider data = {products}/>

      <div className="home-content">
        <div className='section-title '>top thịnh hành</div>

        <div className="grid">
        <div className="row">
          {
            products.map((item, index) => (
              <ProductCard 
                key={index}
                pc = {`l-3`}
                tl = {`m-4`}
                mb = {`c-12`}
                slug = {item.slug}
                title={item.title}
                images1 = {item.images1.url}
                images2 = {item.images2.url}
                price = {item.price}
              />
            ))
          }
        </div>
      </div>


        <div className='section-title '> phổ biến</div>

        <div className="grid">
        <div className="row">
          {
            products.map((item, index) => (
              <ProductCard 
                key={index}
                pc = {`l-3`}
                tl = {`m-4`}
                mb = {`c-12`}
                slug = {item.slug}
                title={item.title}
                images1 = {item.images1.url}
                images2 = {item.images2.url}
                price = {item.price}
              />
            ))
          }
        </div>
      </div>
      </div>

      

    </div>
  )
}

export default Home   