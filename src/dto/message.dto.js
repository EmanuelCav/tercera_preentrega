class MessageDTO {

    constructor(data) {
        this.message = data.message
        this.user = data.user
    }

}

module.exports = {
    MessageDTO
}