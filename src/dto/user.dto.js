class RegisterDTO {

    constructor(data) {
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.phone = data.phone
        this.password = data.password
        this.role = data.role
    }

}

class UserDTO {
    constructor(data) {
        this.firstname = data.firstname
        this.lastname = data.lastname
    }
}

module.exports = {
    RegisterDTO,
    UserDTO
}