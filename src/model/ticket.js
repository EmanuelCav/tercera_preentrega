const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({

    code: {
        type: string,
        required: true,
        unique: true,
        trim: true
    },

    purchase_datetime: Date,

    amount: Number,
    
    purchaser: String

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Ticket', ticketSchema)