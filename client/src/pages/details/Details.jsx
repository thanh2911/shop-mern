import React , {useState , useEffect , useContext} from 'react' ;
import { useParams } from 'react-router-dom' ;
import DetailView from '../../components/detail-view/DetailView';
import { GlobalState } from '../../GlobalState';
import ProductCard from '../../components/product-card/ProductCard';

import './details.scss'

const Details = () => {

  const {slug} = useParams();

  const state = useContext(GlobalState);

  const [product] = state.productsAPI.productsAll;

  const [detail,setDetail] = useState([]) ;
  const [category,setCategory] = useState('');
  const [detailCategory , setDetailCategory] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const result = await product.find(item => item.slug === slug ) ; 
        setDetail(result);
        setCategory(result.category);
        window.scrollTo(0,0);
      } catch (error) {
        // console.log(error);
      }
    }
    getDetail();

  },[slug,product])

  useEffect(() => {
    const getDe_Ca = async () => {
      const res = await product.filter(item => item.category === category);
      setDetailCategory(res) ;
    }
    getDe_Ca();
  },[category, product ])

  if(Array.isArray(detail) === true) {
    return null
  } 
  //! khi chay lan dau if detail array => return null 

  if(detail === undefined) return null
  // ! khi ta f5 web if detail === undefined => return null

  // console.log(detailCategory);
  // console.log(detail);
  // if(detail.length ===0) return null

  return (
    <div className="detail">
        <DetailView product = {detail} />

        <div className='section-title '>Sản phẩm cùng loại</div>

          <div className="grid">
            <div className="row">
            {
              detailCategory.slice(0,8).map((item , index) => (
                <ProductCard key= {index}
                  id = {item.id}
                  images1 = {item.images1.url}
                  images2 = {item.images2.url}
                  title = {item.title}
                  price = {item.price}
                  slug = {item.slug}
                  pc = {`l-3`}
                  tl = {`m-6`}
                  mb = {`c-12`}
                />
              ))
            }
            </div>
          </div>
    </div>
  )
}

export default Details