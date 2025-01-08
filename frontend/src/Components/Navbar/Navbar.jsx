import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../ContextReducer';
import Cart from '../../Pages/Cart';

import './Navbar.css';

const Navbar = () => {

  


  let data=useCart();
  
  
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

const navigate=useNavigate();


  const handlelogout=()=>{
    alert("You are logout ")
localStorage.removeItem("authToken");
navigate("/Login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success p-4 fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fs-4" to="/">GoFood</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto">
            <li>
            <Link className="nav-link active " to="/">Home</Link>
            </li>
          
            {localStorage.getItem("authToken") ? (
            <li className="nav-item">
              <Link className="nav-link active mb-2" to="/MyOrder">
                My Orders
              </Link>
            </li>
          ) : null}
        </ul>
        {!localStorage.getItem("authToken")? (
          <div className="navbar-nav ms-auto">
            <Link className="bg-white text-success me-4 btn btn-outline-warning " to="/Login">Login</Link>
            <Link className=" btn btn-outline-warning  bg-white text-success btn1 btn2" to="/Createuser">SignUp</Link>
          </div>
       ) :(<div >
        <div className='btn bg-white text-success mx-2 position-relative'data-bs-toggle="modal" data-bs-target="#exampleModal" >
        My Cart
        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
    {data.length} {/* Change this number dynamically as needed */}


  </span>

<Cart/>
  
                </div>
       
       <div className='btn btn-outline-warning  bg-white text-danger mx-2'onClick={handlelogout}>
Logout
        </div>
        </div>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
