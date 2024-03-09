const Product = require('../model/product')

const MongoProductManager = require('../dao/MongoProductManager');
const { ProductDTO } = require('../dto/product.dto');

const ProductManager = new MongoProductManager()

const products = async (req, res) => {

    const { limit } = req.query

    try {

        const result = await ProductManager.getProducts(limit)

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productGet = async (req, res) => {

    const { pid } = req.params

    try {

        const result = await ProductManager.getProductsId(pid)

        if(!result) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productCreate = async (req, res) => {

    const { title, description, code, price, status, stock, category } = req.body

    try {

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ message: "There are empty fields" })
        }

        let routeImages = []

        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                routeImages.push(req.files[i].path)
            }
        }

        const result = await ProductManager.createProducts(new ProductDTO({
            title,
            description,
            code,
            price,
            status: status === undefined ? true : status,
            stock,
            category,
            thumbnails: req.files ? routeImages : []
        }))

        return res.status(200).json({
            message: "Product added successfully",
            product: result
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productUpdate = async (req, res) => {

    const { pid } = req.params

    try {

        const result = await ProductManager.updateProduct(pid, req.body)

        if(!result) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json({
            message: "Product updated succesfully",
            product: result
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const productDelete = async (req, res) => {

    const { pid } = req.params

    try {
        
        const result = await ProductManager.removeProduct(pid)

        if(!result) {
            return res.status(400).json({ message: "Product does not exists" })
        }

        return res.status(200).json({ message: "Product removed sucessfully" })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    products,
    productGet,
    productCreate,
    productUpdate,
    productDelete
}