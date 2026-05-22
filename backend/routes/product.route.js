import express from "express";
import { getProducts } from "../controlers/product.controler.js";

import { createProduct ,deleteProduct, updateProduct} from "../controlers/product.controler.js";

const router = express.Router();

router.get(' /', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete(':id', deleteProduct);

export default router;
