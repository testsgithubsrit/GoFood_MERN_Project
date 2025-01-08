import { useState,useEffect } from "react";
import { useDispatchCart ,useCart} from "../ContextReducer";
import { useRef } from "react";
//import { use } from "react";

const Card = (props) => {
let dispatch=useDispatchCart();

const priceRef=useRef();

let data=useCart();

let options=props.options||{};
let priceOptions=Object.keys(options)
let foodItems=props.foodItem;
const [qty,setQty] =  useState(1)
const [size, setSize] = useState(priceOptions[0] || "");
console.log("Cart after adding item:", useCart());


const handleAddToCartLogin=()=>{
  alert("login before add to cart");
}

const handleAddToCart = async () => {
  const existingFood = data.find(
    (item) => item.id === foodItems._id && item.size === size
  );

  if (existingFood) {
    // Update quantity and price for the matching item
    await dispatch({
      type: "UPDATE",
      id: foodItems._id,
      size: size,
      qty: qty, // New quantity to add
      finalPrice: finalPrice, // Price for the new quantity
    });
  } else {
    // Add a new item to the cart
    await dispatch({
      type: "ADD",
      id: foodItems._id,
      name: foodItems.name,
      qty: qty,
      size: size,
      finalPrice: finalPrice,
      img: foodItems.img,
    });
  }
  //console.lod(data)
};



let finalPrice = qty * parseInt(options[size]);
useEffect(()=>{
  setSize(priceRef.current.value)
},[])

//let finalPrice=size?qty*parseInt(options[size]):0;



  return (
    <>
        <div className="card mt-3 m-3" style={{ width: "18rem" }}>
        <img src={foodItems.img} className="card-img-top" alt="..." style={{height:"188px",objectFit:"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{foodItems.name}</h5>
          <p className="card-text">
            {foodItems.description}
          </p>
          <div className="container w-100">
<select className="m-2 h-100  bg-success"onChange={(e)=>setQty(e.target.value)}>
  {Array.from(Array(6),(e,i)=>{
    return(
      <option key={i+1} value={i+1}>{i+1}</option>
    )
  })}
</select>
<select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
{priceOptions.map((data)=>{
  return<option key={data}value={data}>{data} - ${options[data]}</option>
})}
</select>


<div className="d-inline h-100 fs-5">
  Rs:{finalPrice}/-
</div>
<hr>
</hr>
{localStorage.getItem("authToken")? (
<div className="btn bg-success text-white"onClick={handleAddToCart}>
Add to Cart
</div>):(<div className="btn bg-success text-white"onClick={handleAddToCartLogin}>
Add to Cart
</div>)}
          </div>
        
        </div>
      </div>
    </>
  )
}

export default Card
