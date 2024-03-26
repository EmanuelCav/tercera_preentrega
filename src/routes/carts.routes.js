const { Router } = require('express');

const { createCart, getCart, addProductCart, removeProductCart, quantityProductCart, removeAllProducts, purchaseCart } = require('../controller/carts.ctrl');
const { auth } = require('../middleware/auth');

const router = Router()

router.post('/api/carts', auth, createCart)

router.get('/api/carts/:cid', auth, getCart)

router.patch('/api/carts/:cid/products/:pid', auth, addProductCart)

router.delete('/api/carts/:cid/products/:pid', auth, removeProductCart)
router.delete('/api/carts/:cid', auth, removeAllProducts)

router.put('/api/carts/:cid/products/:pid', auth, quantityProductCart)

router.patch('/api/carts/:cid/purchase', auth, purchaseCart)

module.exports = router