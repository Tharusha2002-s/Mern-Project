import product from '../models/Product.js';
import Product from '../models/Product.js';
import { isAdmin } from './userController.js';

// Create a new product
export function createProduct(req, res)  {
    
    if(!isAdmin(req)){
        res.status(403).json({
            message: 'Forbidden: Only admins can create products',
        });
        return;
    }

    const product = new Product(req.body)
    product.save().then(
        () => {
            res.json({
                message: 'Product created successfully'
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: 'Error creating product',
                error: error.message
            })
        }
    );
}

//get products

export function getProducts(req, res) {
    if(isAdmin(req)){
    Product.find().then(
        (products) => {
            res.json(products);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: 'Error fetching products',
                error: error.message
            })
        }
    );
    }else{
        Product.find({ isAvailable: true }).then(
            (products) => {
                res.json(products);
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    message: 'Error fetching products',
                    error: error.message
                })
            }
        );  
    }
}

export function deleteProduct(req, res) {
    if(isAdmin(req)){
        res.status(403).json({
            message:"Only admin can delete products"
        })
        return
    }

    const productID = req.params.productID

    product.deleteOne({prooductId:productID}).then(
        ()=>{
            res.json({
                message: "Product deleted successfully"
            })
        }
    )
    
}

export function updateProduct(req, res) {
    if(isAdmin(req)){
        res.status(403).json({
            message:"Only admin can update products"
        })
        return
    }

    const productID = req.params.productID

    product.updateOne({prooductId:productID}, req.body).then(
        ()=>{
            res.json({
                message: "Product updated successfully"
            })
        }
    )
    
}

export function getProductById(req, res) {
    const productID = req.params.productID

    product.findOne({prooductId:productID}).then(
        (product) => {
            if(product){
                res.json(product);
            }
            else{
                res.status(404).json({
                    message: 'Product not found'
                })
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: 'Error fetching product',
                error: error.message
            })
        }
    );
}
