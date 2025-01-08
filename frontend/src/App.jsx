import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


//import { Footer } from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import CartProvider from './Components/ContextReducer';
import MyOrder from './Pages/MyOrder';

function App() {
  return (
    <>
   <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Createuser" element={<SignUp />} />
          <Route path="/MyOrder" element={<MyOrder />} />
        </Routes>
      </Router>
      </CartProvider>
    <div className='footer'>
    
    </div>
    </>
  );
}

export default App;
