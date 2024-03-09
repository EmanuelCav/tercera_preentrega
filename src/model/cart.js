const { Schema, model, Types } = require('mongoose');

const { ObjectId } = Types

const cartSchema = new Schema({

    products: [{
        type: ObjectId,
        ref: 'ProductCart'
    }],

    user: {
        type: ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Cart', cartSchema)