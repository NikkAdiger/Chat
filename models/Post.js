const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const postShema = new Shema({
    tittle: {
        type: String,
        require: true
    },

    text: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', postShema);