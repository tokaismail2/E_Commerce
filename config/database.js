const mongoose = require('mongoose');


const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log("connected to database")
    })
    // .catch((err)=>{
    //     // console.log("database error")
    // })}
}

    module.exports = dbConnection;