import React , {useState , useContext, useEffect , useRef} from 'react';
import { GlobalState } from '../../GlobalState';
import './pagination.scss';

const Pagination = () => {
    const state = useContext(GlobalState);
    const [page,setPage] = state.productsAPI.page;
  
    const limit = 4
    const [numberOfPages] = state.productsAPI.numberOfPages;


    let pages = Math.ceil(numberOfPages / limit);
    const pagesData = [...Array(pages).keys()]

    const gotoPrevious = () => {
      if(page > 0 ){
        setPage(prev =>  prev - 1);
      }
      
    };
    const gotoNext = () => {
      if(page < pages - 1 ){
        setPage(prev =>  prev + 1);
      }
    };


    // console.log(page, pagesData);
  return (
    <div className="pagination">
    <button className='prev' onClick={gotoPrevious}>Previous</button>
        {pagesData.map((pageIndex) => (
              <button key={pageIndex} 
                className={` number-page ${page === pageIndex ? 'active' : ''}`}
                onClick={() => setPage(pageIndex)}>
                {pageIndex + 1}
              </button>
            ))}
        <button className='next' onClick={gotoNext}>Next</button>
    </div>
  )
}

export default Pagination