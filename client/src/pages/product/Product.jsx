import React, {useState , useContext,useEffect} from 'react';
import { GlobalState } from '../../GlobalState';
import ProductCard from '../../components/product-card/ProductCard';
import Pagination from '../../components/pagination/Pagination';
import Filter from '../../components/filter-product/Filter';
import './product.scss';

const Product = () => {

  const state = useContext(GlobalState);

  const [products] = state.productsAPI.products;

  const [callback, setCallback] = state.productsAPI.callback;
  const [page,setPage] = state.productsAPI.page;
  const [limit, setLimit] = state.productsAPI.limit;

  useEffect(() => {
    const getProducts = async () => {
       setPage(prev => prev = 0)
       setLimit(prev => prev = 4)
       setCallback(!callback)
    }
    getProducts();
  },[])

  console.log(limit);
  if(!products) return null ;

  return (
    <div className="products">

      <Filter />

      <div className="grid">
        <div className="row">
          {
            products.slice(0,limit).map((item, index) => (
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

      <Pagination/>
    </div>
  )
}

export default Product