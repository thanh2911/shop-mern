import React , {useContext, useState} from 'react';
import { GlobalState } from '../../GlobalState';
import './filter.scss';

const Filter = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')  
    }

    // console.log(search);

    return (
        <div className="filter_menu">
            <div className="category_product">
                <span>Category: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category.name} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="sort-product">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
            
            <div className="search-product">
                <span>Search:</span>
                <input type="text" name='search' placeholder='Search...' 
                 onChange={e => setSearch(e.target.value)}
                />
            </div>
          
           
        </div>
    )
}

export default Filter