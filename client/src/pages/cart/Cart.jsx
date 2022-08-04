import React , {useState , useContext, useEffect} from 'react';
import { GlobalState } from '../../GlobalState';
import {Link} from 'react-router-dom'
import axios from 'axios';
import NotCart from '../../assets/no-cart.png';
import Button from '../../components/button/Button';
import './cart.scss';

const Cart = () => {

    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/users/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const decrement = (id) => {
        
        cart.forEach(item => {
            if(item._id === id && item.quantity > 1){
                item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    if(cart.length === 0) 
        return <div className="not-cart">
            <img src={NotCart} alt="" />

            <Link to={'/product'}>
                <Button 
                    size={'sm'}              
                >Mua hang</Button>
            </Link>
        </div>


  return (
    <div className="cart">

        <div className='section-title '>Cart</div>
        <div className="cart-list">
            {
                cart.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <div className="cart-item__img">
                            <img src={item.images1.url} alt="" />
                        </div>
                        <div className="cart-item__title">
                            {item.title}
                        </div>
                        <div className="cart-item__price">
                            {item.price} VND
                        </div>

                        <div className="cart-item__amount">
                                <button onClick={() => decrement(item._id)}> - </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increment(item._id)}> + </button>
                        </div>

                        <div className="cart-item__total--price">
                            {item.price * item.quantity} VND
                        </div>

                        <div className="delete" 
                            onClick={() => removeProduct(item._id)}>
                                Xóa
                        </div>


                    </div>
                ))
            }
        </div>

        <div className="cart-total">
            <h3>Total : {total} VND</h3>
        </div>
    </div>
  )
}

export default Cart