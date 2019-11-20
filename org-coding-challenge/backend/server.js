import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import orgRouter from "./routes/organizations.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 50000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri, {useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () =>{
    console.log("Database connection successfully established!");
});

app.use('/users', userRouter);
app.use('/organizations', orgRouter);

app.listen(port, () => {
    console.log(`Service running on port ${port}`);
});