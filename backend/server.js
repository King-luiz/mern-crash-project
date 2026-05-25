//const express = require('express');
import express from 'express';
import path from 'path';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';


dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")) );  

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
// postman desktop application
app.listen(PORT, () =>{
    connectDB();
    console.log('server started at http://localhost:' + PORT);
});

