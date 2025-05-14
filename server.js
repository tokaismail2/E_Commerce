const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');



// Load environment variables from config.env
dotenv.config({ path: 'config.env' });


//import
const ApiError = require('./utils/ApiError');
const globalError = require('./middele wares/errorHandling')
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');


//connection to db
dbConnection();


//express app
const app = express();


// Middleware to parse JSON body
app.use(express.json()); 

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`)
}


//routes
app.use('/api/v1/categories' , categoryRoute )

app.all('*',(req,res,next)=>{
next(new ApiError(`can't find this route ${req.originalUrl}` , 400))
});

//global error handling middleware in express

app.use(globalError);
 


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//handling error outside express
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', {
        message: err.message,
        stack: err.stack,
    });
    server.close(() =>{
        console.log("shutting down...");
        process.exit(1); // Exit to prevent inconsistent state
    });

});
