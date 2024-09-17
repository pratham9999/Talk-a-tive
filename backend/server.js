const express = require('express');
const {chats} =  require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const { notfound, errorHandler } = require('./middleware/errorMiddleware');



dotenv.config();

connectDB()

app.use(express.json());
app.get('/'  , (req , res)=>{
      res.send("api is running")
})



app.use('/api/user' , userRoutes)
app.use("/api/chat" , chatRoutes);




// for error Handling 
app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log('server started on PORT 5000');
}) 