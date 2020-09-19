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
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }
    if(this.description && this.description.length > 75){
        return capitalize(this.description.substring(0, 30) + "...");
    }
    return capitalize(this.description)
}
PollSchema.methods.letter = function() {
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }
    return capitalize(this.title)
    return
}
PollSchema.methods.letterdescription = function() {
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }
    return capitalize(this.description)
    return
}
const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll