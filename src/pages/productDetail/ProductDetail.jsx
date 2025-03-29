import React, { useEffect, useState } from "react";
import dummyImg from "../../assests/daredevil.jpg";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";



function ProductDetail() {
  const params=useParams();
  const dispatch=useDispatch();
  const[singleProduct,setSingleProduct]=useState(null);
 
  const cart=useSelector(state=>state.cartReducer.cart)
  
  const quantity=cart.find(item=>item.key === params.productId)?.quantity || 0;
  
 
  async function fetchData() {
    const productResponse=await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=*`);
    
    if(productResponse.data.data.length>0){
    setSingleProduct(productResponse.data.data[0])
    }
  }

  useEffect(()=>{
    setSingleProduct(null);
      fetchData()
  },[params])
  
  if(!singleProduct){
    return <Loader/>
  }

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
              <img src={singleProduct?.image?.url} alt="product Img" />
            </div>
          </div>
          <div className="product-info">
            <h1 className="heading">{singleProduct?.title}</h1>
            <h3 className="price">{singleProduct?.price} $</h3>
            <p className="description">
              {singleProduct?.desc}
            </p>
            <div className="cart-options">
              <div className="qunatity-selector">
                <span className="btn decrement" onClick={()=>dispatch(removeFromCart(singleProduct))}>-</span>
                <span className="quantity">{quantity}</span>
                <span className="btn increment" onClick={()=>dispatch(addToCart(singleProduct))}>+</span>
              </div>
              <div className="btn-primary add-to-cart" onClick={()=>dispatch(addToCart(singleProduct))}>Add to Cart</div>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                Writer:Erica Schultz
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                  alias!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
