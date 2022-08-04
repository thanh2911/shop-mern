import React , {useState , useEffect} from 'react';
import axios from 'axios';

function ProductsAPI() {
  const [products, setProducts] = useState([])
  const [productsAll, setProductsAll] = useState([])
  const [callback, setCallback] = useState(false)
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(2)
  const [result, setResult] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)
  
//   console.log(limit);

  useEffect(() =>{
      const getProducts = async () => {
          const res = await axios.get(`/api/products?limit=${limit}&page=${page}&${category}&${sort}&title[regex]=${search}`)
          setProducts(res.data.products)
          setResult(res.data.result)
          setNumberOfPages(res.data.totalPages);
      }
      getProducts();

    const getProductsALL = async () => {
        const res = await axios.get(`/api/products`)
        setProductsAll(res.data.products)
    }
    getProductsALL();

  },[callback, category, sort, search, page])

  
  
  return {
      products: [products, setProducts],
      productsAll: [productsAll, setProductsAll],
      callback: [callback, setCallback],
      category: [category, setCategory],
      sort: [sort, setSort],
      search: [search, setSearch],
      page: [page, setPage],
      limit:[limit, setLimit],
      numberOfPages:[numberOfPages, setNumberOfPages],
      result: [result, setResult]
  }
}

export default ProductsAPI