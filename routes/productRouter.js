import express from 'express';
import { createProduct, deleteProduct, getProducts,updateProduct,getProductById } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:trending', (req,res)=>{
    res.json({
        message: 'Trending products endpoint is under construction'
    })
});
productRouter.post('/', createProduct);
productRouter.get('/:productID', getProductById);
productRouter.delete('/:productID',deleteProduct )
productRouter.put('/:productID',updateProduct )

export default productRouter;