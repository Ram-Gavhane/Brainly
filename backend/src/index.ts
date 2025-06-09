import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MONGODB_URL, JWT_SECRET } from "./config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { contentModel, linkModel, userModel } from "./db";
dotenv.config();
const app = express();
import 'dotenv/config'
import { middleware } from "./middleware";
import { link } from "fs";
import { hashGenerator } from "./hashGenerator";
import cors from "cors";

app.use(cors());
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

app.post("/api/v1/content", middleware, async function(req, res){
    const userId = req.userId;
    const { title, link, type, tags} = req.body;

    await contentModel.create({
        title,
        link,
        type,
        tags,
        userId
    })
    res.json({
        message: "Content Added Successfully"
    })
});

app.get("/api/v1/content", middleware, async function(req, res){
    const userId = req.userId;
    const contents = await contentModel.find({
        userId: userId
    })
    if(contents){
        res.json({
            contents: contents
        })
    }else{
        res.json({
            message: "No content"
        })
    }
});

app.delete("/api/v1/content", middleware, async function(req, res){
    const userId = req.userId;
    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        userId: userId,
        _id: contentId
    })

    res.json({
        message: "Content deleted"
    })
});

app.post("/api/v1/brain/share", middleware, async function(req, res){
    const share = req.body.share;
    const userId = req.userId;
    
    if(share){
        const existingLink = await linkModel.findOne({
            userId: userId
        })
        if(existingLink){
            res.json({
                link: "http://localhost:3000/api/v1/brain/"+existingLink.hash
            })
            return;
        }else{
            const hash = hashGenerator();
            await linkModel.create({
                hash: hash,
                userId: userId
            })
            res.json({
                link: "http://localhost:3000/api/v1/brain/"+hash
            })
        }
    }else{
        await linkModel.deleteOne({
            userId: userId
        })
    }
});

app.get("/api/v1/brain/:shareLink", async function(req, res){
    const hash = req.params.shareLink;
    const link = await linkModel.findOne({
        hash
    })
    if(!link){
        res.json({
            message: "Incorrect Link"
        })
        return;
    }
    const userId = link.userId
    const user = await userModel.findOne({
        _id: userId
    })
    if(!user){
        res.json({
            message: "User doesn't exist"
        })
        return;
    }
    const contents= await contentModel.find({
        userId: userId
    })
    res.json({
        username: user.username,
        contents: contents
    })
});

async function main() {
    await mongoose.connect(MONGODB_URL)
    console.log("Connected")
    app.listen(3000);
    console.log("listening on port 3000")
}

main();