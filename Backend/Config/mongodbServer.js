const mongoose = require('mongoose')
 require('dotenv').config()  //env

 const {mongooseConnectionId,mongoosePassword} = process.env;

 const password = encodeURIComponent(mongoosePassword);

// //connection Id for Atlas
const connection = `mongodb+srv://icforms:${password}${mongooseConnectionId}`;
  
 
//connection Id for Mongodb Local
 

 

const connectToMongoDB= mongoose.connect(connection,{})
    .then(()=>{
    console.log(`Connected to MongoDB Atlas`);
}).catch((error)=>{
    console.log(error.message);
    console.log("Not Connected");
})




module.exports = connectToMongoDB