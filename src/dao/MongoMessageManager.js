const { MessageDTO } = require('../dto/message.dto');

const Message = require('../model/message');

class MessageDAO {

    async createMessage(user, message) {

        const newMessage = new Message(new MessageDTO({
            user,
            message
        }))

        return await newMessage.save()

    }

    async getMessages() {

        return await Message.find()

    }

}

module.exports = MessageDAO