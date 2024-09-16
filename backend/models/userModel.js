const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    googleId: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    password: {
        type: String
    },
    bagData: {
        type: Object,
        default: {}
    },
    addresses: {
        type: Object,
        default: []
    },
    ordersId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, { minimize: false })

userSchema.statics.signup = async function ({ name, lastName, email, password }) {

    if (!name || !lastName || !email || !password) {
        throw Error('All fields must be filled in!')
    }

    if (password.length < 6) {
        throw Error('Password must be more than 6 characters long!')
    }

    const isExist = await this.findOne({ email })

    if (isExist) {
        throw Error('This user already exists!')
    }

    const ordersId = uuidv4()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ name, lastName, email, password: hashedPassword, ordersId })

    return user

}

userSchema.statics.signin = async function ({ email, password }) {

    if (!email || !password) {
        throw Error('All fields must be filled in!')
    }

    if (password.length < 6) {
        throw Error('Password must be more than 6 characters long!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('This user was not found!')
    }

    if (user.googleId) {
        throw Error('This account is linked with Google')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password!')
    }

    return user

}

userSchema.statics.googleAuth = async function ({ email, given_name, family_name, sub }) {

    const user = await this.findOne({ email })

    if (!user) {
        console.log(family_name)
        const newUser = await this.create({ 
            name: given_name,
            lastName: family_name || "",
            googleId: sub,
            email,
            ordersId: uuidv4()
        })

        return newUser
    }

    if (!user.googleId) {
        throw new Error('This email is already use')
    }

    return user
}

userSchema.statics.updatePassword = async function ({ email, password, newPassword }) {

    if (!password || !newPassword) {
        throw Error('All fields must be filled in!')
    }

    if (password === newPassword) {
        throw Error('Passwords must be diffrent')
    }

    if (newPassword.length < 6) {
        throw Error('Password must be more than 6 characters long!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect current password!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const updatedUser = await this.findOneAndUpdate({ email }, { password: hashedPassword })

    return updatedUser

}

userSchema.statics.updateName = async function (id, newName, newLastname) {

    const { name, lastName } = await this.findOne({ _id: id })

    if (!newName && !newLastname) {
        throw Error('All fields must be filled in!')
    }

    if ((name === newName) && (lastName === newLastname)) {
        throw Error('Name and Lastname must be diffrent')
    }

    const user = await this.findOneAndUpdate(id,
        {
            name: newName ? newName : name,
            lastName: newLastname ? newLastname : lastName
        },
        { new: true }
    )

    return user

}

userSchema.statics.updatePhone = async function (id, phone) {

    if (!phone) {
        throw Error('All fields must be filled in!')
    }

    const phoneRegex = /^\+375\d{9}$/

    if (!phoneRegex.test(phone)) {
        throw Error('Invalid phone number format!')
    }

    const isExist = await this.findOne({ phone })

    if (isExist) {
        throw Error('This phone number is already in use!')
    }

    const user = await this.findOneAndUpdate(id, { phone }, { new: true })

    return user

}

userSchema.statics.addAddress = async function ({ userId, street, house, flat }) {

    if (!userId || !street || !house) {
        throw Error('All fields must be filled in!')
    }

    // const userPhone = await this.findOne({ phone }).select('phone')

    // const phoneRegex = /^\+375\d{9}$/

    // if (!phoneRegex.test(phone)) {
    //     throw Error('Invalid phone number format!')
    // }

    // if (userPhone) {
    //     if (userId.toString() !== userPhone._id.toString()) {
    //         throw Error('This phone number is already in use!')
    //     }
    // }

    const address = {
        _id: uuidv4(),
        street,
        house,
        flat: flat ? flat : ''
    }

    const { addresses } = await this.findOne({ _id: userId }).select('addresses')
    await this.findOneAndUpdate(userId, { addresses: [...addresses, address] })

    return address

}

userSchema.statics.removeAddress = async function ({ userId, addressId }) {

    if (!userId || !addressId) {
        throw Error('All fields must be filled in!')
    }

    const { addresses } = await this.findOne({ _id: userId }).select('addresses')
    const addressToRemove = addresses.find(item => item._id === addressId)

    if (!addressToRemove) {
        throw Error('Address not found!')
    }

    const newAddresses = addresses.filter(item => item._id !== addressId)

    await this.findOneAndUpdate({ _id: userId }, { addresses: newAddresses })

    return addressToRemove

}

module.exports = mongoose.models.userSchema || mongoose.model('User', userSchema)