import mongoose, { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    username: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: String
});
 
const contentTypes: string[] = ['image','video','article'];
const contentSchema = new Schema({
    title: {type:String, required:true},
    link: {type: String, required:true},
    type: {type:String, enum:contentTypes, required:true},
    tags: [{type: Types.ObjectId, ref: 'Tags' }],
    userId: {type: Types.ObjectId, ref: 'Users', required: true },
});

const tagsSchema = new Schema({
    title: {type:String, required:true, unique:true}
});

const linkSchema = new Schema({
    hash: {type:String, required:true},
    userId: {type:Types.ObjectId, ref:"Users", required:true}
})

export const userModel = model("Users",userSchema);
export const contentModel = model("Content",contentSchema);
export const linkModel = model("Link",linkSchema);
export const tagsModel = model("Tags",tagsSchema);