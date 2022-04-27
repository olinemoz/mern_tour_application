const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decodedData: ",decodedData)
            req.userId = decodedData._id;
        }else {
            decodedData = jwt.decode(token);
            const googleId = decodedData?.sub.toString();
            // console.log("Else decodedData: ",decodedData)
            const user = await UserModel.findOne({googleId});
            req.userId = user?._id
        }
        next();
    }catch (e) {
        console.log(e)
    }
}

module.exports = auth;