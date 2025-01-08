
import { Footer } from "../Components/Footer/Footer";
import { useState, useEffect } from "react";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]); // Holds processed order data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) {
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/Myorder?email=${userEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.Orderdata?.order_data) {
          setOrderData(data.Orderdata.order_data); // Update with the order_data array
        } else {
          setError("Invalid order data format.");
        }
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching orders.",err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderData.length) return <p>No orders available.</p>;

  return (
    <>
    <div className="container my-4">
      <h2 className="mb-4">My Orders</h2>
      <div className="row">
        {orderData.map((orderGroup, index) => (
          
          <div key={index} className="col-12 mb-4">
            <div className="card">
              <div className="card-header">
                <h5>Order Date: {orderGroup?.order_date || "Unknown  Date"}</h5>
              </div>
              <div className="card-body">
                {orderGroup.items && orderGroup.items.length>0 ? (
                  
                  orderGroup.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="d-flex mb-3 align-items-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded me-3"
                      />
                      <div>
                        <p className="mb-1">
                          <strong>{item.name}</strong> (Qty: {item.qty}, Size: {item.size})
                        </p>
                        <p className="mb-0">Price: ₹{item.finalPrice}</p>
                      </div>
                    </div>
                    
                  ))
                ) : ("not found")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default MyOrders;
