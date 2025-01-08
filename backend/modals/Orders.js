const mongoose=require("mongoose")
const{Schema}=mongoose;

// Define a sub-schema for order items
/*const OrderItemSchema = new Schema({
    item: { type: String, required: true },
    qty: { type: Number, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
  });*/
  
const OrderSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique: true, // Yeh unique hona chahiye
        
    },
    // orderId: {
    //     type: String,
    //     required: true,
    //     unique: true, // Yeh unique hona chahiye
    //   },
    order_data:{
        type:Array,
        required:true,
    },

    order_date: {
        type: String, // Store the date as a string (e.g., "Thu Jan 03 2025")
        
      },
})

module.exports=mongoose.model('order',OrderSchema)