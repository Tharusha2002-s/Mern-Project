import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    prooductId : {
        type : String,
        unique : true,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    description : 
    {
        type: String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    labelledPrice : {
        type : Number,
        required : true
    },
    Image :{
        type : [String],
        required : true
    },
    category : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        requied : true,
        default : 0
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
})

const product = mongoose.model("Product", productSchema);
export default product;