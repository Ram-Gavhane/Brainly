import express from "express";
import mongoose from "mongoose";
import { MONGODB_URL, JWT_SECRET } from "./config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userModel } from "./db";
dotenv.config();
const app = express();
import 'dotenv/config'
app.use(express.json())

app.post("/api/v1/signup", async function(req, res){
    const { username, email, password } = req.body;

    
    const user = await userModel.findOne({
        email:email
    })

    if(user){
        res.status(403).json({
            message: "User with this email already exists"
        })
    }else{
        const hashedpass = await bcrypt.hash(password, 5);
        await userModel.create({
            username:username,
            email:email,
            password:hashedpass
        })

        res.json({
            message: "You are signed up"
        })
    }
});

app.post("/api/v1/login", function(req, res){

});

app.post("/api/v1/content", function(req, res){

});

app.get("/api/v1/content", function(req, res){

});

app.delete("/api/v1/content", function(req, res){

});

app.post("/api/v1/brain/share", function(req, res){

});

app.get("/api/v1/brain/:shareLink", function(req, res){

});

async function main() {
    await mongoose.connect(MONGODB_URL)
    console.log("Connected")
    app.listen(3000);
    console.log("listening on port 3000")
}

main();