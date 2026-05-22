import Product from '../models/product.model.js'; 
import mongoose from 'mongoose';      

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();  
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({message: 'Server Error'});
    }
};
export const createProduct = async (req, res) => {
    const products = req.body;// user will send the data in the body of the request, we will get it using req.body

    if(!products.name || !products.price || !products.image){
        return res.status(400).json({message: 'Please provide all the required fields'});
    }
    const newProduct = new Product(products);

    try {
    await newProduct.save();
    res.status(201).json({success : true, data :newProduct});
    } catch (error) {
        console.error("Error creating Products: ", error);
        res.status(500).json({message: 'Server Error'});
    }

    
};
export const updateProduct =  async (req, res) => {
    const {id} = req.params;
    //const updates = req.body;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: 'Invalid product ID'});
    }   

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: 'Product updated successfully'});
    } catch (error) {
        console.error("Error updating product: ", error);
        res.status(404).json({success: false, message: 'Product not found'});
    }
    
}; 
export const deleteProduct = async (req, res) => {
    const {id} = req.params
    console.log("id: ", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: 'Invalid product ID'});
    } 

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.error("Error deleting product: ", error);

        res.status(500).json({success: false, message: 'Server Error '});
    }   
};