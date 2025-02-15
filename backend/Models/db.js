const mongoose = require('mongoose')
require('dotenv').config();

const mongo_url = process.env.Mongo_CONN;
console.log(mongo_url);

mongoose.connect(mongo_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('MongoDB Connected');
}).catch((err)=>{
    console.log("MongoDB Connection Error: ", err);
    
})



