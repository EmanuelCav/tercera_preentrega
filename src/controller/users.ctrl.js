const passport = require('passport');

const MongoUserManager = require('../dao/MongoUserManager');

const userManager = new MongoUserManager()

const users = async (req, res) => {

    try {

        const result = await userManager.getUsers()

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const login = passport.authenticate('login', {
    successRedirect: '/',
    session: false
})

const register = passport.authenticate('register', {
    failureRedirect: '/register',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})

module.exports = {
    users,
    login,
    register
}