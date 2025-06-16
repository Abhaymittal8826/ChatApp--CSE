import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

//register user
export const signup = async(req,res)=>{
    const { email, fullName,password,bio } = req.body;

    try {
        if(!fullName || !email || !password ||!bio){
            return res.json({success:false, message:"Missing details"})
        }

        const user=await User.findOne({email})
        if(user){
            return res.json({success:false, message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        })

        const token = generateToken(newUser._id)

        res.json({success:true,userData : newUser,token, message:"Account Created Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}



//login user
export const login = async(req,res)=>{
    const {email, password} =req.body;

    try {
        //no user exists
        const user=await User.findOne({email})
        if(!user){
            return res.json({success:false, message:"User does not exists."});
        }

        //for incorrect password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.json({success:false, message:"Incorrect password"});
        }

        //for correct password
        const token = generateToken(user._id)

        res.json({success:true, user, token, message:"Login Successful"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})        
    }
}


//controller to check if user is authenticated
export const checkAuth =async(req,res)=>{
    res.json({success:true, user:req.user})
}
 

//controller to user to update their profile
export const updateProfile = async(req,res)=>{
    try {
        const {profilePic, fullName, bio} =req.body;

        const userId= req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId,{bio, fullName},{new: true});
        }
        else{
            const upload= await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId,{profilePic: upload.secure_url, bio, fullName}, {new: true});
        }
        res.json({success:true, user: updatedUser})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}