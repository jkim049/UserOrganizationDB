import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        trim: true
    },
    organizations:{
        type: Array,
        required: false,
        items : {
            type: String,
            unique: true
        }
    }
});

userSchema.index({ firstName: 1 , lastName: 1 }, { unique: true });

const user = mongoose.model("User", userSchema);

export default user;