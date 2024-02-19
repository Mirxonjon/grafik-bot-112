const {Schema, model} = require('mongoose')

const User = new Schema({
    full_name: String,
    chatId: Number,
    phone: String,
    admin: {
        type: Boolean,
        default: false
    },
    action: String, 
    requestCount:{
        type : Number,
        default : 0
    },
    messageCount:{
        type : Number,
        default : 0
    },
    lastMessageAdmin : String,
    // status: {
    //     type: Boolean,
    //     default: true
    // },
    language: String,
    // applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Applications' }],
    createdAt: Date
})

module.exports = model('User',User)