require("dotenv").config();
const app=require("./src/app");
const connectToDb=require("./config/db");

connectToDb();



app.listen(3000,()=>console.log("server running on 3000 port"));


