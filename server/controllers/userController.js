const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const signup = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try {
        const oldUser = await UserModel.findOne({email});
        if (oldUser) {
            return res.status(400).json({message: "User already exists!"});
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName}`
        });
        await newUser.save();
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res.status(201).json({result: newUser, token})

    } catch (e) {
        console.log("Error on Signup", e);
        return res.status(500).json({message: "Something went wrong!"});
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(401).json({message: "Please fill all required fields!"});
    }
    try {
        const oldUser = await UserModel.findOne({email});
        if (!oldUser) {
            return res.status(404).json({message: "User does not exist!"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid Credentials!"});
        }
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res.status(200).json({result: oldUser, token});

    } catch (e) {
        console.log("Error on Sign in", e);
        return res.status(500).json({message: "Something went wrong!"});
    }
}

const googleSignIn = async (req, res) => {
  const {email, name, token, googleId} = req.body;
  try {
      const oldUser = await UserModel.findOne({email});
      if(oldUser){
         const result = {_id: oldUser._id.toString(), email: oldUser.email, name: oldUser.name};
         return res.status(200).json({result, token});
      }
      const result = await UserModel.create({
          email,
          name,
          googleId
      });
      return res.status(200).json({result,token})
  }catch (e) {
      console.log("Error on Google Sign in", e);
      return res.status(500).json({message: "Something went wrong!"});
  }
}

module.exports = {
    signup,
    signin,
    googleSignIn
}