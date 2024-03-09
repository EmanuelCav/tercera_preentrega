const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({

    first_name: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Firstname is not valid']
    },

    last_name: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Lastname is not valid']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is not valid'],
        lowercase: true
    },

    age: {
        type: Number
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    cartId: {
        type: Types.ObjectId,
        ref: 'Cart'
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        default: 'user'
    },

    githubId: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)