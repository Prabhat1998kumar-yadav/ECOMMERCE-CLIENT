import React, { useEffect, useState } from "react";
import "./Categories.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
function Categories() {
  const navigate=useNavigate();
  const params=useParams();
  const[categoryId,setCategoryId]=useState("");
  const[products,setProducts]=useState([])
  const categories=useSelector(state=>state.categoryReducer.categories);
 

  const sortOptions=[{
    
    value:"Price-Low To High",
    sort:"price"
  },{
    
    value:"Newest first",
    sort:"createdAt"
  }]
  const [sortBy,setSortBy]=useState(sortOptions[0].sort)


  async function fetchProducts(){
    const url=params.categoryId ? `/products?populate=*&filters[category][key]=${params.categoryId}&sort=${sortBy}`:`/products?populate=image&sort=${sortBy}`;
    const response=await axiosClient.get(url);
    
    setProducts(response.data.data)
  }
  useEffect(()=>{
    setCategoryId(params.categoryId)
    fetchProducts()
    
},[params,sortBy])

  function updateCategory(e){
      navigate(`/category/${e.target.value}`);
  }

  
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laboriosam, nihil! Numquam quidem delectus, earum quaerat aliquid
              ipsa sapiente vel illum!
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select className="select-sort-by" name="sort-by" id="sort-by" onChange={(e)=>setSortBy(e.target.value)}>
                {sortOptions.map(item=><option key={item.sort} value={item.sort}>{item.value}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Categroy</h3>
              {categories.map(item=>{
                return (<div key={item.key} className="filter-radio">
                <input name="category" type="radio" value={item.key} id={item.key} onChange={updateCategory} checked={item.key === params.categoryId}/>
                <label htmlFor={item.key}>{item.title}</label>
              </div>)
              })}              
            </div>
          </div>
          <div className="products-box">
            {products.map((product)=><Product key={product.id} product={product}/>)}            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
