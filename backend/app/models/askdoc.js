
var mongoose = require('mongoose');
var dep = ['liser', 'Leather', 'teeth'];

var Schema = mongoose.Schema;
var askDoc = new Schema({
    question: { type: String, requied: 'please  enter question ' },
    answer: { type: String },
    question_creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    answer_creator: { type: Schema.Types.ObjectId, ref: 'Doc' },
    status: { type: Boolean, default: true },
    dep: { type: String, enum: dep }
});
module.exports = mongoose.model('askDoc', askDoc);