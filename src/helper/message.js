const nodemailer = require('nodemailer')

const { my_host, my_mail, my_pass } = require('../config/config')

const transport = nodemailer.createTransport({
    host: my_host,
    port: 587,
    secure: false,
    auth: {
        user: my_mail,
        pass: my_pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

const infoEmail = async (email) => {

    try {

        await transport.sendMail({
            from: `'EMAILS' ${my_mail}`,
            to: email,
            subject: "eCommerce",
            html: "<b>¡Welcome to eCommerce!</b>"
        })
        
    } catch (error) {
        throw (error)
    }

}

module.exports = infoEmail
    