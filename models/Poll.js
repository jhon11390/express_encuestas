const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "is required"]
    },
    description: {
        type: String,
        required: [true, "is required"]
    },
    option1: {
        type: String,
        required: [true, "is required"]
    },
    option2: {
        type: String,
        required: [true, "is required"]
    },
    option3: String
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll