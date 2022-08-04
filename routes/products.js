const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/productsCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/products')
    .get(productsCtrl.getProducts)
    .post(auth, authAdmin, productsCtrl.createProduct)


router.route('/products/:id')
    .delete(auth, authAdmin, productsCtrl.deleteProduct)
    .put(auth, authAdmin, productsCtrl.updateProduct)

module.exports = router ;