import express from "express";
import mongoose from "mongoose";
const {MONGODB_URL} = require("./config")
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userModel } from "./db";
dotenv.config();
const app = express();

app.use(express.json())

app.post("/api/v1/signup", async function(req, res){
    const { username, email, password } = req.body;

    await userModel.create({
        username:username,
        email:email,
        password:password
    })

    res.json({
        message: "You are signed up"
    })
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
    await mongoose.connect("mongodb+srv://DB1-practice:R5Y71dLhNLahIA3r@cluster0.gpxo7.mongodb.net/Brainly")
    console.log("Connected")
    app.listen(3000);
    console.log("listening on port 3000")
}

main();