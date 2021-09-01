import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true,},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    location:{type:String},
});

userSchema.pre('save', async function(){
    console.log(this.password);
   this.password = await bcrypt.hash(this.password, 3);
   console.log(this.password);
   //middleware이기 떄문에 return 하면 안된다.
});

const User = mongoose.model("User", userSchema);
export default User;