import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength: [2, 'Name must be at least 2 characters long'],
        maxLength: [30, 'Name must be at most 30 characters long'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength: [50, 'Email must be at most 50 characters long'],
    },
    password:{
        type:String,
        select:false,
        required:true,
    },
    avatarUrl:{
        type:String,
        default:""
    }

})

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign(
        { _id: this._id, email: this.email}, 
        process.env.JWT_SECRET,
        {expiresIn:'10h'});
}

const User = mongoose.model('user', userSchema);
export default User;