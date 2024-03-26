const jwt = require('jsonwebtoken')

const { jwt_key } = require('../config/config')

const generateToken = (id, role, email) => {
    return jwt.sign({ id, role, email }, `${jwt_key}`, {
        expiresIn: '60d'
    })
}

module.exports = {
    generateToken
}