const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//스키마
const User = mongoose.model('User', userSchema)

//다른곳에서도 쓸 수 있게 exports해준다
module.exports = { User }