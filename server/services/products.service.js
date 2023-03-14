const { Product } = require("../models/product")
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2
require('dotenv').config

cloudinary.config({
    cloud_name:'dtboetp4o',
    api_key: '583551269677131',
    api_secret: `${process.env.CLOUDINARY_SECRET}`
})

const addProduct = async(body) => {
    try {
        const product = new Product({
            ...body
        })
        await product.save();

        return product;
    } catch (error) {
        throw error;
    }
}


const getProductById = async(id) => {
    try {
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
            [req.query.sortBy, req.query.order]
        ])
        .limit(parseInt(req.query.limit))


        if (!products) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
        }
        return products;
    } catch (error) {
        throw error;
    }
}

const paginateProducts = async(req) => {
    try {
    
        let aggQueryArray = []
        
        // model
        if (req.body.keywords && req.body.keywords != '') {
            const re = new RegExp(`${req.body.keywords}`, 'gi')
            aggQueryArray.push({
                $match: {model: {$regex: re}}
            })
        }

        
        // brand: keywords sometime return more than one brand
        if (req.body.brand && req.body.brand.length > 0) {
            console.log('req.body.brand: ', req.body.brand)

            const newBrandArray = req.body.brand.map(item => (
                mongoose.Types.ObjectId(item)
            ));
            console.log('DUSTIN:newBrandArray: ', newBrandArray)

            
            aggQueryArray.push({
                $match: {brand: {$in: newBrandArray}} // search in Array
            })
        }

        //frets
        if(req.body.frets && req.body.frets.length > 0){
            aggQueryArray.push({
                $match:{ frets: { $in: req.body.frets }}
            });
        }

        // price in range
        if (req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000) {
            if (req.body.min) {
                aggQueryArray.push({
                    $match:{ price: { $gt: req.body.min }}
                });
            }
            if (req.body.max) {
                aggQueryArray.push({
                    $match:{ price: { $lt: req.body.max }}
                });
            }
        }

        // add poppulate
        aggQueryArray.push(
            {
                $lookup: {
                    from: "brands", //database,
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
                
            },
            {
                $unwind: '$brand'
            }
        )

        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page: req.body.page,
            limit: 6,
            sort: {date: 'desc'}
        }

        const products = await Product.aggregatePaginate(aggQuery, options);
        return products;
    } catch (error) {
        throw error;
    }
}

const picUpload = async(req) => {
    try {
        const upload = await cloudinary.uploader.upload(req.files.file.path,{
            public_id: `${Date.now()}`,
            folder: 'ebike_upload'
        })
        return {
            public_id: upload.public_id,
            url: upload.url
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
    paginateProducts,
    picUpload
}