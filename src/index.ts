import express from "express";
import mongoose from "mongoose";
const {MONGODB_URL} = require("./config")
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json())

app.post("/api/v1/signup", function(req, res){
    const { username, email, passeord } = req.body;
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
    await mongoose.connect( MONGODB_URL )
    app.listen(3000);
    console.log("listening on port 3000")
}

main();