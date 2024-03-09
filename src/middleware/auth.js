const jwt = require('jsonwebtoken');

const { jwt_key } = require('../config/config');

const auth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(500).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(500).json({ message: "Token is not valid" })
    }

    req.user = verification

    next()

}

const admin = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(500).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(500).json({ message: "Token is not valid" })
    }

    req.user = verification

    if(req.user.role !== 'admin') {
        return res.status(500).json({ message: "You must be admin" })
    }

    next()

}

module.exports = {
    admin, 
    auth
}