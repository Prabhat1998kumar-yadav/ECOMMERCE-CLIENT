import React from 'react'
import "./CartItem.scss"
import dummyCartImg from "../../assests/spiderman.jpg"
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/cartSlice'
function CartItem({cart}) {
   
  const dispatch=useDispatch()
  return (
    <div className='CartItem'>
        <div className="item-img">
            <img src={cart.image} alt="" />
        </div>
        <div className="item-info-wrapper">
            <div className="item-info">
                <p className="title">{cart.title}</p>
                <p className='price'>{cart.price} $</p>
                <div className="qunatity-selector">                
                    <span className="btn decrement" onClick={()=>dispatch(removeFromCart(cart))}>-</span>
                    <span className="quantity">{cart.quantity}</span>
                    <span className="btn increment" onClick={()=>dispatch(addToCart(cart))}>+</span>
                </div>
                <p className="total-price">Subtotal: {cart.quantity * cart.price}$</p>
            </div>
            <div className="item-remove">
                <IoMdClose />
            </div>
        </div>
       
    </div>
  )
}

export default CartItem