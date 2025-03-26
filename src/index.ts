import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MONGODB_URL, JWT_SECRET } from "./config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userModel } from "./db";
dotenv.config();
const app = express();
import 'dotenv/config'
import { middleware } from "./middleware";
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

app.post("/api/v1/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({
        username: username
    })

    if(!user){
        res.json({
            message: "No user with this username"
        })
        return
    }
    if(typeof user.password!= "string"){
        res.json({
            message: "DataType match error"
        })
        return
    }
    const passCheck = await bcrypt.compare(password, user.password)
    if(passCheck){
        const token = jwt.sign({
            id:user._id
        },JWT_SECRET,{expiresIn: "1h"})
        res.json({
            message: "You are successfully logged in",
            token: token
        })
    }else{
        res.status(401).json({
            message: "Incorrect Password"
        })
    }

});

app.post("/api/v1/content", middleware, function(req, res){
    res.json({
        message: "reached",
        id: req.userId
    })
});

app.get("/api/v1/content", middleware, function(req, res){

});

app.delete("/api/v1/content", middleware, function(req, res){

});

app.post("/api/v1/brain/share", middleware, function(req, res){

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