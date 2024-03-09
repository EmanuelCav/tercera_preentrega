const User = require('../model/user');

class UserDAO {

    async getUsers(limit) {

        const result = await User.find().limit(limit)

        return result

    }

}

module.exports = UserDAO