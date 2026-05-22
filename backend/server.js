//const express = require('express');
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';


dotenv.config();
const app = express();
app.use("/api/products", productRoutes);
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 5000;
// postman desktop application
app.listen(PORT, () =>{
    connectDB();
    console.log('server started at http://localhost:' + PORT);
});

