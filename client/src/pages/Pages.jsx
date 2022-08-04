import React , { useContext } from 'react';
import { GlobalState } from '../GlobalState';
import { Routes , Route} from 'react-router-dom';
import Home from './home/Home';
import Product from './product/Product';
import Details from './details/Details';
import Cart from './cart/Cart';
import Post from './posts/Post';
import DetailPost from './detail_post/DetailPost';
import Login from './auth/Login';
import Register from './auth/Register';

import AdminCategory from './admin/admin_category/AdminCategory';
import AdminProduct from './admin/admin_product/AdminProduct';



const Pages = () => {

    const state = useContext(GlobalState);
    // console.log(state);

  return (
    <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/product" element= {<Product />} />
        <Route path="/detail/:slug" element= {<Details />} />

        <Route path="/cart" element= {<Cart />} />

        <Route path="/category" element= {<AdminCategory />} />
        <Route path="/admin-product" element= {<AdminProduct />} />

        <Route path="/posts" element= {<Post />} />
        <Route path="/detail-post/:id" element= {<DetailPost />} />
        
        <Route path="/login" element= {<Login />} />
        <Route path="/register" element= {<Register />} />
    </Routes>
  )
}

export default Pages