
// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config({
    path: './.env'
})
connectDB()













/*
(async () => {
    try {
     await   mongoose.connect(`${process.env.MONGDB_URL}/
            ${DB_NAME}`);
            app.on("error", (error)=> {
                console.log("error:", error);
                throw error;
            });
            app.listen(process.env.PORT, () =>{
                console.log(`app is listing on port : ${process.env.PORT}`);
                
            })
    } catch (error) {
        console.error("ERROR",error);
        throw error;
    }
})()
    */ 