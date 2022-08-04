import React , {useContext, useState} from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import './header.scss'

const SearchHeader = props => {

    const state = useContext(GlobalState);
    const [search, setSearch] = state.productsAPI.search;
    const [products] = state.productsAPI.products;
    const [numberOfPages] = state.productsAPI.numberOfPages;
    const [limit, setLimit] = state.productsAPI.limit;

    const handleSearch = e => {
        setSearch(e.target.value.toLowerCase())
    }

  return (
    <div className="search-header">
        <input 
            type="text" value={search} 
            placeholder="Enter your search!"
            ref={props.searchRef}
            onChange={handleSearch}
        />    
        <div className="box-search" ref={props.boxSearchRef}>
            {
                products.length === numberOfPages || products.length === limit  ? 
                null
                :
                <ul className="box-search__list">
                {
                  products.map((item,index) => (
                    <li className="box-search__item" key={index}>
                      <Link to={`/detail/${item.slug}`}>
                          <img src={item.images1.url} alt="" />
                          <span>{item.title}</span>
                          <span>{item.price}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            }
        
            </div>


    </div>
  )
}

export default SearchHeader