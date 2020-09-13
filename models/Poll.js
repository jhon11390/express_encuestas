const mongoose = require('mongoose')

const PollSchema = mongoose.Schema({
    title: String,
    description: String,
    option1: String,
    option2: String,
    option3: String
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll