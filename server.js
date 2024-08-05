const express=require("express");
const app=express();
const path=require('path'); 
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.json());
const connectDB=require('./config/db');
const { render } = require("ejs");
connectDB();
//cors
const corsOptions = {
  origin: "https://justshare-amyt.onrender.com", // Allow only this origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
//Template engine

app.set('views',path.join(__dirname,'/views'));  
app.set('view engine','ejs'); 

//Routes
app.get('/',function(req,res){
    res.sendFile('index.html',{root:__dirname});
})
app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'));

app.use('/files/download',require('./routes/download'));

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
}) ;