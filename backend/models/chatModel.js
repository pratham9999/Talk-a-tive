//chatName , isGroupChat , // user // latest mesage // groupAdmin 

const mongoose = require('mongoose');


const chatModel = mongoose.Schema(

   {
    chatName : {
        type : String ,
        trime : true 
    } ,

    isGrouptChat : {type : Boolean  , default : false} ,
    users : [{}]


   }
 

)