const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI
mongoose.connect(String(URI), () => {
    console.log("MONGODB DATABASE CONNECTED!!!")
})