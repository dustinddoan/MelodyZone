const { Product } = require("../models/product")
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');

const addProduct = async(body) => {
    try {
        console.log('DUSTIN body: ', body)
        const product = new Product({
            ...body
        })
        await product.save();
        console.log('DUSTIN product: ', product)

        return product;
    } catch (error) {
        throw error;
    }
}


const getProductById = async(id) => {
    try {
        console.log('DUSTIN id: ', id)
        const product = await Product.findById(id).populate('brand')
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return product;
    } catch (error) {
        throw error;
    }
}

const updateProductById = async(_id, body) => {
    try {
        console.log('DUSTIN', )
        const product = await Product.findOneAndUpdate(
            {_id},
            {"$set": body},
            {new: true}
        )
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return product;
    } catch (error) {
        throw error;
    }
}

const deleteProductById = async(id) => {
    try {
        const product = await Product.findByIdAndRemove({_id:id});
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return product;
    } catch (error) {
        throw error;
    }
}


const getAllProducts = async(req) => {
    try {
    
        const products = await Product
        .find({})
        .populate('brand')
        .sort([
            ['_id', req.body.order]
        ])
        .limit(req.query.limit)


        if (!products) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return products;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts
}