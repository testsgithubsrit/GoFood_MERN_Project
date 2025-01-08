import {useCart,useDispatchCart} from "../Components/ContextReducer";
import trash  from "../assets/react.svg";

import "./Cart.css";

const Cart = () => {

let data=useCart();
let dispatch=useDispatchCart();
/*if(data.length===0){
  return(
    <div>
      <span className="m-5 w-100 text-center fs-3">The Cart is Empty!</span>
    </div>
  );
}*/

let totalPrice = data.reduce((total, food) => total + food.finalPrice, 0).toFixed(2);

const handleRemove = (index) => {
  if (window.confirm("Are you sure you want to remove this item?")) {
    dispatch({ type: "REMOVE",index: index });
  }
};

const handleCheckout = async () => {
  const userEmail = localStorage.getItem("userEmail");
  console.log("Retrieved userEmail:", userEmail);
  
  if (!userEmail) {
    alert("Please log in before placing an order.");
    return; // Prevent execution if userEmail is missing
  }

  const response = await fetch("http://localhost:5000/api/orderData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString(),
    }),
  });
  console.log("order response",response)

  if (response.status === 200) {
    dispatch({ type: "DROP" }); // Clear the cart after successful checkout
  
    alert("Order placed successfully!");
  } else {
    alert("Failed to place order. Please try again.");
  }
};



  return (
    <>
   



<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">My Cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {data.length === 0 ? (
                <div className="text-center">
                  <span className="fs-3">The Cart is Empty!</span>
                </div>
              ) : (
        
 
<div className="container m-auto mt-5 table-responsive table-responsive-md">
      <table className="table table-dark">
  
  <thead>
  
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Options</th>
      <th scope="col">Amount</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {data.map((food,index)=>(

 
    <tr>
      <th scope="row">{index+1}</th>
      <td>{food.name}</td>
      <td>{food.qty}</td>
      <td>{food.size}</td>
      <td>{food.finalPrice}</td>
      <td><button type="button" className="btn p-0"><img src={trash} alt="delet" onClick={ handleRemove}/></button></td>
    </tr>
    
  ))}
    </tbody>

</table>
<div><h1 className="fs-2">total price: {totalPrice}</h1></div>
</div>


              )}
        
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-primary"onClick={handleCheckout}>Check Out</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
              
          
    </>
  );
  
};

export default Cart;
