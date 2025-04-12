const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const courseRoutes = require("./Routes/CourseRoute");

const cors = require('cors')
require('./Models/db')

const PORT = process.env.PORT || 8080

app.get('/ping', (req,res)=>{
    res.send('pong')
})
app.use(express.json());


// app.use(bodyParser.json)
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)
app.use("/api", courseRoutes);
app.use('/uploads', express.static('uploads'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})