const express = require("express");
const Orders = require("../modals/Orders");
const router = express.Router();

/*

router.get("/Myorder", async (req, res) => {

try{
    const {email}= req.query;
    console.log(email) 
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
let MyData=await Orders.findOne({email})
console.log("Orders Fetched:", MyData);
res.json({Orderdata:MyData})
}catch(error){
req.setEncoding("server error",error.message)
}

});*/



router.get("/Myorder", async (req, res) => {
    
        const email = req.query.email;
        console.log("Email received in backend:", email);


        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }
try{

   // console.log("Email received in backend:", email);
        const MyData = await Orders.findOne({ email });
      //  console.log("Orders Fetched:", MyData);

        if (MyData) {
            res.json({
                success: true,
                Orderdata:MyData
            });
           
        } else {
            res.status(404).json({ success: false, message: "No orders found for this email." });
        }
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});








module.exports = router;