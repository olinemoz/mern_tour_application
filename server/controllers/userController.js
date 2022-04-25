const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const signup = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    if (!email || !password || !firstName || !lastName) {
        return res.status(401).json({message: "Please fill all required fields!"});
    }
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
        return res.status(201).json({newUser, token})

    } catch (e) {
        console.log("Error on Signup");
        return res.status(500).json({message: "Something went wrong!"});
    }
}



module.exports = {
    signup
}