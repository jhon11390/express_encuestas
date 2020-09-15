const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    option1: String,
    option2: String,
    option3: String
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll