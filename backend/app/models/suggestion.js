
var mongoose = require('mongoose');
var dep = ['liser', 'Leather', 'teeth'];
var Schema = mongoose.Schema;
var Suggestion = new Schema({

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    note: { type: String, required: 'Please note' },
    depid: { type: String,enum:dep }
});
module.exports = mongoose.model('Suggestion', Suggestion);