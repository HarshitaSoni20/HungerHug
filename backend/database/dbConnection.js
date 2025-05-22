import mongoose from "mongoose"
export const dbConnection =()=>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbname:"prtFullhaina",
    })
    .then(()=>{
        console.log("Connected to Database Successfully")
    })
    .catch((err)=>{
        console.log(`some error occured while connecting to Database ${err}`)
    });
};