const express = require('express');
const {chats} =  require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();



dotenv.config();

connectDB()
app.get('/'  , (req , res)=>{
      res.send("api is running")
})


app.use('/api/user' , userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log('server started on PORT 5000');
}) 