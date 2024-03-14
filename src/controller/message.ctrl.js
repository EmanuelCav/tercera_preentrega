const MessageDAO = require('../dao/MongoMessageManager');

const messageDAO = new MessageDAO()

const createMessages = async (req, res) => {

    const { message } = req.body

    try {

        const showMessage = await messageDAO.createMessage(req.user._id, message)

        return res.status(200).json(showMessage)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const getAllMessages = async (req, res) => {

    try {

        const messages = await messageDAO.getMessages()

        return res.status(200).json(messages)

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    createMessages,
    getAllMessages
}