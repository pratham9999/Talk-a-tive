const express = require('express');
const {chats} =  require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes= require("./routes/messageRoutes")
const { notfound, errorHandler } = require('./middleware/errorMiddleware');



dotenv.config();

connectDB()

app.use(express.json());
app.get('/'  , (req , res)=>{
      res.send("api is running")
})



app.use('/api/user' , userRoutes)
app.use("/api/chat" , chatRoutes)
app.use("/api/message" , messageRoutes);




// for error Handling 
app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT , ()=>{
    console.log('server started on PORT 5000');
}) 

const io = require('socket.io')(server , {
    pingTimeout : 60000,
    cors : {
        origin : "http://localhost:3000"
    }
})

io.on("connection" , (socket)=>{
     console.log("connected to socket.io");
     socket.on('setup' , (userData)=>{
           socket.join(userData._id);
           socket.emit("connected")
     })

     socket.on("join chat" , (room)=> {
        socket.join(room)
        console.log("user Joined room : " ,  room );
        
    });


    socket.on("typing" , (room)=> socket.in(room).emit("typing"));
    socket.on("stop typing" , (room)=> socket.in(room).emit("stop typing"));
    

    socket.on("new message" , (newMessageRecieved)=> {
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat users not defined");

         chat.users.forEach((user)=>{

            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved" , newMessageRecieved);

         });
        
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

     
});

