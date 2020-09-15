const mongoose = require('mongoose')

const ResultSchema = mongoose.Schema({
    results: String
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result