/*const express=require ("express");
const cors = require("cors");
const app=express();
const PORT=5000;
const mongodb=require("./db");
mongodb();
app.get('/',(req,res)=>{
    res.send("hello neha")
})
app.use(
    cors({
      origin: "http://localhost:5173", // Allow React app origin
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.listen(PORT,()=>{
    console.log(`app listening on ${PORT}`)
})*/


const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mongodb = require("./db");

// Connect to MongoDB
mongodb();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow React app origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello neha");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/Myorder"));

// Start Server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
