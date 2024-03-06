const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connectDB');

//config dotenv file
dotenv.config()

//database call 
connectDB()

const app = express();

//  middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// const transectionRoutes = require("./routes/transectionRoutes");

//routes
// app.use('/', (req, res) => {
//     res.send("hello")
// })
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transections', require("./routes/transectionRoutes"));
//port

const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
