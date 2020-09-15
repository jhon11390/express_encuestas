const mongoose = require('mongoose')

const ResultSchema = mongoose.Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    },
    results: String
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result