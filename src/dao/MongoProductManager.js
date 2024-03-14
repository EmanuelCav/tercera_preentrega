const Product = require('../model/product');

class ProductDAO {

    async createProducts(product) {

        const result = new Product(product)

        return await result.save()

    }

    async getProducts(limit) {

        const result = await Product.find().limit(limit)

        return result
    }

    async getProductsId(id) {
        const result = await Product.findById(id)

        if (!result) {
            return
        }

        return result
    }

    async removeProduct(id) {

        const product = await Product.findById(id)

        if (!product) {
            return
        }

        const result = await Product.findByIdAndDelete(id)

        return result
    }

    async updateProduct(id, product) {

        const productUpdated = await Product.findById(id)

        if (!product) {
            return
        }

        const result = await Product.findByIdAndUpdate(id, product, {
            new: true
        })

        return productUpdated

    }

}

module.exports = ProductDAO