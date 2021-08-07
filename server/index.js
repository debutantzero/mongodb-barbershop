"use strict";
const express= require('express')
const cors= require('cors')
const mongoose=require('mongoose')
const cookie= require('cookie-parser')
const path= require('path')
//create application
const app=express()
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
    methods:"post , get"
}));
app.use(cookie());

//connection mongoose
const connection= mongoose.connection
const url="mongodb+srv://barbershop:barbershop@cluster0.bsd1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true}, ()=> {
    console.log("connect")
})
connection.once("open", ()=> {console.log("url valid")})


//routes
const verif= require('./routes/middleware.routes')
const userRoutes=require('./routes/user.routes')
const userRoutesNoToken=require('./routes/user.no.token')
const postRoutes= require('./routes/post.routes')
app.use("/apikey" , userRoutes)
app.use("/apikey" , postRoutes)
app.use("/apikey" , verif)
app.use("/api", userRoutesNoToken);

//express static
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.get("*", function(req, res){
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

//create server
const port= 5000
app.listen(port, ()=>{
    console.log("server on port " + port)
})