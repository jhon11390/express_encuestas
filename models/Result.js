const mongoose = require('mongoose')

const ResultSchema = mongoose.Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    },
    results: {
        type: String,
        required: [true, "Please select an option"]
    }
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result