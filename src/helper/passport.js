const passport = require('passport');
const { Twilio } = require('twilio');
const { Strategy } = require('passport-local');
const GithubStrategy = require('passport-github2')
const bcryptjs = require('bcryptjs')

const User = require('../model/user');
const { RegisterDTO } = require('../dto/user.dto');

const { github_client_id, github_client_secret, account_sid, auth_token, phone_number } = require('../config/config');

const infoEmail = require('../helper/message');

const { generateToken } = require('../helper/token');

const client = new Twilio(account_sid, auth_token)

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (email, password, done) => {

    if (!email || !password) {
        return done(null, false, {
            message: "There are empty fields"
        })
    }

    const user = await User.findOne({ email })

    if (!user) {
        return done(null, false, {
            message: "User does not exists"
        })
    }

    const verifyPassword = await bcryptjs.compare(password, user.password)

    if (!verifyPassword) {
        return done(null, false, {
            message: "Fields do not match"
        })
    }

    const token = generateToken(user._id, user.role, user.email)

    req.logIn(user, {
        session: false
    }, (err) => {
        done(null, err)
    })

    const userData = {
        token,
        user
    }

    return done(null, userData, {
        message: "¡Welcome!"
    })

}))

passport.use("register", new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    if (!email || !password) {
        return done(null, false, {
            message: "There are empty fields"
        })
    }

    if (password.length < 6) {
        return done(null, false, {
            message: "The password must have at least 6 charactes"
        })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        return done(null, false, {
            message: "The email is already registered"
        })
    }

    const salt = await bcryptjs.genSalt(8)
    const hash = await bcryptjs.hash(password, salt)

    const newUser = new User(new RegisterDTO({
        firstname,
        lastname,
        email,
        phone,
        password: hash,
        role: role && role
    }))

    const userSaved = await newUser.save()

    const user = await User.findById(userSaved._id).select("-password")

    if (!user) {
        return done(null, false, {
            message: "User does not exists"
        })
    }

    req.logIn(user, {
        session: false
    }, (err) => {
        done(null, err)
    })

    const token = generateToken(user._id, user.role, user.email)

    req.flash("welcome", `¡Welcome ${user.firstname} ${user.lastname} with email ${user.email}! Enjoy our products`)

    await infoEmail(email)

    await client.messages.create({
        to: phone,
        from: phone_number,
        body: "Welcome to eCommerce!"
    })

    const userData = {
        token,
        user
    }

    return done(null, userData, {
        message: "¡Welcome!"
    })

}))

passport.use("current", new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {


    const user = await User.findById(req.user.id)

    return done(null, user)

}))

passport.use("github", new GithubStrategy.Strategy({
    clientID: `${github_client_id}`,
    clientSecret: `${github_client_secret}`,
    callbackURL: "http://127.0.0.1:4000/auth/github/callback"
}, async function (accessToken, refreshToken, profile, cb) {

    const user = await User.findOne({ githubId: profile.id });

    if (user) {
        return cb(null, profile)
    }

    const salt = await bcryptjs.genSalt(8)
    const password = await bcryptjs.hash(profile.nodeId, salt)

    const newUser = new User({
        githubId: profile.id,
        firstname: profile.displayName.split(" ")[0],
        lastname: profile.displayName.split(" ")[1],
        email: `${String(profile.username).toLowerCase()}@gmail.com`,
        password,
        role: 'usuario'
    })

    const userSaved = await newUser.save()

    return cb(null, userSaved)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    User.findById(id).then((data) => {
        done(null, data)
    }).catch((err) => {
        done(err, false)
    })
})