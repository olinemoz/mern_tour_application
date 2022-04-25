const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const dbConnection = require('./config/dbConnect')
const dotenv = require('dotenv').config();
const routes = require('./routes/index')


//Middlewares
app.use([cors(),morgan("dev"),express.json({limit: "30mb", extended: true}),express.urlencoded({limit: "30mb", extended: true})])

//Routes Integration
app.use(routes)

app.get('/', (req, res) => {
    res.json({message: 'Hello Tour App!'})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server Running on PORT:",PORT);
})