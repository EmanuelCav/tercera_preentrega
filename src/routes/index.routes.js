const { Router } = require('express');

const Product = require('../model/product')
const Cart = require('../model/cart')

const {auth} = require('../middleware/auth');

const router = Router()

router.get('/products', auth, async (req, res) => {

    const { limit = 10 } = req.query

    const products = await Product.find().limit(limit).lean()

    res.render('products', {
        layout: 'home',
        products: products,
        message: welcomeMessage
    })
})

router.get('/carts/:cid', auth, async (req, res) => {

    const { cid } = req.params

    const cart = await Cart.findById(cid).lean()

    if (!cart) {
        return res.status({ message: "Cart does not exists" })
    }

    res.render('cartId', {
        layout: 'home',
        cart
    })
})

router.get('/login', (req, res) => {

    res.render('login', {
        layout: 'home'
    })

})

router.get('/register', (req, res) => {

    res.render('register', {
        layout: 'home'
    })

})

router.get('/logout', (req, res, next) => {

    req.logout(function (err) {
        if (err) return next(err)
        res.redirect('/login');
    });

})

module.exports = router