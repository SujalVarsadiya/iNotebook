const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongoURL = 'mongodb://localhost:27017/iNotebook'

const connectToMongo = async () =>{
    await mongoose.connect(mongoURL, ()=>{
        try{
            console.log("Connected to MongoDB");
        }catch(error){
            console.error("Error connecting to MongoDB:", error);
        }
    })
}

module.exports = connectToMongo;