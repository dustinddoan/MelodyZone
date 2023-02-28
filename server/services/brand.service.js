const {Brand} = require('../models/brand');
const ApiError =  require('../middleware/apiError');
const httpStatus = require('http-status');

const addBrand = async(brandname) => {
    try {
        const brand = new Brand({
            name: brandname
        })

        await brand.save();
        return brand;
    } catch (error) {
        throw error
    }

}
const getBrandById = async(brandId) => {
    try {
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
        }
        return brand;
    } catch (error) {
        throw error
    }

}

const deleteBrandById = async(brandId) => {
    try {
        const brand = await Brand.findByIdAndRemove(brandId);
    
        return brand;
    } catch (error) {
        throw error
    }

}

const getAllBrands = async(args) => {
    try {
        let order = args.order ? args.order : 'asc';
        let limit = args.limit ? args.limit : 10;

        const brands = await Brand
        .find({})
        .sort([
            ["_id",order]
        ])
        .limit(limit)
        if (!brands) throw new ApiError(httpStatus.NOT_FOUND, 'Brands no found')
    
        return brands;
    } catch (error) {
        throw error
    }

}
    
module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    getAllBrands
}