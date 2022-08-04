import React , {useContext, useState, useRef } from 'react';
import { Link , useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import NotCart from '../../assets/no-cart.png';
import {AiOutlineMenuUnfold} from 'react-icons/ai';
import {IoClose} from 'react-icons/io5';
import {BiShoppingBag} from 'react-icons/bi';
import {IoIosSearch} from 'react-icons/io';
import { GlobalState } from '../../GlobalState';
import SearchHeader from './SearchHeader';
import axios from 'axios';


import './header.scss';

const menuHeader = [
  {
    display_name: 'home',
    path : '/'
  },
  {
    display_name: 'product',
    path : '/product'
  },
  {
    display_name: 'posts',
    path : '/posts'
  },
  {
    display_name: 'contact',
    path : '/contact'
  },
  {
    display_name: 'pages',
    path : '/pages'
  },
]

const Header = () => {

  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;


  const {pathname} = useLocation();

  const active = menuHeader.findIndex(item => item.path === pathname);

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const boxSearchRef = useRef(null);
  
  

  const openBar = () => {
    menuRef.current.classList.toggle('active');
  }

  const openSearch = () => {
    searchRef.current.classList.toggle('active');
    boxSearchRef.current.classList.toggle('active');
    setSearch('')
  }

  const logoutUser = async () =>{
    await axios.get('/users/logout')
    
    localStorage.removeItem('firstLogin')
    
    window.location.href = "/";
  }

  const loggedRouter = () =>{
    return(
      <Link to="/" onClick={logoutUser}><span>Logout</span></Link>
    )
  }

  const adminRouter = () =>{
    return(
        <>
            <div  className='nav-item'>
              <Link to = '/'><span className='line-hover'>ADMIN</span></Link>
              
              <ul className='sub-nav'>
                <li>
                  <Link to='/admin-product' ><span className='line-hover'>Create Product</span></Link>
                </li>
                <li>
                  <Link to='/category'><span className='line-hover'>Categories</span></Link>
                </li>
              </ul>
            </div>
        </>
    )
  }

  if(!cart) return null

  return (
    <div className="header">
        <div className="logo">
          <Link to={'/'}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="main-header">

            <div className="bar-mobile_tablet" onClick={openBar}>
              <AiOutlineMenuUnfold />
            </div>

            <div className="nav" ref={menuRef}>

              <div className="closeBar" onClick={openBar}>
                <IoClose />
              </div>
              {isAdmin && adminRouter()}
              {
                menuHeader.map((item, index) => (
                  <Link to={item.path} key={index} 
                    className={`nav-item ${active===index ? 'active' : ''}`}>

                      <span className='line-hover'>{item.display_name}</span>

                  </Link>
                ))
              }


            </div>
        </div>

        <div className="tool-header">
          <div className="search tool-icon">
              <SearchHeader searchRef={searchRef} boxSearchRef={boxSearchRef} />
              <IoIosSearch onClick={openSearch}/>
          </div>

          <div className="tool-cart tool-icon">
            {
              isLogged && <span>{cart.length}</span>
            }

            <Link  to='/cart' className="cart-icon">
              <BiShoppingBag />
            </Link>
              

            
            {
              cart.length !== 0 ?             
              <div className="box-cart">
                <div className="box-cart__header">
                    <span>Sản phẩm mới thêm</span>
                </div>

                <ul className="box-cart__list">
                  {
                    cart.map((item,index) => (
                      <li className="box-cart__item" key={index}>
                        <Link to='/cart'>
                            <img src={item.images1.url} alt="" />
                            <span>{item.title}</span>
                            <span>{item.price * item.quantity}</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
            </div>
              : 
              <div className="box-cart">
                  <img src={NotCart} alt="" className='box-cart__nocart'/>
              </div>
            }


          </div>

          <div className="login">
          {
            isLogged ? loggedRouter() : <Link to='/login'><span>Login</span></Link>
          }
          </div>

        </div>
    </div>
  )
}

export default Header