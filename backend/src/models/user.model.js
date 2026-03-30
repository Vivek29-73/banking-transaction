const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name should not be empty"]
    },

    email:{
        type:String,
        required:[true,"email should not be empty"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address"],
        unique:[true,"email already exists."]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password should contain more than 6 characters"],
        select:false
    }


},{timestamps:true});

//middleware, if anytime user data is saved, this will run

userSchema.pre("save",async function() {
    if(!this.isModified("password")){ //using this beacuse userchema is a object
                                        //and acces a key or value in object ,use . or this
        return
    }

    const hash=await bcrypt.hash(this.password,10);

    this.password=hash;
    return;
    
});

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)//comapring the password with hashed pass in db
};

module.exports=mongoose.model("User",userSchema);