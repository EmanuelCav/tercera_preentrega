const MongoCartManager = require('../dao/MongoCartManager');

const CartManager = new MongoCartManager()

const createCart = async (req, res) => {

    try {

        const result = await CartManager.createCart(req.user._id)

        return res.status(200).json({
            message: "Cart added successfully",
            cart: result
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getCart = async (req, res) => {

    const { cid } = req.params

    try {    

        const result = await CartManager.getCartById(cid)
    
        if (!result) {
            return res.status(400).json({ message: "Cart does not exists" })
        }
    
        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error.message)
    }


}

const addProductCart = async (req, res) => {

    const { quantity } = req.body
    const { cid, pid } = req.params

    const result = await CartManager.addProduct(quantity, cid, pid)

    if(!result) {
        return res.status(400).json({ message: "Product or cart does not exists" })
    }

    return res.status(200).json({
        message: "Product added successfully",
        cart: result
    })
}

const removeProductCart = async (req, res) => {

    const { cid, pid } = req.params

    const result = await CartManager.removeProductFromCart(cid, pid)

    if (!result) {
        return res.status(400).json({ message: "Product or cart does not exists" })
    }

    return res.status(200).json({
        message: "Product removed successfully"
    })

}

const quantityProductCart = async (req, res) => {

    const { cid, pid } = req.params
    const { quantity } = req.body

    const result = await CartManager.updateQuantityProducts(quantity, cid, pid)

    if (!result) {
        return res.status(400).json({ message: "Product or cart does not exists" })
    }

    return res.status(200).json({
        message: "Quantity updated successfully",
        cart: result
    })

}

const removeAllProducts = async (req, res) => {

    const { cid } = req.params

    const result = CartManager.removeAllProductsFromCart(cid)

    if (!result) {
        return res.status(400).json({ message: "Cart does not exists" })
    }

    return res.status(200).json({
        message: "Products removed successfully"
    })

}

const purchaseCart = async (req, res) => {

    const { cid } = req.params

    const result = CartManager.purchaseCartProducts(cid)

    if(!result) {
        return res.status(400).json({ message: "Error to generate ticket" })
    }

    return res.status(200).json(result)

}

module.exports = {
    createCart,
    getCart,
    addProductCart,
    removeProductCart,
    quantityProductCart,
    removeAllProducts,
    purchaseCart
}