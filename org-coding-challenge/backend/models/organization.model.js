import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orgSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    users:{
        type: Array,
        required: false,
        items : {
            type: String,
            unique: true
        }
    }
});

const Organization = mongoose.model("Organization", orgSchema);

export default Organization;