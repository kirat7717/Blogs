import mongoose, { model, Schema } from "mongoose";

const adminSchema = new Schema({
    username : {
        type : String,
        default : null
    },
    email : {
        type : String,
        default : null
    },
    password : {
        type : String,
        default : null
    }
},{timestamps:true})

const Admin =  model("Admin",adminSchema);

export default Admin