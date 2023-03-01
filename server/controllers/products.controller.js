const {productsService} = require('../services');

const productsController = {
    async addProduct(req, res, next) {
        try {
            const product  = await productsService.addProduct(req.body);
            res.json(product);
        } catch (error) {
            next(error)
        }
    },
    async getProduct(req, res, next) {
        try {
            const product = await productsService.getProductById(req.params.id);
            
            res.json(product);
        } catch (error) {
            next(error)
        }
    },
    async updateProduct(req, res, next) {
        try {
            const product = await productsService.updateProductById(req.params.id, req.body);
            
            res.json(product);
        } catch (error) {
            next(error)
        }
    },
    async deleteProduct(req, res, next) {
        try {
            const product = await productsService.deleteProductById(req.params.id);
            
            res.json(product);
        } catch (error) {
            next(error)
        }
    },
    async getAllProducts(req, res, next) {
        try {
            const products = await productsService.getAllProducts(req);
            
            res.json(products);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productsController;