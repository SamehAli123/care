
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Suggestion = new Schema({

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    note: { type: String, required: 'Please note' },
    depid: { type: Schema.Types.ObjectId, ref: 'Dep', required: 'Please enter department ' }
});
module.exports = mongoose.model('Suggestion', Suggestion);