const { Schema, model, Types } = require('mongoose');

const { ObjectId } = Types

const messageSchema = new Schema({

    message: {
        type: String,
        required: true,
        trim: true
    },

    user: {
        type: ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Message', messageSchema)