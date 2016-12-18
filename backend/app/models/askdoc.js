
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var askDoc = new Schema({
    question: { type: String, requied: 'please  enter question ' },
    answer: { type: String, requied: 'please  enter answer  ' },
    question_creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    answer_creator: { type: Schema.Types.ObjectId, ref: 'Doc', required: 'Please login' },
    status: { type: Boolean, default: true }
});
module.exports = mongoose.model('askDoc', askDoc);