const express=require("express")
const {body,validationResult}=require("express-validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // JWT modul
const router=express.Router()
const User=require('../modals/Users')
const jwtSecret="mynameisnehakumarifromgarhwa"
router.post("/createuser",
    body('name').isLength({min:2}),

    body('email').isEmail(),

    body('password','incorrect password').isLength({min:5})
    ,async(req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    try{

         // पासवर्ड हैश करें
      const salt = await bcrypt.genSalt(10); // सल्ट जनरेट करें
      const hashedPassword = await bcrypt.hash(req.body.password, salt); // पासवर्ड हैश करें
        await User.create({
            name:req.body.name,
            password:hashedPassword,
            email:req.body.email,
            location:req.body.location
        })
       .then( res.json({success:true}))
    }
    catch(error){
        console.log(error)
        res.json({success:false })

    }
})







router.post("/loginuser",
    
    body('email').isEmail(),

    body('password','incorrect password').isLength({min:5})
    ,async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

let email=req.body.email;
    try{
    let userData=    await User.findOne({email});
    if(!userData){
        return res.status(400).json({errors:"try login with correct credentials"});
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
    if(!isPasswordValid){
        return res.status(400).json({errors:"try login with correct credentials"});
    }

    const data={
        user:{
            id:userData.id
        }
    }
    const authToken=jwt.sign(data,jwtSecret)
    return res.json({success:true,authToken:authToken})
       //.then( res.json({success:true}))
    }
    catch(error){
        console.log(error)
        res.json({success:false })

    }
})




module.exports=router;