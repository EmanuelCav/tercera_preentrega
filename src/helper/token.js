const jwt = require('jsonwebtoken')

const { jwt_key } = require('../config/config')

const generateToken = (id, role, email) => {
    jwt.sign({ id, role, email }, `${jwt_key}`, {
        expiresIn: '7d'
    })
}

module.exports = {
    generateToken
}