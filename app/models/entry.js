const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    uuid: String,
    username: String,
    folder: String,
    polish: [String],
    foreign: [String],
    hashtags: [String],
    img: String
}
)

entrySchema.index({ uuid: 1, type: 1 }, { unique: true });

const Entry = mongoose.model( 'Entry', entrySchema)

module.exports = Entry
