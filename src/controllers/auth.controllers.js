const userModel = require("../models/user.model");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");


async function registerUserController(req,res){

    const { username , email , password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message : "Please provide username , email and passsword"
        });
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or : [ {username}, {email} ]
    });

    if(isUserAlreadyExists){
        return res.status(400).json({
            message : "user already exists with this email address or username"
        });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password : has
    });
    const token =jwt.sign(
        {id : user._id, usesrname : user.username},
        process.env.JWT_SECRET,
        {expreiesIn : "1d"}
    )

    res.cookie("token", token);

    res.status(201).json({
        message :"user registered sucessfully",
        user: {
            id : user._id,
            username : user.username,
            email :email.email 
        }
    });
    
}

async function loginUserController(req,res) {

    const { email , password } =req.body;

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(400).json({
            message :"invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }
    const token = jwt.sign(
        { id : user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn :"1d"}
    )

    res.cookie("token" ,token)
    res.status(200),json({
        message : "user loggedin successfully",
        user: {
            id: user._id,
            username : user.username,
            email :user.email

        }

    })

}

module.exports = {
    registerUserController
}