const mongoose=require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected");
    })
    .catch((err)=>{
        console.log("error:",err);
    })
}

module.exports=connectToDb;


