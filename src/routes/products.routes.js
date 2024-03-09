const { Router } = require('express');

const { upload } = require('../lib/images');

const { products, productGet, productCreate, productUpdate, productDelete } = require('../controller/products.ctrl');
const { auth, admin } = require('../middleware/auth');

const router = Router()

router.get('/api/products', products)
router.get('/api/products/:pid', productGet)

router.post('/api/products', [auth, admin], upload.array("files", 10), productCreate)

router.put('/api/products/:pid', [auth, admin], productUpdate)

router.delete('/api/products/:pid', [auth, admin], productDelete)

module.exports = router

