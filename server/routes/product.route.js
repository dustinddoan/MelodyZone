const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const auth = require('../middleware/auth');
const {addProductValidator} = require('../middleware/validation');

router.post('/', auth('createAny', 'product'), addProductValidator, productsController.addProduct);
router.route('/product/:id')
.get(productsController.getProduct)
.patch(auth('updateAny', 'product'), productsController.updateProduct)
.delete(auth('deleteAny', 'product'), productsController.deleteProduct)

router.get('/all', productsController.getAllProducts)

module.exports = router;