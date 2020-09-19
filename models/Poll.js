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
PollSchema.methods.truncateBody = function() {
    if(this.description && this.description.length > 75){
        return this.description.substring(0, 30) + "...";
    }
    return this.description
}
const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll