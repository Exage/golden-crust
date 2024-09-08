const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    bagData: {
        type: Object,
        default: {}
    },
    addresses: {
        type: Object,
        default: {}
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

userSchema.statics.signup = async function({name, lastName, email, password}) {
    
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

userSchema.statics.signin = async function({email, password}) {
    
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

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password!')
    }

    return user

}

userSchema.statics.updatePassword = async function({ email, password, newPassword}) {
    
    if ( !password || !newPassword) {
        throw Error('All fields must be filled in!')
    }

    if ( password === newPassword ) {
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

userSchema.statics.updateName = async function({ email, name, newName }) {
    
    if ( !newName ) {
        throw Error('All fields must be filled in!')
    }

    if ( name === newName ) {
        throw Error('Names must be diffrent')
    }

    const user = await this.findOneAndUpdate({ email }, { name: newName })

    return user

}

module.exports = mongoose.models.userSchema || mongoose.model('User', userSchema)